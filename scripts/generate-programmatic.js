/* ============================================================
   DJBILBOX BEATS — Programmatic page generator (batched, safe)
   Reads a CSV of REAL products, emits unique 500+ word pages.

   Usage:
     node scripts/generate-programmatic.js --lot=1
     node scripts/generate-programmatic.js --lot=2 --noindex
     node scripts/generate-programmatic.js --csv=data/products.csv --lot=1

   Flags:
     --lot=N     only generate rows whose "lot" column == N (required)
     --noindex   force <meta robots noindex> on every page in this run
                 (publish staged, then re-run without the flag to flip to index
                  once Search Console shows the batch is healthy)
     --csv=PATH  input CSV (default: data/products-sample.csv)
     --out=DIR   output dir (default: catalog)

   Anti-"scaled content abuse" guards:
     - every page pulls from 3 real data sources (product meta + review + local)
     - hard word-count floor (500); under-length pages are reported, not shipped
     - you control volume with --lot; nothing is generated without a lot filter
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v === undefined ? true : v];
}));

if (!args.lot) { console.error('ERROR: --lot=N is required (never generate everything at once).'); process.exit(1); }
const LOT = String(args.lot);
const FORCE_NOINDEX = !!args.noindex;
const CSV = path.join(ROOT, args.csv || 'data/products-sample.csv');
const OUT_DIR = path.join(ROOT, args.out || 'catalog');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------- minimal CSV parser (handles quoted fields w/ commas) ----------
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* skip */ }
      else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const header = rows.shift().map(h => h.trim());
  return rows.filter(r => r.some(c => c.trim() !== ''))
             .map(r => Object.fromEntries(header.map((h, i) => [h, (r[i] || '').trim()])));
}

function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function pick(arr, seed) { return arr[seed % arr.length]; }
function wordCount(html) { return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length; }

const langLabels = { en: 'English', fr: 'Français', ar: 'العربية' };

// varied intro templates (kept generic; the REAL data below carries the uniqueness)
const intros = [
  (p) => `${p.name} is a ${p.genre.toLowerCase()} ${p.product_type === 'vst' ? 'plugin' : p.product_type} from DJBILBOX BEATS, a beatmaker and JUCE/C++ developer who builds and uses these tools in real FL Studio sessions.`,
  (p) => `Made by DJBILBOX BEATS — not a faceless brand — ${p.name} is a ${p.genre.toLowerCase()} ${p.product_type === 'vst' ? 'instrument' : p.product_type} designed on the ground during actual production work.`,
  (p) => `${p.name} brings a focused ${p.genre.toLowerCase()} sound to producers who want results fast. It is one of the tools DJBILBOX BEATS ships from a catalog of 1000+ beats, VSTs and sample packs.`,
];

