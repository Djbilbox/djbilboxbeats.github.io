#!/usr/bin/env node
/**
 * spotify-sync.mjs — DJBILBOX BEATS
 * --------------------------------------------------------------------------
 * Récupère TOUS les titres de l'artiste Spotify via l'API Web (flow
 * "Client Credentials" — accès catalogue public, aucun login utilisateur),
 * puis génère/actualise le tableau `TRACKS` dans index.html.
 *
 * Sécurité de la curation :
 *   - Mode RAPPORT par défaut : n'écrit RIEN. Liste les titres nouveaux
 *     (absents du site) et les titres du site absents de Spotify.
 *   - Mode --write : régénère le bloc TRACKS entre les marqueurs
 *       // <<<TRACKS_AUTO_START>>>   ...   // <<<TRACKS_AUTO_END>>>
 *     en PRÉSERVANT les tags curés à la main (par trackId), et en
 *     respectant les listes d'exclusion ci-dessous (ALBUM_EXCLUDE /
 *     TRACK_EXCLUDE) — utile pour ne pas réintroduire des titres purgés
 *     (ex. versions voix IA "Raï'n'B Fever").
 *
 * Usage :
 *   $env:SPOTIFY_CLIENT_ID="xxx"; $env:SPOTIFY_CLIENT_SECRET="yyy"
 *   node tools/spotify-sync.mjs            # rapport seul (rien modifié)
 *   node tools/spotify-sync.mjs --write    # régénère TRACKS dans index.html
 *   node tools/spotify-sync.mjs --write --dedupe-name   # + fusionne single/album
 *
 * Obtenir les identifiants (gratuit) :
 *   https://developer.spotify.com/dashboard → Create App → copier
 *   Client ID + Client Secret. Redirect URI quelconque (non utilisé ici).
 * --------------------------------------------------------------------------
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ===================== CONFIG ===========================================
const ARTIST_ID = "2wP5nwScAUiXF6Esc4x0hG"; // DJBILBOX BEATS
const __dir = dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = join(__dir, "..", "index.html");

// Albums ou titres à NE JAMAIS importer (ids Spotify). Mets ici les albums
// purgés (ex. versions voix IA) pour qu'ils ne reviennent pas.
const ALBUM_EXCLUDE = new Set([
  // "xxxxxxxxxxxxxxxxxxxxxx", // Raï'n'B Fever (voix IA)
]);
const TRACK_EXCLUDE = new Set([
  // "xxxxxxxxxxxxxxxxxxxxxx",
]);

const MARK_START = "// <<<TRACKS_AUTO_START>>>";
const MARK_END = "// <<<TRACKS_AUTO_END>>>";

const args = new Set(process.argv.slice(2));
const WRITE = args.has("--write");
const DEDUPE_NAME = args.has("--dedupe-name");

// ===================== SPOTIFY API ======================================
async function getToken() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) {
    console.error(
      "\n[ERREUR] Variables manquantes : SPOTIFY_CLIENT_ID et SPOTIFY_CLIENT_SECRET.\n" +
        "PowerShell :  $env:SPOTIFY_CLIENT_ID=\"...\"; $env:SPOTIFY_CLIENT_SECRET=\"...\"\n"
    );
    process.exit(1);
  }
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    console.error(`[ERREUR] Auth Spotify ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  return (await res.json()).access_token;
}

async function api(path, token) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch("https://api.spotify.com/v1" + path, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res.status === 429) {
      const wait = (Number(res.headers.get("retry-after")) || 2) * 1000;
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${path}: ${await res.text()}`);
    return res.json();
  }
  throw new Error("Trop de 429 (rate limit) sur " + path);
}

async function getAllAlbums(token) {
  const albums = [];
  const seen = new Set();
  let url = `/artists/${ARTIST_ID}/albums?include_groups=album,single,compilation&limit=50`;
  while (url) {
    const page = await api(url, token);
    for (const a of page.items) {
      if (seen.has(a.id) || ALBUM_EXCLUDE.has(a.id)) continue;
      seen.add(a.id);
      albums.push(a);
    }
    url = page.next ? page.next.replace("https://api.spotify.com/v1", "") : null;
  }
  return albums;
}

async function getAlbumTracks(album, token) {
  const cover = album.images?.[0]?.url || "";
  const out = [];
  let url = `/albums/${album.id}/tracks?limit=50`;
  while (url) {
    const page = await api(url, token);
    for (const t of page.items) {
      if (TRACK_EXCLUDE.has(t.id)) continue;
      out.push({
        title: t.name,
        trackId: t.id,
        cover,
        albumName: album.name,
        group: album.album_type, // album | single | compilation
      });
    }
    url = page.next ? page.next.replace("https://api.spotify.com/v1", "") : null;
  }
  return out;
}

// ===================== TAGS (auto) ======================================
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

// ===================== INDEX.HTML PARSE =================================
function readIndex() {
  return readFileSync(INDEX_PATH, "utf8");
}
/** Extrait {trackId -> {title, tags}} du bloc TRACKS actuel (curé main). */
function parseExistingTracks(html) {
  const map = new Map();
  const re = /\{title:"([^"]*)",trackId:"([^"]+)"[^}]*tags:\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(html))) {
    const title = m[1];
    const id = m[2];
    const tags = m[3]
      .split(",")
      .map((s) => s.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);
    map.set(id, { title, tags });
  }
  return map;
}

