#!/usr/bin/env node
/**
 * spotify-token-sync.mjs — DJBILBOX BEATS
 * --------------------------------------------------------------------------
 * Catalogue COMPLET (albums + singles + compilations) via le Web API, en
 * harvestant un token web-player anonyme depuis une page /embed (pas de clé,
 * pas de Premium — contourne le 403 "Premium required for owner of app" des
 * apps client-credentials).
 * Régénère le bloc TRACKS entre les marqueurs en préservant les tags curés.
 *
 *   node tools/spotify-token-sync.mjs            # rapport
 *   node tools/spotify-token-sync.mjs --write    # écrit index.html
 * --------------------------------------------------------------------------
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ARTIST_ID = "2wP5nwScAUiXF6Esc4x0hG";
const __dir = dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = join(__dir, "..", "index.html");
const MARK_START = "// <<<TRACKS_AUTO_START>>>";
const MARK_END = "// <<<TRACKS_AUTO_END>>>";
const WRITE = process.argv.includes("--write");
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function harvestToken() {
  // plusieurs embeds au cas où l'un est froid
  for (const id of ["1UnJqR2s8q07k3vFhNFtvm", "7dyKV6dcZ4kyC2xHno12fN"]) {
    try {
      const html = await (await fetch(`https://open.spotify.com/embed/track/${id}`, { headers: UA })).text();
      const tok = (html.match(/"accessToken":"([^"]+)"/) || [])[1];
      if (tok) return tok;
    } catch {}
  }
  throw new Error("token web-player introuvable");
}

let TOKEN = null;
async function api(path) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch("https://api.spotify.com/v1" + path, { headers: { Authorization: "Bearer " + TOKEN } });
    if (res.status === 429) { await sleep(((Number(res.headers.get("retry-after")) || 2) + 1) * 1000); continue; }
    if (res.status === 401) { TOKEN = await harvestToken(); continue; }
    if (!res.ok) throw new Error(`${res.status} ${path}: ${(await res.text()).slice(0, 140)}`);
    await sleep(120); // throttle doux
    return res.json();
  }
  throw new Error("trop de 429 sur " + path);
}

async function getAllAlbums() {
  const albums = [], seen = new Set();
  let url = `/artists/${ARTIST_ID}/albums?include_groups=album,single,compilation&market=FR&limit=50`;
  while (url) {
    const page = await api(url);
    for (const a of page.items) if (!seen.has(a.id)) { seen.add(a.id); albums.push(a); }
    url = page.next ? page.next.replace("https://api.spotify.com/v1", "") : null;
  }
  return albums;
}
async function getAlbumTracks(a) {
  const cover = a.images?.[0]?.url || "";
  const out = [];
  let url = `/albums/${a.id}/tracks?market=FR&limit=50`;
  while (url) {
    const page = await api(url);
    for (const t of page.items) out.push({ title: cleanTitle(t.name), trackId: t.id, cover, albumName: a.name, group: a.album_type });
    url = page.next ? page.next.replace("https://api.spotify.com/v1", "") : null;
  }
  return out;
}
function cleanTitle(t) {
  return t.replace(/\s*[-–]\s*Instrumental.*$/i, "").replace(/\s*[\(\[]Instrumental[^)\]]*[\)\]]/i, "").trim();
}

const TAG_RULES = [
  [/balkan|istanbul|beyrouth|albania|amina|karima|souhila|dounia|zaza/i, ["Balkan", "Oriental"]],
  [/oriental|khalifa|3tini|habibi|sahar|aladdin|falastin|omri|zoubida|argelia|maghreb|ya habibi/i, ["Oriental", "Trap"]],
  [/funk|gfunk|g-funk|disco|groove|compton|cali|tijuana|scarface|westside|long beach/i, ["Funk", "West Coast"]],
  [/cyberpunk|2077|neon|chrome|circuit|eddies|dogtown|phantom/i, ["Synth", "Dark"]],
  [/video club|retro|synth|digital|liberty city|miami/i, ["Synth", "Retro"]],
  [/drill|badman|paris to london|uk vibes/i, ["Drill", "Trap"]],
  [/afro|mariama|sunshine|gazouze|reggaeton|dancehall/i, ["Afro", "Melodic"]],
  [/latin|mexico|loco|comigo|você|brother lopez|tiburon|tacos/i, ["Latin", "Funk"]],
  [/house|dance|electronic|techno|dnb/i, ["House", "Synth"]],
  [/r&b|soul|elle|honesty|emotion|my baby|my love/i, ["R&B", "Melodic"]],
];
function deriveTags(title, albumName) {
  const hay = `${title} ${albumName}`;
  for (const [re, tags] of TAG_RULES) if (re.test(hay)) return tags;
  return ["Trap", "Beat"];
}
function parseExistingTracks(html) {
  const map = new Map();
  const re = /\{title:"([^"]*)",trackId:"([^"]+)"[^}]*tags:\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(html))) map.set(m[2], { title: m[1], tags: m[3].split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean) });
  return map;
}
function fmtTrack(t, tags) {
  return `{title:"${t.title.replace(/"/g, "'")}",trackId:"${t.trackId}",cover:"${t.cover}",tags:[${tags.map((x) => `"${x.replace(/"/g, "")}"`).join(",")}]},`;
}

(async () => {
  TOKEN = await harvestToken();
  console.log("→ token web-player OK. Récupération albums…");
  const albums = await getAllAlbums();
  console.log(`  ${albums.length} albums/singles/compilations.`);
  let all = [];
  for (const a of albums) all = all.concat(await getAlbumTracks(a));
  const byId = new Map();
  for (const t of all) if (!byId.has(t.trackId)) byId.set(t.trackId, t);
  const tracks = [...byId.values()];

  const html = readFileSync(INDEX_PATH, "utf8");
  const existing = parseExistingTracks(html);
  const fresh = tracks.filter((t) => !existing.has(t.trackId));
  console.log(`\n===== RAPPORT =====\nSpotify uniques: ${tracks.length}\nSite actuel: ${existing.size}\nNOUVEAUX: ${fresh.length}`);
  for (const t of fresh.slice(0, 80)) console.log(`   + ${t.title} [${t.albumName}]`);
  if (!WRITE) { console.log("\n(rapport — --write pour appliquer.)"); return; }

  const lines = tracks.map((t) => "  " + fmtTrack(t, existing.get(t.trackId)?.tags?.length ? existing.get(t.trackId).tags : deriveTags(t.title, t.albumName)));
  const block = `${MARK_START}\nconst TRACKS=[\n${lines.join("\n")}\n];\n${MARK_END}`;
  const re = new RegExp(MARK_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\s\\S]*?" + MARK_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  writeFileSync(INDEX_PATH, html.replace(re, block), "utf8");
  console.log(`\n✓ index.html : ${tracks.length} titres écrits.`);
})().catch((e) => { console.error("[ÉCHEC]", e.message); process.exit(1); });
