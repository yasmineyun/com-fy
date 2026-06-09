// Fonction serverless Vercel — proxy sécurisé vers l'API Anthropic.
// La clé API reste SECRÈTE côté serveur (jamais exposée au navigateur).
//
// Configuration : dans Vercel → Settings → Environment Variables
//   ANTHROPIC_API_KEY = sk-ant-...   (ta clé Anthropic)
//   (optionnel) ANTHROPIC_MODEL = claude-sonnet-4-20250514

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY manquante (variable d'environnement)." });
  }

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: body.max_tokens || 600,
        messages: body.messages,
      }),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
