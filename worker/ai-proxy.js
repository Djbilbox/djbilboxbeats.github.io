/**
 * Cloudflare Worker — BILBOX AI (chat) proxy -> Claude API
 *
 * DEPLOIEMENT :
 * 1. dashboard.cloudflare.com -> Workers & Pages -> Create Worker
 * 2. Nomme-le "djbilbox-ai", colle ce code, Deploy
 * 3. Settings -> Variables and Secrets -> Add (type: Secret) :
 *      ANTHROPIC_API_KEY = ta cle (console.anthropic.com -> API Keys)
 * 4. Copie l'URL du worker (ex: https://djbilbox-ai.TON-COMPTE.workers.dev)
 * 5. Dans index.html, mets :  const CHAT_ENDPOINT='https://djbilbox-ai.TON-COMPTE.workers.dev';
 *
 * Modele utilise : claude-haiku-4-5 (rapide + tres bon marche).
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'POST') return json({ error: 'POST only' }, 405);

    let body;
    try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }

    const messages = (body.messages || [])
      .filter(m => m && m.content)
      .slice(-12)
      .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content).slice(0, 2000) }));
    if (!messages.length) return json({ error: 'no messages' }, 400);

    const system =
      `Tu es BILBOX AI, l'assistant officiel du site DJBILBOX BEATS. ` +
      `Reponds en francais, ton chaleureux et pro, court (2 a 4 phrases). ` +
      `Tu parles UNIQUEMENT de DJBILBOX BEATS, sa musique et ses services. ` +
      `Si on te demande autre chose, ramene gentiment vers DJBILBOX. ` +
      `Voici tout ce que tu sais :\n${body.system || ''}`;

    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          system,
          messages,
        }),
      });
      const j = await r.json();
      if (!r.ok) return json({ error: (j.error && j.error.message) || 'api error' }, 502);
      const reply = (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim();
      return json({ reply });
    } catch (e) {
      return json({ error: String(e) }, 500);
    }
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...CORS },
  });
}
