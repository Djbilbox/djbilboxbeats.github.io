/* ============================================================
   DJBILBOX BEATS — Sample Pack Pages Generator
   Generates 6,000+ SEO pages for drum kits & sample packs
   Run: node scripts/generate-kit-pages.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'blog', 'kits');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ============ PRODUCT DATA ============
const kitProducts = [
  {
    name: 'TONE VAULT',
    slug: 'tone-vault',
    type: 'One-Shots',
    desc: 'Ultimate instrument one-shots. WAV format, instant download.',
    price: '15',
    gumroad: 'https://djbilboxbeats.gumroad.com/l/yrkzl',
    icon: '🎹'
  },
  {
    name: 'VOID SIGNALS',
    slug: 'void-signals',
    type: 'SFX',
    desc: '19GB cinematic & sound effects suite. WAV, instant download.',
    price: '30',
    gumroad: 'https://djbilboxbeats.gumroad.com/l/mkijdn',
    icon: '⚡'
  },
  {
    name: 'GHOST VOICE',
    slug: 'ghost-voice',
    type: 'Vocals',
    desc: 'Vocal hooks & acapellas. WAV format, royalty-free.',
    price: '20',
    gumroad: 'https://djbilboxbeats.gumroad.com/l/fnpdxf',
    icon: '🎤'
  },
  {
    name: 'RAW ELEMENTS',
    slug: 'raw-elements',
    type: 'One-Shots',
    desc: 'Ultimate one-shot drum kit. 500+ hits, WAV.',
    price: '10',
    gumroad: 'https://djbilboxbeats.gumroad.com/l/pohwt',
    icon: '🥁'
  },
  {
    name: 'VINYL BREAKER',
    slug: 'vinyl-breaker',
    type: 'Hip-Hop',
    desc: 'Scratch & vinyl sample kit. Hip-hop loops, WAV.',
    price: '5',
    gumroad: 'https://djbilboxbeats.gumroad.com/l/yecrn',
    icon: '📀'
  },
  {
    name: 'NEON PULSE',
    slug: 'neon-pulse',
    type: 'House',
    desc: 'House & techno drum loops. 120+ loops, WAV.',
    price: '10',
    gumroad: 'https://djbilboxbeats.gumroad.com/l/argerk',
    icon: '✨'
  },
  {
    name: 'CONCRETE VAULT',
    slug: 'concrete-vault',
    type: 'Trap',
    desc: 'Trap & drill drum loops. 808s, hi-hats, kicks. WAV.',
    price: '12',
    gumroad: 'https://djbilboxbeats.gumroad.com/l/concrete',
    icon: '🔊'
  }
];

const genres = ['Trap', 'Afrotrap', 'Deep House', 'Oriental', 'G-Funk', 'Drill'];

// Location set
const locations = [
  { city: 'Paris', country: 'France' },
  { city: 'Tokyo', country: 'Japan' },
  { city: 'New York', country: 'USA' },
  { city: 'Lagos', country: 'Nigeria' },
  { city: 'Toulouse', country: 'France' },
  { city: 'Cairo', country: 'Egypt' },
  { city: 'Los Angeles', country: 'USA' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'London', country: 'UK' },
  { city: 'Toronto', country: 'Canada' },
  { city: 'Seoul', country: 'South Korea' },
  { city: 'Bangkok', country: 'Thailand' },
  { city: 'Istanbul', country: 'Turkey' },
  { city: 'Mexico City', country: 'Mexico' },
  { city: 'São Paulo', country: 'Brazil' },
  { city: 'Moscow', country: 'Russia' },
  { city: 'Singapore', country: 'Singapore' },
  { city: 'Hong Kong', country: 'Hong Kong' },
  { city: 'Amsterdam', country: 'Netherlands' },
  { city: 'Barcelona', country: 'Spain' },
  { city: 'Rome', country: 'Italy' },
  { city: 'Vienna', country: 'Austria' },
  { city: 'Stockholm', country: 'Sweden' },
  { city: 'Copenhagen', country: 'Denmark' },
  { city: 'Helsinki', country: 'Finland' },
  { city: 'Warsaw', country: 'Poland' },
  { city: 'Prague', country: 'Czech Republic' },
  { city: 'Budapest', country: 'Hungary' },
];

// ============ HELPERS ============
function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['']/g, '')
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
  (kit, city, genre) => `Create ${genre} beats in ${city} with ${kit.name} — a professional-grade sample pack with royalty-free sounds. Download instantly from DJBILBOX BEATS.`,
  (kit, city, genre) => `${city} producers trust ${kit.name} for ${genre} production. Premium ${genre} sounds, instant download, commercial use included.`,
  (kit, city, genre) => `Looking for ${genre} samples in ${city}? ${kit.name} delivers pro-quality loops and one-shots ready for your next track.`,
];

const whyTemplates = [
  (kit, genre) => `${kit.name} is optimized for ${genre} — every sample is mixed and ready to drop into your session. No extra processing needed.`,
  (kit) => `${kit.name} includes 100% royalty-free content. Use commercially, monetize, and distribute worldwide with no limits.`,
  (kit) => `${kit.name} is used by producers worldwide. Instant download, lifetime access — no subscription required.`,
];

const genreTemplates = [
  (kit, genre) => `${genre} producers especially love ${kit.name} because the sounds cut through the mix and maintain clarity in ${genre} arrangements.`,
  (kit, genre) => `${kit.name} samples sit perfectly in ${genre} mixes. Whether you're layering drums or creating new sounds, the quality is professional-grade.`,
];

const howToTemplates = [
  (kit, city) => `<ol><li>Download ${kit.name} from <a href="${kit.gumroad}">Gumroad</a>.</li><li>Extract the WAV files.</li><li>Load them into your DAW or sampler.</li><li>Start creating ${city}-inspired beats.</li></ol>`,
];

// ============ BUILD PAGES ============
const allPages = [];

kitProducts.forEach(kit => {
  // Pages per genre per city
  locations.forEach(loc => {
    genres.forEach(genre => {
      const seed = hash(kit.slug + loc.city + genre);
      const intro = pick(introTemplates, seed)(kit, loc.city, genre);
      const why = pick(whyTemplates, seed + 1)(kit);
      const genrePara = pick(genreTemplates, seed + 2)(kit, genre);
      const howTo = pick(howToTemplates, seed + 3)(kit, loc.city);

      const fileName = `${kit.slug}-${slugify(genre)}-${slugify(loc.city)}.html`;
      const title = `${kit.name} for ${genre} in ${loc.city} | DJBILBOX BEATS`;
      const description = `${kit.name} drum kit & sample pack for ${genre} production in ${loc.city}. Royalty-free WAV, instant download.`;

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: kit.name,
        description: kit.desc,
        category: kit.type,
        brand: { '@type': 'Brand', name: 'DJBILBOX BEATS' },
        offers: {
          '@type': 'Offer',
          price: kit.price,
          priceCurrency: 'USD',
          url: kit.gumroad,
          availability: 'https://schema.org/InStock'
        }
      };

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="https://djbilboxbeats.com/blog/kits/${fileName}">
<link rel="icon" href="../../favicon.png">
<link rel="stylesheet" href="../../assets/css/theme.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
.blog-wrap{max-width:720px;margin:0 auto;padding:50px 24px 80px}
.blog-h1{font-family:var(--font-a);font-size:2rem;font-weight:700;text-transform:uppercase;margin-bottom:10px}
.blog-meta{color:var(--text-3);font-size:.9rem;margin-bottom:30px}
.blog-lead{color:var(--text-2);font-size:1.05rem;line-height:1.6;margin-bottom:30px}
.blog-cta{display:flex;gap:12px;margin:30px 0}
.blog-section{margin:40px 0}
.blog-section h2{font-family:var(--font-a);font-size:1.25rem;margin:30px 0 15px}
.blog-section p{color:var(--text-2);line-height:1.7;margin-bottom:15px}
.blog-section ol{color:var(--text-2);padding-left:20px}
.blog-section li{margin-bottom:10px}
.blog-related{margin-top:40px;padding-top:30px;border-top:1px solid var(--border)}
.blog-related h3{font-size:1rem;margin-bottom:15px}
.blog-related a{display:inline-block;margin-right:15px;margin-bottom:10px;padding:8px 14px;background:var(--surface-2);border-radius:6px;color:var(--accent);text-decoration:none;font-size:.9rem}
.blog-related a:hover{background:var(--surface-3)}
</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-page="blog">

<main class="blog-wrap">
  <div class="blog-meta"><a href="../../drum-kits.html">← Sample Packs</a> / ${genre}</div>
  <h1 class="blog-h1">${kit.name} for ${genre} in ${loc.city}</h1>
  <p class="blog-lead">${intro}</p>
  <div class="blog-cta">
    <a href="${kit.gumroad}" class="btn primary">Download Now</a>
    <a href="../../drum-kits.html" class="btn ghost">All Kits</a>
  </div>

  <div class="blog-section">
    <h2>Why ${kit.name}?</h2>
    <p>${why}</p>
    <p>${genrePara}</p>
  </div>

  <div class="blog-section">
    <h2>How to Get Started</h2>
    ${howTo}
  </div>

  <div class="blog-section">
    <h2>What's Included</h2>
    <p>100% royalty-free ${genre} samples. Commercial use included. WAV format, instant download. No subscription — buy once, use forever.</p>
  </div>

  <div class="blog-related">
    <h3>Explore More</h3>
    <a href="../../beats-redesign.html">Browse ${genre} Beats</a>
    <a href="../../vst.html">VST Plugins</a>
    <a href="../../drum-kits.html">All Sample Packs</a>
  </div>
</main>

<script src="../../assets/js/site.js"></script>
</body>
</html>`;

      fs.writeFileSync(path.join(OUT_DIR, fileName), html, 'utf8');
      allPages.push({ fileName, kit: kit.name, genre, city: loc.city, country: loc.country });
    });

    // Producer guide per city
    const seed2 = hash(kit.slug + loc.city + 'producer');
    const intro2 = `${loc.city} producers love ${kit.name} for its versatility and professional sound. Whether you're producing Trap, Deep House, or any other genre, ${kit.name} has the sounds you need.`;
    const fileName2 = `${kit.slug}-producer-${slugify(loc.city)}.html`;
    const title2 = `${kit.name} for ${loc.city} Producers | DJBILBOX BEATS`;
    const html2 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title2}</title>
<meta name="description" content="${kit.name} sample pack for producers in ${loc.city}. Royalty-free, instant download.">
<link rel="canonical" href="https://djbilboxbeats.com/blog/kits/${fileName2}">
<link rel="icon" href="../../favicon.png">
<link rel="stylesheet" href="../../assets/css/theme.css">
<style>
.blog-wrap{max-width:720px;margin:0 auto;padding:50px 24px 80px}
.blog-h1{font-family:var(--font-a);font-size:2rem;font-weight:700;text-transform:uppercase;margin-bottom:30px}
.blog-section{margin:40px 0}
.blog-section h2{font-size:1.25rem;margin:30px 0 15px}
.blog-section p{color:var(--text-2);line-height:1.7;margin-bottom:15px}
.blog-cta{display:flex;gap:12px;margin:30px 0}
</style>
</head>
<body data-page="blog">
<main class="blog-wrap">
  <h1 class="blog-h1">${kit.name} for ${loc.city} Producers</h1>
  <p>${intro2}</p>
  <div class="blog-cta">
    <a href="${kit.gumroad}" class="btn primary">Download Now</a>
  </div>
  <div class="blog-section">
    <h2>Professional Samples for ${loc.city}</h2>
    <p>${kit.name} gives ${loc.city} producers instant access to pro-quality sounds. Download, load, and create — no filler, no bloat.</p>
  </div>
  <div class="blog-section">
    <h2>Royalty-Free, Commercial Ready</h2>
    <p>Use ${kit.name} in any project — beats, songs, podcasts, videos. Commercial use is always included. Monetize with confidence.</p>
  </div>
</main>
<script src="../../assets/js/site.js"></script>
</body>
</html>`;

    fs.writeFileSync(path.join(OUT_DIR, fileName2), html2, 'utf8');
    allPages.push({ fileName: fileName2, kit: kit.name, type: 'producer-city', city: loc.city, country: loc.country });
  });
});

// ============ SITEMAP UPDATE ============
console.log(`Generated ${allPages.length} sample pack pages`);
console.log(`Total: ${kitProducts.length} packs × ${genres.length} genres × ${locations.length} cities + producer guides`);
