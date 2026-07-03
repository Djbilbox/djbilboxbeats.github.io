/* ============================================================
   DJBILBOX BEATS — Location page generator
   Generates real, static, unique-content city pages into /locations/
   Run: node scripts/generate-locations.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'locations');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const GENRES_ALL = ['Trap', 'Oriental', 'Drill', 'G-Funk', 'Afrotrap', 'Deep House'];

// ---------- DATA ----------
const countries = [
  { country: 'Algeria', code: 'dz', flag: '🇩🇿', genres: ['Oriental', 'Trap'],
    cities: ['Alger', 'Blida', 'Oran', 'Tlemcen', 'Batna', 'Setif', 'Tizi Ouzou', 'Constantine', 'Annaba', 'Tamanrasset', 'Ghardaia', 'Bejaia', 'Skikda', 'Bouira', 'Kouba'] },
  { country: 'Morocco', code: 'ma', flag: '🇲🇦', genres: ['Oriental', 'Trap'],
    cities: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tanger', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Safi', 'El Jadida', 'Beni Mellal', 'Nador', 'Khouribga', 'Settat', 'Larache', 'Ksar El Kebir', 'Guelmim', 'Berrechid', 'Taza', 'Essaouira', 'Khemisset', 'Errachidia', 'Sidi Slimane', 'Al Hoceima', 'Ouarzazate', 'Tiznit', 'Berkane', 'Taroudant'] },
  { country: 'Tunisia', code: 'tn', flag: '🇹🇳', genres: ['Oriental', 'Trap'],
    cities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabes', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous', 'Kasserine', 'Medenine', 'Nabeul', 'Beja', 'Jendouba', 'Mahdia', 'Sidi Bouzid', 'Tozeur', 'Siliana', 'Le Kef', 'Tataouine', 'Zaghouan', 'La Manouba', 'Kebili'] },
  { country: 'Egypt', code: 'eg', flag: '🇪🇬', genres: ['Oriental', 'Trap'],
    cities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Faiyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada', 'Shibin El Kom', 'Banha', 'Kafr El Sheikh', 'Arish', 'Marsa Matruh', 'Sharm El Sheikh', '6th of October City', 'New Cairo'] },
  { country: 'France', code: 'fr', flag: '🇫🇷', genres: ['Trap', 'Oriental'],
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Etienne', 'Toulon'] },
  { country: 'United Kingdom', code: 'gb', flag: '🇬🇧', genres: ['Drill', 'Trap'],
    cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Southampton', 'Nottingham', 'Peterborough', 'Leicester', 'Coventry', 'Bradford', 'Stoke-on-Trent', 'Wolverhampton', 'Plymouth', 'Derby', 'Reading', 'Kingston upon Hull', 'Preston', 'Milton Keynes', 'Northampton', 'Norwich', 'Luton', 'York', 'Portsmouth', 'Middlesbrough', 'Sunderland', 'Blackpool', 'Oxford', 'Cambridge', 'Ipswich', 'Slough', 'Gloucester', 'Watford', 'Bolton', 'Blackburn', 'Exeter', 'Colchester', 'Chelmsford', 'Bournemouth', 'Swindon', 'Huddersfield', 'Warrington', 'Wigan', 'Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness', 'Stirling', 'Paisley', 'Dunfermline', 'Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Bangor (Wales)', 'St Davids', 'Merthyr Tydfil', 'Belfast', 'Derry-Londonderry', 'Lisburn', 'Newry', 'Bangor (NI)'] },
  { country: 'Ireland', code: 'ie', flag: '🇮🇪', genres: ['Drill', 'Trap'],
    cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda', 'Dundalk', 'Swords', 'Bray', 'Navan', 'Ennis', 'Kilkenny', 'Carlow', 'Tralee', 'Newbridge', 'Portlaoise', 'Naas', 'Athlone', 'Mullingar', 'Letterkenny', 'Sligo', 'Clonmel', 'Malahide', 'Leixlip', 'Killarney'] },
  { country: 'Canada', code: 'ca', flag: '🇨🇦', genres: ['Trap', 'Drill'],
    cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London (Ontario)', 'Victoria', 'Halifax', 'Oshawa', 'Windsor', 'Saskatoon', 'Regina', "St. John's", 'Barrie', 'Kelowna', 'Sudbury', 'Kingston', 'Sherbrooke', 'Guelph', 'Moncton'] },
];

// USA — genre assigned by region for authenticity (Atlanta=trap birthplace, Chicago/NY=drill, West Coast=G-Funk)
const usaRegions = [
  { genres: ['Drill', 'Trap'], cities: ['New York', 'Philadelphia', 'Boston', 'Pittsburgh', 'Newark', 'Jersey City', 'Buffalo', 'Rochester', 'Providence', 'Hartford'] },
  { genres: ['Trap', 'Drill'], cities: ['Washington DC', 'Baltimore', 'Richmond', 'Virginia Beach', 'Norfolk'] },
  { genres: ['Trap', 'Afrotrap'], cities: ['Miami', 'Atlanta', 'Orlando', 'Tampa', 'Jacksonville', 'Charlotte', 'Raleigh', 'Nashville', 'Memphis', 'New Orleans', 'Charleston', 'Louisville'] },
  { genres: ['Drill', 'Trap'], cities: ['Chicago', 'Detroit', 'Columbus', 'Indianapolis', 'Milwaukee', 'Minneapolis', 'St. Louis', 'Kansas City', 'Cincinnati', 'Cleveland', 'Omaha', 'Des Moines'] },
  { genres: ['Trap', 'G-Funk'], cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Oklahoma City', 'Tulsa'] },
  { genres: ['G-Funk', 'Trap'], cities: ['Los Angeles', 'San Diego', 'San Francisco', 'San Jose', 'Sacramento', 'Las Vegas', 'Phoenix', 'Tucson'] },
  { genres: ['G-Funk', 'Deep House'], cities: ['Seattle', 'Portland', 'Denver', 'Salt Lake City', 'Boise'] },
];
usaRegions.forEach(r => countries.push({ country: 'United States', code: 'us', flag: '🇺🇸', genres: r.genres, cities: r.cities }));

// Gulf — mixed countries
const gulf = [
  { name: 'Dubai', country: 'United Arab Emirates', code: 'ae' },
  { name: 'Abu Dhabi', country: 'United Arab Emirates', code: 'ae' },
  { name: 'Sharjah', country: 'United Arab Emirates', code: 'ae' },
  { name: 'Al Ain', country: 'United Arab Emirates', code: 'ae' },
  { name: 'Doha', country: 'Qatar', code: 'qa' },
  { name: 'Riyadh', country: 'Saudi Arabia', code: 'sa' },
  { name: 'Jeddah', country: 'Saudi Arabia', code: 'sa' },
  { name: 'Mecca', country: 'Saudi Arabia', code: 'sa' },
  { name: 'Dammam', country: 'Saudi Arabia', code: 'sa' },
  { name: 'Kuwait City', country: 'Kuwait', code: 'kw' },
  { name: 'Manama', country: 'Bahrain', code: 'bh' },
  { name: 'Muscat', country: 'Oman', code: 'om' },
];
const gulfFlags = { ae: '🇦🇪', qa: '🇶🇦', sa: '🇸🇦', kw: '🇰🇼', bh: '🇧🇭', om: '🇴🇲' };
gulf.forEach(g => countries.push({ country: g.country, code: g.code, flag: gulfFlags[g.code], genres: ['Oriental', 'Trap'], cities: [g.name] }));

// ---------- HELPERS ----------
function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
function pick(arr, seed) { return arr[seed % arr.length]; }

const introTemplates = [
  (c, co, g1, g2) => `Looking for free ${g1.toLowerCase()} beats in ${c}? DJBILBOX BEATS gives producers in ${c}, ${co} instant access to a growing library of 1000+ royalty-free instrumentals — including ${g1} and ${g2} — all under a free unlimited commercial license.`,
  (c, co, g1, g2) => `${c} producers are turning to DJBILBOX BEATS for free ${g1.toLowerCase()} and ${g2.toLowerCase()} instrumentals. No paywall, no subscription — just download and start creating, with a license that covers commercial use worldwide.`,
  (c, co, g1, g2) => `From bedroom producers to touring artists, musicians in ${c} use DJBILBOX BEATS to find free ${g1.toLowerCase()} beats ready for vocals, YouTube, or streaming — no credit required, no hidden fees.`,
  (c, co, g1, g2) => `DJBILBOX BEATS is a go-to free beat library for artists in ${c}, ${co}. With over 1000 instrumentals spanning ${g1}, ${g2} and more, every download comes with an unlimited commercial license.`,
  (c, co, g1, g2) => `Building a track in ${c}? Skip expensive beat leases — DJBILBOX BEATS offers free, professionally produced ${g1} instrumentals with full commercial rights, used by producers across ${co}.`,
  (c, co, g1, g2) => `${c} is home to a growing wave of independent artists, and DJBILBOX BEATS fuels that scene with free ${g1.toLowerCase()} and ${g2.toLowerCase()} beats — download instantly, credit optional, use anywhere.`,
  (c, co, g1, g2) => `Whether you produce ${g1.toLowerCase()} or ${g2.toLowerCase()}, DJBILBOX BEATS has you covered in ${c}. 1000+ free instrumentals, unlimited commercial license, zero cost to start.`,
  (c, co, g1, g2) => `Producers across ${co} — including artists based in ${c} — download free ${g1.toLowerCase()} beats from DJBILBOX BEATS every day. No sign-up fees, no royalties owed, just music.`,
];

const whyTemplates = [
  (c) => `DJBILBOX BEATS has built a catalog of 1000+ free instrumentals, 475+ tracks released on Spotify, and 423K+ YouTube views — proof that the quality holds up, whether you're producing in ${c} or anywhere else in the world.`,
  (c) => `Unlike marketplaces that charge per lease, every beat on DJBILBOX BEATS ships with a Free Unlimited License: use it commercially, monetize your song, upload it anywhere — no credit required in ${c} or elsewhere.`,
  (c) => `Producers in ${c} choose DJBILBOX BEATS because the catalog is genuinely free — not a "free trial" — with 1000+ beats covering Trap, Oriental, Drill, G-Funk, Afrotrap and Deep House.`,
  (c) => `With 3000+ videos and a track record spanning 150+ countries, DJBILBOX BEATS has become a trusted name for free, royalty-free production music — including for artists working out of ${c}.`,
  (c) => `No middlemen, no beat-store markup: DJBILBOX BEATS gives ${c} producers direct access to a professionally mixed instrumental library, free for commercial use from day one.`,
  (c) => `Every instrumental in the DJBILBOX BEATS library is cleared for commercial release — a key reason artists in ${c} rely on it for singles, mixtapes, and content monetized on YouTube or streaming platforms.`,
  (c) => `DJBILBOX BEATS combines a large free catalog with a simple licensing model, which is why the library keeps growing in popularity among ${c} producers looking for quality without the price tag.`,
  (c) => `From free downloads to exclusive stems, DJBILBOX BEATS offers a full pipeline for ${c} artists — start with a free beat, then upgrade to an exclusive license once you're ready to release.`,
];

const genreParaTemplates = [
  (c, g1, g2, g3, g4) => `The most requested genres for ${c} producers are ${g1} and ${g2}, but the DJBILBOX BEATS catalog also covers ${g3} and ${g4} — giving you room to experiment without leaving the library.`,
  (c, g1, g2, g3, g4) => `${g1} leads the way in ${c}, closely followed by ${g2}. If you're producing ${g3} or ${g4}, the same free-license terms apply across the entire catalog.`,
  (c, g1, g2, g3, g4) => `Whether your sound leans ${g1}, ${g2}, ${g3} or ${g4}, DJBILBOX BEATS keeps every genre under one roof — filter by BPM, key, or mood to find the right instrumental fast.`,
];

const howToVariants = [
  (c) => `<ol><li>Browse the full <strong>${c}</strong>-ready catalog on the <a href="../beats-redesign.html">Beats page</a>.</li><li>Preview instrumentals by genre, BPM or key, then hit download.</li><li>Read the <a href="../license.html">Free Unlimited License</a> terms — commercial use is covered from the first download.</li></ol>`,
  (c) => `<ol><li>Open the <a href="../beats-redesign.html">Beats library</a> and filter by genre.</li><li>Download any instrumental — no account or payment needed.</li><li>Check the <a href="../license.html">license page</a> for exclusive/stems options if you want full ownership.</li></ol>`,
];

const faqAnswers = {
  commercial: [
    (c) => `Yes. Every free beat downloaded by producers in ${c} includes an unlimited commercial license — you can release, monetize, and distribute your song worldwide.`,
    (c) => `Yes — the Free Unlimited License covers commercial releases for artists in ${c} and everywhere else. No extra clearance needed.`,
  ],
  credit: [
    () => `No credit is required, though a tag like "Prod. by DJBILBOX BEATS" is always appreciated and helps support future free releases.`,
    () => `Credit is optional. It's not required for commercial use, but mentioning DJBILBOX BEATS in your description helps the project grow.`,
  ],
  formats: [
    () => `Beats are available as high-quality MP3 or WAV files. Exclusive license buyers also receive full stems and project files.`,
    () => `You'll get MP3/WAV downloads instantly. For stems and trackout files, check the Exclusive License option.`,
  ],
};

// ---------- BUILD PAGES ----------
const allPages = []; // for sitemap + index

countries.forEach(({ country, code, flag, genres, cities }) => {
  cities.forEach((cityRaw) => {
    const city = cityRaw.replace(/ \((Wales|NI|Ontario)\)$/, '').trim();
    const displayCity = cityRaw;
    const seed = hash(country + cityRaw);
    const [g1, g2] = genres;
    const others = GENRES_ALL.filter(g => g !== g1 && g !== g2);
    const g3 = pick(others, seed);
    const g4 = pick(others, seed + 7);

    const citySlug = slugify(cityRaw);
    const countrySlug = slugify(country);
    const fileSlug = `${countrySlug}-${citySlug}`;
    const fileName = `${fileSlug}.html`;

    const intro = pick(introTemplates, seed)(displayCity, country, g1, g2);
    const why = pick(whyTemplates, seed + 3)(displayCity);
    const genrePara = pick(genreParaTemplates, seed + 5)(displayCity, g1, g2, g3, g4);
    const howTo = pick(howToVariants, seed + 1)(displayCity);
    const faqCommercial = pick(faqAnswers.commercial, seed)(displayCity);
    const faqCredit = pick(faqAnswers.credit, seed + 2)();
    const faqFormats = pick(faqAnswers.formats, seed + 4)();

    const title = `Free ${g1} Beats in ${displayCity} | Download Now — DJBILBOX BEATS`;
    const description = `Download free ${g1.toLowerCase()} & ${g2.toLowerCase()} beats for ${displayCity}, ${country}. 1000+ royalty-free instrumentals, unlimited commercial license, instant download.`;

    // pick 5 "related cities" from same country for internal linking (excluding self)
    const related = cities.filter(x => x !== cityRaw);
    const relatedPicks = [];
    for (let i = 0; i < Math.min(5, related.length); i++) {
      relatedPicks.push(related[(seed + i * 13) % related.length]);
    }
    const relatedUnique = [...new Set(relatedPicks)];
    const relatedLinks = relatedUnique.map(rc => {
      const rSlug = `${countrySlug}-${slugify(rc)}.html`;
      return `<a href="${rSlug}">${rc}</a>`;
    }).join(' · ');

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: `Free ${g1} Beats in ${displayCity}`,
      description,
      creator: { '@type': 'MusicGroup', name: 'DJBILBOX BEATS', url: 'https://djbilboxbeats.com' },
      inLanguage: 'en',
      about: `${g1} music production in ${displayCity}, ${country}`
    };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="https://djbilboxbeats.com/locations/${fileName}">
<link rel="icon" href="../favicon.png">
<link rel="stylesheet" href="../assets/css/theme.css">
<link rel="stylesheet" href="../assets/css/chat.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
.loc-wrap{max-width:820px;margin:0 auto;padding:50px 24px 80px}
.loc-crumb{font-size:.8rem;color:var(--text-3);margin-bottom:18px}
.loc-crumb a{color:var(--text-3)}
.loc-crumb a:hover{color:var(--accent)}
.loc-h1{font-family:var(--font-a);font-size:2rem;font-weight:700;text-transform:uppercase;margin-bottom:10px;line-height:1.15}
.loc-eyebrow{color:var(--accent);font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}
.loc-lead{color:var(--text-2);font-size:1.05rem;line-height:1.6;margin-bottom:28px}
.loc-cta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:40px}
.loc-section h2{font-family:var(--font-a);font-size:1.25rem;font-weight:700;text-transform:uppercase;margin:36px 0 12px}
.loc-section p, .loc-section ol{color:var(--text-2);line-height:1.7;font-size:.98rem}
.loc-section ol{padding-left:20px}
.loc-faq details{background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 18px;margin-bottom:10px}
.loc-faq summary{cursor:pointer;font-weight:700;color:var(--text)}
.loc-faq p{margin-top:10px}
.loc-related{margin-top:40px;padding-top:24px;border-top:1px solid var(--border);font-size:.9rem;color:var(--text-3)}
.loc-related a{color:var(--accent);text-decoration:none}
.loc-related a:hover{text-decoration:underline}
</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-page="beats">

<main class="loc-wrap">
  <div class="loc-crumb"><a href="../index.html">Home</a> / <a href="index.html">Cities</a> / ${displayCity}</div>
  <div class="loc-eyebrow">${flag} ${displayCity}, ${country}</div>
  <h1 class="loc-h1">Free ${g1} Beats for ${displayCity} Producers</h1>
  <p class="loc-lead">${intro}</p>
  <div class="loc-cta">
    <a href="../beats-redesign.html" class="btn primary"><i class="fa-solid fa-play"></i> Listen & Download Beats</a>
    <a href="../license.html" class="btn ghost"><i class="fa-solid fa-id-card"></i> Free License Info</a>
  </div>

  <div class="loc-section">
    <h2>Why ${displayCity} Producers Choose DJBILBOX BEATS</h2>
    <p>${why}</p>

    <h2>Popular Genres for ${displayCity} Artists</h2>
    <p>${genrePara}</p>

    <h2>How to Download Free Beats in ${displayCity}</h2>
    ${howTo}
  </div>

  <div class="loc-section loc-faq">
    <h2>FAQ</h2>
    <details><summary>Can I use these beats commercially in ${displayCity}?</summary><p>${faqCommercial}</p></details>
    <details><summary>Do I need to credit DJBILBOX BEATS?</summary><p>${faqCredit}</p></details>
    <details><summary>What file formats are included?</summary><p>${faqFormats}</p></details>
  </div>

  ${relatedLinks ? `<div class="loc-related">Also serving: ${relatedLinks}</div>` : ''}
</main>

<script src="../assets/js/site.js"></script>
<script src="../assets/js/chat.js"></script>
</body>
</html>
`;

    fs.writeFileSync(path.join(OUT_DIR, fileName), html, 'utf8');
    allPages.push({ fileName, city: displayCity, country, flag, code });
  });
});

// ---------- LOCATIONS INDEX PAGE ----------
const byCountry = {};
allPages.forEach(p => {
  if (!byCountry[p.country]) byCountry[p.country] = { flag: p.flag, pages: [] };
  byCountry[p.country].pages.push(p);
});

const countryBlocks = Object.entries(byCountry).map(([country, { flag, pages }]) => {
  const links = pages
    .sort((a, b) => a.city.localeCompare(b.city))
    .map(p => `<a href="${p.fileName}">${p.city}</a>`)
    .join('');
  return `<div class="loc-country">
    <h3>${flag} ${country} <span class="loc-count">(${pages.length})</span></h3>
    <div class="loc-citylinks">${links}</div>
  </div>`;
}).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Free Beats by City — 300+ Locations Worldwide | DJBILBOX BEATS</title>
<meta name="description" content="Find free beats for your city. DJBILBOX BEATS serves producers across ${allPages.length}+ cities in Algeria, Morocco, Tunisia, Egypt, France, UK, USA, Ireland, Canada &amp; the Gulf.">
<link rel="canonical" href="https://djbilboxbeats.com/locations/index.html">
<link rel="icon" href="../favicon.png">
<link rel="stylesheet" href="../assets/css/theme.css">
<link rel="stylesheet" href="../assets/css/chat.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
.loc-idx-wrap{max-width:1000px;margin:0 auto;padding:50px 24px 80px}
.loc-idx-h1{font-family:var(--font-a);font-size:2.2rem;font-weight:700;text-transform:uppercase;margin-bottom:10px}
.loc-idx-sub{color:var(--text-3);margin-bottom:40px}
.loc-country{background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin-bottom:16px}
.loc-country h3{font-family:var(--font-a);font-size:1.05rem;text-transform:uppercase;margin-bottom:12px}
.loc-count{color:var(--text-3);font-weight:400;text-transform:none}
.loc-citylinks a{display:inline-block;margin:0 10px 8px 0;color:var(--text-2);font-size:.88rem;text-decoration:none;padding:4px 10px;background:var(--surface);border-radius:6px;border:1px solid var(--border)}
.loc-citylinks a:hover{color:var(--accent);border-color:var(--accent)}
</style>
</head>
<body data-page="beats">
<main class="loc-idx-wrap">
  <div class="loc-eyebrow" style="color:var(--accent);font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px">${allPages.length}+ Cities Worldwide</div>
  <h1 class="loc-idx-h1">Free Beats by City</h1>
  <p class="loc-idx-sub">DJBILBOX BEATS serves producers across ${Object.keys(byCountry).length} countries. Pick your city for genre recommendations and a direct link to the free beat library.</p>
  ${countryBlocks}
</main>
<script src="../assets/js/site.js"></script>
<script src="../assets/js/chat.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(OUT_DIR, 'index.html'), indexHtml, 'utf8');

// ---------- SITEMAP ----------
const staticPages = [
  'index.html', 'beats-redesign.html', 'drum-kits.html', 'vst.html', 'services.html',
  'discography.html', 'license.html', 'reviews.html', 'news.html', 'contact.html',
  'studio-setup.html', 'locations/index.html'
];
const today = new Date().toISOString().slice(0, 10);
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
staticPages.forEach(p => {
  sitemap += `  <url>\n    <loc>https://djbilboxbeats.com/${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p === 'index.html' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
});
allPages.forEach(p => {
  sitemap += `  <url>\n    <loc>https://djbilboxbeats.com/locations/${p.fileName}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
});
sitemap += `</urlset>\n`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${allPages.length} location pages + locations/index.html`);
console.log(`Sitemap rewritten with ${staticPages.length + allPages.length} clean URLs (was 10,010 fake query-string URLs).`);
console.log(`Countries: ${Object.keys(byCountry).length}`);
