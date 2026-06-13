#!/usr/bin/env node
/**
 * spotify-embed-sync.mjs — DJBILBOX BEATS
 * --------------------------------------------------------------------------
 * Contournement de la policy "Premium required" du Web API Spotify.
 * Source = pages EMBED publiques (aucune clé, aucun premium) :
 *   1. Liste des album IDs depuis la page artiste publique.
 *   2. Pour chaque album : https://open.spotify.com/embed/album/<id>
 *      contient le trackList complet (uri + title) + la cover.
 * Régénère le bloc TRACKS entre les marqueurs en préservant les tags curés.
 *
 * Usage :
 *   node tools/spotify-embed-sync.mjs            # rapport (rien écrit)
 *   node tools/spotify-embed-sync.mjs --write    # écrit index.html
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

async function getAlbumIds() {
  const ids = new Set();
  // page artiste + page discography (au cas où l'une expose plus d'ids)
  for (const url of [
    `https://open.spotify.com/artist/${ARTIST_ID}`,
    `https://open.spotify.com/artist/${ARTIST_ID}/discography/all`,
  ]) {
    try {
      const html = await (await fetch(url, { headers: UA })).text();
      for (const m of html.matchAll(/\/album\/([A-Za-z0-9]{22})/g)) ids.add(m[1]);
    } catch (e) { console.error("warn artist fetch", e.message); }
  }
  return [...ids];
}

function cleanTitle(t) {
  return t
    .replace(/\s*[-–]\s*Instrumental.*$/i, "")
    .replace(/\s*\(Instrumental[^)]*\)/i, "")
    .replace(/\s*\[Instrumental[^\]]*\]/i, "")
    .trim();
}

async function getAlbumTracks(id) {
  const html = await (await fetch(`https://open.spotify.com/embed/album/${id}`, { headers: UA })).text();
  const albumName = (html.match(/<meta property="og:title" content="([^"]+)"/) || [])[1] ||
    (html.match(/<title>([^<|]+?)(?:\s*[-|].*)?<\/title>/) || [])[1] || "";
  // hash 640px (ab67616d0000b273…) — préfixe i.scdn.co (cohérent avec l'existant)
  const coverId = (html.match(/ab67616d0000b273[A-Za-z0-9]+/) || [])[0];
  const cover = coverId ? `https://i.scdn.co/image/${coverId}` : "";
  const tracks = [];
  const re = /"uri":"spotify:track:([A-Za-z0-9]{22})","uid":"[^"]*","title":"([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    tracks.push({ trackId: m[1], title: cleanTitle(m[2].replace(/\\"/g, "'")), cover, albumName });
  }
  return tracks;
}

// ---- tags (repris de spotify-sync.mjs) ----
const TAG_RULES = [
  [/balkan|istanbul|beyrouth|albania|amina|karima|souhila|dounia|zaza/i, ["Balkan", "Oriental"]],
  [/oriental|khalifa|3tini|habibi|sahar|aladdin|falastin|omri|zoubida|argelia/i, ["Oriental", "Trap"]],
  [/funk|gfunk|g-funk|disco|groove|compton|cali|tijuana|scarface|westside|long beach/i, ["Funk", "West Coast"]],
  [/cyberpunk|2077|neon|chrome|circuit|eddies|dogtown|phantom/i, ["Synth", "Dark"]],
  [/video club|retro|synth|digital|liberty city|miami/i, ["Synth", "Retro"]],
  [/drill|badman|paris to london|uk vibes/i, ["Drill", "Trap"]],
  [/afro|mariama|sunshine|gazouze|reggaeton|dancehall/i, ["Afro", "Melodic"]],
  [/latin|tijuana|mexico|loco|comigo|você|brother lopez|tiburon/i, ["Latin", "Funk"]],
  [/house|dance|electronic|techno|dnb/i, ["House", "Synth"]],
  [/r&b|soul|elle|honesty|emotion|my baby/i, ["R&B", "Melodic"]],
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
  while ((m = re.exec(html))) {
    const tags = m[3].split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean);
    map.set(m[2], { title: m[1], tags });
  }
  return map;
}
function fmtTrack(t, tags) {
  const tagStr = tags.map((x) => `"${x.replace(/"/g, "")}"`).join(",");
  return `{title:"${t.title.replace(/"/g, "'")}",trackId:"${t.trackId}",cover:"${t.cover}",tags:[${tagStr}]},`;
}

(async () => {
  const albumIds = await getAlbumIds();
  console.log(`→ ${albumIds.length} albums trouvés (page publique).`);
  const all = [];
  for (const id of albumIds) {
    try {
      const tr = await getAlbumTracks(id);
      console.log(`   album ${id}: ${tr.length} titres${tr[0] ? ` (${tr[0].albumName})` : ""}`);
      all.push(...tr);
    } catch (e) { console.error(`   album ${id} FAIL: ${e.message}`); }
    await sleep(180);
  }
  const byId = new Map();
  for (const t of all) if (t.title && !byId.has(t.trackId)) byId.set(t.trackId, t);
  const tracks = [...byId.values()];

  const html = readIndexSafe();
  const existing = parseExistingTracks(html);
  const fresh = tracks.filter((t) => !existing.has(t.trackId));
  console.log(`\n========== RAPPORT EMBED-SYNC ==========`);
  console.log(`Titres uniques (embed) : ${tracks.length}`);
  console.log(`Site actuel            : ${existing.size}`);
  console.log(`NOUVEAUX               : ${fresh.length}`);
  for (const t of fresh.slice(0, 60)) console.log(`   + ${t.title}  [${t.albumName}]`);

  if (!WRITE) { console.log(`\n(rapport — rien écrit. --write pour appliquer.)`); return; }
  if (!html.includes(MARK_START) || !html.includes(MARK_END)) {
    console.error("[ERREUR] marqueurs introuvables."); process.exit(1);
  }
  const lines = tracks.map((t) => {
    const tags = existing.get(t.trackId)?.tags?.length ? existing.get(t.trackId).tags : deriveTags(t.title, t.albumName);
    return "  " + fmtTrack(t, tags);
  });
  const block = `${MARK_START}\nconst TRACKS=[\n${lines.join("\n")}\n];\n${MARK_END}`;
  const re = new RegExp(MARK_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\\s\\S]*?" + MARK_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  writeFileSync(INDEX_PATH, html.replace(re, block), "utf8");
  console.log(`\n✓ index.html : ${tracks.length} titres écrits.`);
})().catch((e) => { console.error("[ÉCHEC]", e); process.exit(1); });

function readIndexSafe() { return readFileSync(INDEX_PATH, "utf8"); }