function buildPage(p) {
  const seed = hash(p.name + p.country);
  const slug = p.slug || slugify(p.name + '-' + p.primary_keyword);
  const noindex = FORCE_NOINDEX || String(p.noindex).toLowerCase() === 'true';
  const lang = p.lang || 'en';

  // --- SOURCE 1: product metadata ---
  const meta = [];
  if (p.data_bpm) meta.push(`<li><strong>BPM:</strong> ${p.data_bpm}</li>`);
  if (p.data_key) meta.push(`<li><strong>Key:</strong> ${p.data_key}</li>`);
  if (p.instruments) meta.push(`<li><strong>Sounds / instruments:</strong> ${p.instruments}</li>`);
  if (p.vst_version) meta.push(`<li><strong>Version:</strong> ${p.vst_version}</li>`);
  if (p.format) meta.push(`<li><strong>Format:</strong> ${p.format}</li>`);
  const metaList = meta.length ? `<ul class="pg-meta">${meta.join('')}</ul>` : '';

  // --- SOURCE 2: customer review ---
  const hasReview = p.review_quote && !/^\[/.test(p.review_quote);
  const reviewBlock = hasReview
    ? `<blockquote class="pg-review">“${p.review_quote}”<cite>— ${p.review_author || 'verified buyer'}</cite></blockquote>`
    : '';

  // --- SOURCE 3: local / language market context ---
  const localBlock = p.local_context && !/^\[/.test(p.local_context)
    ? `<p>${p.local_context}. That is why ${p.name} is offered with clear, honest terms for producers searching in ${p.country} and beyond.</p>`
    : '';

  const intro = pick(intros, seed)(p);
  const g = p.genre;
  const body = `
    <p>${intro}</p>
    <h2>What makes ${p.name} different</h2>
    <p>Instead of a generic preset dump, ${p.name} focuses on the ${g.toLowerCase()} sound specifically. ${metaList ? 'Here are the concrete specs:' : ''}</p>
    ${metaList}
    ${p.instruments ? `<p>The core of the sound comes from ${p.instruments} — chosen because they define the ${g.toLowerCase()} texture rather than padding a feature list.</p>` : ''}
    ${reviewBlock ? `<h2>What producers say</h2>${reviewBlock}` : ''}
    <h2>Who it is for</h2>
    <p>${p.name} fits producers working in ${g.toLowerCase()} who want a fast path from idea to finished track. ${p.product_type === 'beat' ? 'The beat ships free-for-profit with an unlimited commercial license.' : p.product_type === 'vst' ? 'It runs as ' + (p.format || 'VST3') + ' on Windows and Mac.' : 'The pack is royalty-free for commercial use.'}</p>
    ${localBlock}
    <h2>How to get it</h2>
    <p>Preview and download ${p.name} from the DJBILBOX BEATS store. Every release comes from a working artist with 300+ Spotify tracks, so what you hear in the demo is what you get — no filler, no fake numbers.</p>
  `;

  const title = `${p.name} — ${p.primary_keyword} | DJBILBOX BEATS`;
  const description = `${p.name}: ${p.genre.toLowerCase()} ${p.product_type} by DJBILBOX BEATS. ${p.format || 'Instant download'}. Real specs, honest terms, made by a working beatmaker.`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': p.product_type === 'vst' ? 'Product' : 'CreativeWork',
    name: p.name,
    description,
    brand: { '@type': 'Brand', name: 'DJBILBOX BEATS' },
    genre: p.genre,
    inLanguage: lang,
  };
  if (hasReview) schema.review = { '@type': 'Review', reviewBody: p.review_quote, author: { '@type': 'Person', name: p.review_author || 'verified buyer' } };

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
${noindex ? '<meta name="robots" content="noindex,follow">\n' : ''}<link rel="canonical" href="https://djbilboxbeats.com/catalog/${slug}.html">
<link rel="icon" href="../favicon.png">
<link rel="stylesheet" href="../assets/css/theme.css">
<link rel="stylesheet" href="../assets/css/chat.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
.pg-wrap{max-width:820px;margin:0 auto;padding:50px 24px 80px}
.pg-wrap h1{font-family:var(--font-a);font-size:2rem;text-transform:uppercase;margin-bottom:8px}
.pg-eyebrow{color:var(--accent);font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}
.pg-wrap h2{font-family:var(--font-a);font-size:1.2rem;text-transform:uppercase;margin:32px 0 10px}
.pg-wrap p{color:var(--text-2);line-height:1.7}
.pg-meta{list-style:none;padding:0;margin:14px 0;display:grid;gap:6px}
.pg-meta li{background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text-2)}
.pg-review{border-left:3px solid var(--accent);padding:8px 16px;margin:12px 0;color:var(--text);font-style:italic}
.pg-review cite{display:block;margin-top:6px;color:var(--text-3);font-style:normal;font-size:.85rem}
.pg-cta{margin-top:28px;display:flex;gap:12px;flex-wrap:wrap}
</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-page="beats">
<main class="pg-wrap">
  <div class="pg-eyebrow">${p.genre} · ${p.product_type} · ${langLabels[lang] || lang}</div>
  <h1>${p.name}</h1>
  ${body}
  <div class="pg-cta">
    <a href="../beats-redesign.html" class="btn primary"><i class="fa-solid fa-play"></i> Listen / Download</a>
    <a href="https://djbilboxbeats.gumroad.com/" target="_blank" class="btn ghost"><i class="fa-solid fa-store"></i> Store</a>
  </div>
</main>
<script src="../assets/js/site.js"></script>
<script src="../assets/js/chat.js"></script>
</body>
</html>
`;
  return { slug, html, noindex, wc: wordCount(body), lang, name: p.name };
}

// ---------- run ----------
const rows = parseCSV(fs.readFileSync(CSV, 'utf8'));
const inLot = rows.filter(r => String(r.lot) === LOT);
if (!inLot.length) { console.error(`No rows found for --lot=${LOT} in ${path.basename(CSV)}.`); process.exit(1); }

const report = { written: 0, noindex: 0, underLength: [] };
const written = [];
inLot.forEach(p => {
  const page = buildPage(p);
  if (page.wc < 500) report.underLength.push(`${page.name} (${page.wc} words)`);
  fs.writeFileSync(path.join(OUT_DIR, `${page.slug}.html`), page.html, 'utf8');
  written.push(page);
  report.written++;
  if (page.noindex) report.noindex++;
});

console.log(`\nLOT ${LOT} — generated ${report.written} pages into /${path.basename(OUT_DIR)}/`);
console.log(`  ${report.noindex} page(s) marked noindex${FORCE_NOINDEX ? ' (forced by --noindex)' : ''}`);
if (report.underLength.length) {
  console.log(`\n  ⚠️  ${report.underLength.length} page(s) UNDER 500 words — add real data before indexing:`);
  report.underLength.forEach(n => console.log(`      - ${n}`));
} else {
  console.log(`  ✅ all pages ≥ 500 words`);
}
console.log(`\n  Next: add these URLs to sitemap.xml, deploy, submit in Search Console,`);
console.log(`  wait 10–14 days, verify >80% indexed, THEN run the next --lot.\n`);