function fmtTrack(t, tags) {
  const tagStr = tags.map((x) => `"${x.replace(/"/g, "")}"`).join(",");
  return `{title:"${t.title.replace(/"/g, "'")}",trackId:"${t.trackId}",cover:"${t.cover}",tags:[${tagStr}]},`;
}

// ===================== MAIN =============================================
(async () => {
  const token = await getToken();
  console.log("→ Récupération des albums…");
  const albums = await getAllAlbums(token);
  console.log(`  ${albums.length} albums/singles trouvés.`);

  let all = [];
  for (const a of albums) all = all.concat(await getAlbumTracks(a, token));

  // Dedupe par trackId (toujours)
  const byId = new Map();
  for (const t of all) if (!byId.has(t.trackId)) byId.set(t.trackId, t);
  let tracks = [...byId.values()];

  // Dedupe optionnel par nom normalisé (fusionne single + album)
  if (DEDUPE_NAME) {
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const byName = new Map();
    const rank = { album: 0, compilation: 1, single: 2 };
    for (const t of tracks) {
      const k = norm(t.title);
      const prev = byName.get(k);
      if (!prev || (rank[t.group] ?? 9) < (rank[prev.group] ?? 9)) byName.set(k, t);
    }
    tracks = [...byName.values()];
  }

  const html = readIndex();
  const existing = parseExistingTracks(html);
  const existingIds = new Set(existing.keys());
  const liveIds = new Set(tracks.map((t) => t.trackId));

  const fresh = tracks.filter((t) => !existingIds.has(t.trackId));
  const goneIds = [...existingIds].filter((id) => !liveIds.has(id));

  // ---------- RAPPORT ----------
  console.log(`\n========== RAPPORT SYNC ==========`);
  console.log(`Spotify (uniques) : ${tracks.length}`);
  console.log(`Site actuel       : ${existingIds.size}`);
  console.log(`NOUVEAUX (à ajouter) : ${fresh.length}`);
  for (const t of fresh) console.log(`   + ${t.title}  [${t.albumName}]  ${t.trackId}`);
  console.log(`SUR LE SITE mais absents de Spotify : ${goneIds.length}`);
  for (const id of goneIds) console.log(`   - ${existing.get(id).title}  ${id}`);

  if (!WRITE) {
    console.log(`\n(mode rapport — rien modifié. Relance avec --write pour appliquer.)`);
    return;
  }

  // ---------- WRITE ----------
  if (!html.includes(MARK_START) || !html.includes(MARK_END)) {
    console.error(
      `\n[ERREUR] Marqueurs introuvables dans index.html.\n` +
        `Ajoute autour du bloc TRACKS :\n  ${MARK_START}\n  const TRACKS=[ ... ];\n  ${MARK_END}`
    );
    process.exit(1);
  }

  const lines = tracks.map((t) => {
    const tags = existing.get(t.trackId)?.tags?.length
      ? existing.get(t.trackId).tags
      : deriveTags(t.title, t.albumName);
    return "  " + fmtTrack(t, tags);
  });
  const block = `${MARK_START}\nconst TRACKS=[\n${lines.join("\n")}\n];\n${MARK_END}`;

  const re = new RegExp(
    MARK_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
      "[\\s\\S]*?" +
      MARK_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const out = html.replace(re, block);
  writeFileSync(INDEX_PATH, out, "utf8");
  console.log(`\n✓ index.html mis à jour : ${tracks.length} titres écrits dans TRACKS.`);
  console.log(`  (tags curés préservés pour ${[...liveIds].filter((id) => existingIds.has(id)).length} titres)`);
})().catch((e) => {
  console.error("\n[ÉCHEC]", e.message);
  process.exit(1);
});
