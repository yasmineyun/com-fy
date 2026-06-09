// Fonction serverless Vercel — proxy GRATUIT vers Google Gemini.
// La clé reste SECRÈTE côté serveur (jamais exposée au navigateur).
//
// Configuration : Vercel → projet com-fy → Settings → Environment Variables
//   GEMINI_API_KEY = AIza...   (clé gratuite depuis aistudio.google.com)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY manquante (variable d'environnement)." });
  }

  // Modèle gratuit et stable (juin 2026). gemini-1.5 est fermé.
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const userText = (body.messages && body.messages[0] && body.messages[0].content) || "";

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }],
          generationConfig: { maxOutputTokens: body.max_tokens || 600, temperature: 0.9 },
        }),
      }
    );
    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({ error: data.error?.message || "Erreur Gemini" });
    }

    const txt = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return res.status(200).json({ content: [{ type: "text", text: txt }] });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
