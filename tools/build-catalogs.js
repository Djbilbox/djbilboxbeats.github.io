#!/usr/bin/env node
/* Génère catalogs/products.csv + products.xml (Google Merchant) et
   catalogs/meta-products.csv (Meta Commerce) depuis assets/js/{products,packs,vst}-data.js.
   Usage : node tools/build-catalogs.js
   Prix = prix catalogue Gumroad (hors promo temporaire). Fiche : PRODUCTS > PACKS > VSTS (comme product.html). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), SITE = 'https://djbilboxbeats.com', BRAND = 'DJBILBOX BEATS';
const win = {}; const ctx = vm.createContext({ window: win, document: undefined, console });
for (const f of ['products-data.js', 'packs-data.js', 'vst-data.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js', f), 'utf8'), ctx, { filename: f });

const abs = u => !u ? '' : /^https?:/.test(u) ? u : SITE + '/' + u.replace(/^\//, '');
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const clean = s => strip(s).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}️]/gu, '').replace(/\s+/g, ' ').trim();
const items = new Map();
const add = (id, o) => { if (!items.has(id)) items.set(id, o); };

for (const [id, p] of Object.entries(win.PRODUCTS || {}))
  add(id, { type: p.type, name: p.name, desc: [p.tagline, ...(p.about || []), p.note].filter(Boolean).join(' '),
    img: p.cover, price: p.price, cur: p.cur, tags: p.tags });
for (const p of win.PACKS || [])
  add(p.id, { type: 'kit', name: p.name, desc: `${p.name} — ${p.genre || 'sample pack'} by ${BRAND}.`, img: p.img, price: p.price, tags: p.tags });
for (const p of win.VSTS || [])
  add(p.id, { type: 'vst', name: p.name, desc: `${p.note || p.name} — by HUMPIRE / ${BRAND}.`, img: p.img,
    price: p.free ? 'FREE' : p.price, cur: p.cur, tags: p.tags });

const rows = [];
for (const [id, p] of items) {
  const isFree = String(p.price).toUpperCase() === 'FREE';
  const n = isFree ? 0 : parseFloat(String(p.price).replace(',', '.').replace(/[^0-9.]/g, ''));
  if (!isFinite(n) || !p.img) { console.warn('skip', id); continue; }
  const vst = p.type === 'vst';
  rows.push({
    id, title: clean(p.name).slice(0, 150),
    description: (clean(p.desc) || clean(p.name)).slice(0, 4900),
    link: `${SITE}/product.html?id=${encodeURIComponent(id)}`,
    image_link: abs(p.img),
    price: `${n.toFixed(2)} ${p.cur === '€' ? 'EUR' : 'USD'}`,
    availability: 'in stock', condition: 'new', brand: BRAND,
    identifier_exists: 'no', // produits numériques sans GTIN
    google_product_category: vst ? 'Software > Multimedia & Design Software > Audio Software' : 'Media > Music & Sound Recordings',
    product_type: vst ? 'VST Plugins' : 'Sample Kits & Drum Kits'
  });
}

const q = v => /[",\n]/.test(v) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
const csv = (cols, sep) => cols.join(sep) + '\n' + rows.map(r => cols.map(c => q(r[c] ?? '')).join(sep)).join('\n') + '\n';
const gCols = ['id','title','description','link','image_link','price','availability','condition','brand','identifier_exists','google_product_category','product_type'];
fs.writeFileSync(path.join(ROOT, 'catalogs/products.csv'), csv(gCols, ','));

const x = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n<channel>\n<title>${BRAND}</title>\n<link>${SITE}</link>\n<description>VST plugins &amp; sample kits</description>\n` +
  rows.map(r => `<item>\n` + gCols.map(c => {
    const tag = c === 'title' || c === 'description' || c === 'link' ? c : 'g:' + c;
    return `  <${tag}>${x(r[c])}</${tag}>`;
  }).join('\n') + `\n</item>`).join('\n') + `\n</channel>\n</rss>\n`;
fs.writeFileSync(path.join(ROOT, 'catalogs/products.xml'), xml);

/* Meta Commerce : google_product_category/product_type acceptés ; identifier_exists n'existe pas côté Meta */
const mCols = ['id','title','description','availability','condition','price','link','image_link','brand','google_product_category','product_type'];
fs.writeFileSync(path.join(ROOT, 'catalogs/meta-products.csv'), csv(mCols, ','));
console.log(rows.length + ' produits');
