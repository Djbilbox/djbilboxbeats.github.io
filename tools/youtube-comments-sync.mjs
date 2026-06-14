#!/usr/bin/env node
/**
 * youtube-comments-sync.mjs — DJBILBOX BEATS
 * --------------------------------------------------------------------------
 * Récupère les VRAIS commentaires de la chaîne YouTube @djbilboxbeats via
 * l'API interne innertube (aucune clé Data API requise). Filtre les comments
 * positifs, dédoublonne, et régénère le bloc TESTIMONIALS dans index.html.
 *
 *   node tools/youtube-comments-sync.mjs            # rapport
 *   node tools/youtube-comments-sync.mjs --write    # écrit index.html
 * --------------------------------------------------------------------------
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HANDLE = "@djbilboxbeats";
const __dir = dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = join(__dir, "..", "index.html");
const MARK_START = "// <<<TESTIMONIALS_AUTO_START>>>";
const MARK_END = "// <<<TESTIMONIALS_AUTO_END>>>";
const WRITE = process.argv.includes("--write");
const WANT = 30; // cible
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let API_KEY = null, CLIENT_VERSION = "2.20240101.00.00";

function ctx() {
  return { client: { hl: "en", gl: "US", clientName: "WEB", clientVersion: CLIENT_VERSION } };
}

async function getPage(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" } });
  return res.text();
}

function extractJson(html, marker) {
  const i = html.indexOf(marker);
  if (i < 0) return null;
  const start = html.indexOf("{", i);
  let depth = 0, inStr = false, esc = false;
  for (let j = start; j < html.length; j++) {
    const c = html[j];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else {
      if (c === '"') inStr = true;
      else if (c === "{") depth++;
      else if (c === "}") { depth--; if (depth === 0) return JSON.parse(html.slice(start, j + 1)); }
    }
  }
  return null;
}

// récupère tous les videoId d'un objet récursivement
function deepFind(obj, key, out = []) {
  if (!obj || typeof obj !== "object") return out;
  for (const k of Object.keys(obj)) {
    if (k === key) out.push(obj[k]);
    else if (typeof obj[k] === "object") deepFind(obj[k], key, out);
  }
  return out;
}

async function browse(token) {
  const res = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${API_KEY}&prettyPrint=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": UA },
    body: JSON.stringify({ context: ctx(), continuation: token }),
  });
  if (!res.ok) throw new Error(`browse ${res.status}`);
  return res.json();
}

async function getVideoIds() {
  const html = await getPage(`https://www.youtube.com/${HANDLE}/videos`);
  API_KEY = (html.match(/"INNERTUBE_API_KEY":"([^"]+)"/) || [])[1];
  CLIENT_VERSION = (html.match(/"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]+)"/) || [])[1] || CLIENT_VERSION;
  const data = extractJson(html, "var ytInitialData =") || extractJson(html, "ytInitialData =");
  const ids = new Set(deepFind(data || {}, "videoId"));
  // pagine toute la chaîne (vidéos populaires anciennes = plus bas)
  let token = null;
  for (const c of deepFind(data || {}, "continuationItemRenderer")) {
    const t = c?.continuationEndpoint?.continuationCommand?.token;
    if (t) { token = t; break; }
  }
  let guard = 0;
  while (token && guard++ < 10) {
    try {
      const j = await browse(token);
      for (const id of deepFind(j, "videoId")) ids.add(id);
      token = null;
      for (const c of deepFind(j, "continuationItemRenderer")) {
        const t = c?.continuationEndpoint?.continuationCommand?.token;
        if (t) { token = t; break; }
      }
      await sleep(150);
    } catch { break; }
  }
  return [...ids];
}

async function next(payload) {
  const res = await fetch(`https://www.youtube.com/youtubei/v1/next?key=${API_KEY}&prettyPrint=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": UA },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`next ${res.status}`);
  return res.json();
}

// trouve le token de continuation de la SECTION COMMENTAIRES (pas related videos)
async function getCommentToken(videoId) {
  const html = await getPage(`https://www.youtube.com/watch?v=${videoId}`);
  if (!API_KEY) API_KEY = (html.match(/"INNERTUBE_API_KEY":"([^"]+)"/) || [])[1];
  const data = extractJson(html, "var ytInitialData =") || extractJson(html, "ytInitialData =");
  if (!data) return null;
  // 1) cible itemSectionRenderer sectionIdentifier == "comment-item-section"
  for (const sec of deepFind(data, "itemSectionRenderer")) {
    if (sec.sectionIdentifier === "comment-item-section") {
      for (const it of sec.contents || []) {
        const tok = it?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
        if (tok) return tok;
      }
    }
  }
  // 2) fallback: engagementPanel commentaires
  for (const ep of deepFind(data, "engagementPanelSectionListRenderer")) {
    if (/comment/i.test(ep.panelIdentifier || "")) {
      for (const c of deepFind(ep, "continuationItemRenderer")) {
        const tok = c?.continuationEndpoint?.continuationCommand?.token;
        if (tok) return tok;
      }
    }
  }
  return null;
}

function harvestComments(json, bag) {
  // ancien format: commentThreadRenderer / commentRenderer
  for (const cr of deepFind(json, "commentRenderer")) {
    const text = (cr.contentText?.runs || []).map((r) => r.text).join("");
    const name = cr.authorText?.simpleText || "";
    const likes = cr.voteCount?.simpleText || "0";
    const avatar = cr.authorThumbnail?.thumbnails?.slice(-1)[0]?.url || "";
    if (text && name) bag.push({ name, text, likes, avatar });
  }
  // nouveau format: commentEntityPayload (frameworkUpdates mutations)
  for (const p of deepFind(json, "commentEntityPayload")) {
    const text = p.properties?.content?.content || "";
    const name = p.author?.displayName || "";
    const likes = p.toolbar?.likeCountNotliked || p.toolbar?.likeCountLiked || "0";
    const avatar = p.author?.avatarThumbnailUrl || "";
    if (text && name) bag.push({ name, text, likes, avatar });
  }
  // token suivant
  for (const c of deepFind(json, "continuationItemRenderer")) {
    const tok = c?.continuationEndpoint?.continuationCommand?.token;
    if (tok) return tok;
  }
  return null;
}

// rejette: owner lui-même, spam, promo, liens
const OWNER = /djbilbox/i;
const SPAM = /https?:\/\/|www\.|sub4sub|sub 4 sub|subscribe to my|check my|promo|telegram|whatsapp|\.com|@gmail|free download link|buy now/i;
function isGood(c) {
  const t = c.text.trim();
  if (t.length < 2 || t.length > 240) return false;
  if (OWNER.test(c.name)) return false;        // pas les réponses du proprio
  if (SPAM.test(t)) return false;              // pas de spam/promo
  return true;                                  // tout vrai commentaire fan passe
}

function esc(s) { return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, " ").trim(); }
function fmt(c) {
  return `  {name:"${esc(c.name)}",verified:false,src:"YouTube",text:"${esc(c.text)}",likes:"${esc(String(c.likes)).replace(/[^0-9KkMm.]/g, "") || "0"}",avatar:"${c.avatar}"},`;
}

(async () => {
  console.log("→ Récupération des vidéos…");
  const vids = await getVideoIds();
  console.log(`  ${vids.length} vidéos. API_KEY=${API_KEY ? "ok" : "MANQUANT"}`);
  if (!API_KEY) { console.error("[ÉCHEC] pas d'INNERTUBE_API_KEY"); process.exit(1); }

  const bag = [];
  for (const v of vids) {
    if (bag.length >= WANT * 2) break;
    try {
      let token = await getCommentToken(v);
      let pages = 0;
      while (token && pages < 8 && bag.length < WANT * 3) {
        const json = await next({ context: ctx(), continuation: token });
        token = harvestComments(json, bag);
        pages++;
        await sleep(150);
      }
      console.log(`  video ${v}: total comments collectés ${bag.length}`);
    } catch (e) { console.error(`  video ${v} FAIL: ${e.message}`); }
    await sleep(200);
  }

  // dédoublonne par texte+name, filtre positifs, trie par likes desc
  const seen = new Set();
  const good = bag.filter(isGood).filter((c) => {
    const k = (c.name + "|" + c.text).toLowerCase();
    if (seen.has(k)) return false; seen.add(k); return true;
  }).sort((a, b) => (parseInt(b.likes) || 0) - (parseInt(a.likes) || 0));

  console.log(`\n===== RAPPORT =====`);
  console.log(`Comments bruts : ${bag.length}`);
  console.log(`Positifs uniques : ${good.length}`);
  for (const c of good.slice(0, WANT)) console.log(`   ★ ${c.name} (${c.likes}): ${c.text.slice(0, 70)}`);

  if (!WRITE) { console.log(`\n(rapport — --write pour appliquer.)`); return; }
  if (good.length === 0) { console.error("[STOP] 0 comment — rien écrit."); process.exit(1); }

  const html = readFileSync(INDEX_PATH, "utf8");
  if (!html.includes(MARK_START) || !html.includes(MARK_END)) {
    console.error("[ERREUR] marqueurs TESTIMONIALS introuvables."); process.exit(1);
  }
  const lines = good.slice(0, WANT).map(fmt);
  const block = `${MARK_START}\nconst TESTIMONIALS=[\n${lines.join("\n")}\n];\n${MARK_END}`;
  const re = new RegExp(MARK_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\s\\S]*?" + MARK_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  writeFileSync(INDEX_PATH, html.replace(re, block), "utf8");
  console.log(`\n✓ index.html : ${lines.length} testimonials écrits.`);
})().catch((e) => { console.error("[ÉCHEC]", e); process.exit(1); });
