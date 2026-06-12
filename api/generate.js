const CM_BRAIN = `Tu es LE meilleur community manager de France, 10 ans d'expérience, spécialisé dans la téléphonie mobile et les boutiques locales (vente, réparation, reconditionné, accessoires, forfaits).

Tu écris des légendes de posts qui ARRÊTENT le scroll et donnent envie d'agir. Niveau agence premium.

RÈGLES D'OR :
- PREMIÈRE LIGNE = une accroche choc qui crée la curiosité, l'émotion ou l'urgence (jamais "Découvrez nos offres", jamais de cliché corporate).
- Parle à UNE personne, ton humain, vivant, complice. Tu peux tutoyer.
- Apporte une vraie valeur : un bénéfice concret, une astuce, une histoire, un chiffre, une émotion.
- Termine par un APPEL À L'ACTION clair et naturel (passe en boutique, écris-nous en DM, réserve, etc.).
- Émojis : bien placés, pertinents, jamais en rafale. 2 à 5 max selon le réseau.
- Hashtags : 3 à 6 ciblés et utiles (mélange : marque, thème, local/ville). Pas de #love #instagood inutiles.
- Zéro langue de bois, zéro phrase creuse, zéro superlatif vide ("incroyable", "exceptionnel" à bannir sauf si justifié).
- Crédible, spécifique, local. Si une ville est citée, ancre-la.
- Varie les structures d'un post à l'autre (question, mini-histoire, liste, chiffre choc...).

FORMAT DE SORTIE : uniquement la légende finale, prête à copier-coller. Pas d'intro, pas d'explication, pas de "Voici", pas de guillemets autour.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERREUR: GEMINI_API_KEY introuvable.");
    return res.status(500).json({ error: "GEMINI_API_KEY manquante." });
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  if (!body) body = {};
  const userText = (body.messages && body.messages[0] && body.messages[0].content) || "Génère une légende";
  const maxTokens = body.max_tokens || 1500;

  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-flash-latest"];

  async function callModel(model) {
    return fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: CM_BRAIN }] },
          contents: [{ parts: [{ text: userText }] }],
          generationConfig: { maxOutputTokens: maxTokens, temperature: 1.1, topP: 0.95 },
        }),
      }
    );
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  try {
    let lastErr = null;
    for (const model of models) {
      for (let attempt = 0; attempt < 3; attempt++) {
        const r = await callModel(model);
        const data = await r.json();
        if (r.ok) {
          // Récupérer TOUTES les parties du texte (pas juste parts[0])
          const parts = data.candidates?.[0]?.content?.parts || [];
          const txt = parts.map(p => p.text || "").join("").trim();
          if (txt) return res.status(200).json({ content: [{ type: "text", text: txt }] });
        }
        lastErr = data?.error?.message || `Erreur ${r.status}`;
        if (r.status === 503 || r.status === 429) { await sleep(1200); continue; }
        break;
      }
    }
    console.error("ERREUR GEMINI:", lastErr);
    return res.status(503).json({ error: "Gemini occupé, réessaie dans quelques secondes." });
  } catch (e) {
    console.error("EXCEPTION:", String(e));
    return res.status(500).json({ error: "Exception: " + String(e) });
  }
}
