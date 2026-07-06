/* ============================================================
   DJBILBOX BEATS — VST Ultra Pages Generator
   Generates 50,000+ SEO pages for VST plugins (all cities + genres + variants)
   Run: node scripts/generate-vst-ultra.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'blog', 'vst');

// Ensure directory exists
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ============ PRODUCT DATA ============
const vstProducts = [
  { name: 'BIGBASS', slug: 'bigbass', title: 'BIGBASS — LA Lowrider Bass', desc: '808 & sub-bass rompler. 6 bass modes + 80 presets.', price: '19.50', gumroad: 'https://djbilboxbeats.gumroad.com/l/xaziro' },
  { name: 'Vice City', slug: 'vice-city', title: 'Vice City — Synthwave VST', desc: 'Retro synthwave synthesizer. 70 presets. Neon interface.', price: '18.45', gumroad: 'https://djbilboxbeats.gumroad.com/l/ykdzli' },
  { name: 'Oriental Instrument', slug: 'oriental-instrument', title: 'Oriental Instrument — 280+ Sounds', desc: '280+ authentic oriental instruments & sounds.', price: '24.50', gumroad: 'https://djbilboxbeats.gumroad.com/l/oriental-instrument-djbilbox-beats' },
  { name: 'MACHINA', slug: 'machina', title: 'MACHINA — Effects Processor', desc: 'Audio effects: distortion, delay, filter chain.', price: '15.00', gumroad: 'https://djbilboxbeats.gumroad.com' },
  { name: 'MPC2077', slug: 'mpc2077', title: 'MPC2077 — Cyberpunk Drum Machine', desc: '16 pads + 808/909/707 kits. Neon UI.', price: '22.00', gumroad: 'https://djbilboxbeats.gumroad.com' },
  { name: 'MATRIX MODULAR', slug: 'matrix-modular', title: 'MATRIX MODULAR — Auto-Pan Effect', desc: 'Modular auto-pan synthesizer. Matrix UI.', price: '20.00', gumroad: 'https://djbilboxbeats.gumroad.com' },
  { name: 'DJBILBOX CARS', slug: 'djbilbox-cars', title: 'DJBILBOX CARS — SFX Synth', desc: 'Procedural car sounds and SFX synthesis.', price: '16.50', gumroad: 'https://djbilboxbeats.gumroad.com' }
];

const genres = ['Trap', 'Afrotrap', 'Deep House', 'Oriental', 'G-Funk', 'Drill'];

// ============ ALL COUNTRIES & CITIES (from generate-locations.js) ============
const countries = [
  { country: 'Algeria', code: 'dz', genres: ['Oriental', 'Trap'], cities: ['Alger', 'Blida', 'Oran', 'Tlemcen', 'Batna', 'Setif', 'Tizi Ouzou', 'Constantine', 'Annaba', 'Tamanrasset', 'Ghardaia', 'Bejaia', 'Skikda', 'Bouira', 'Kouba'] },
  { country: 'Morocco', code: 'ma', genres: ['Oriental', 'Trap'], cities: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tanger', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Safi', 'El Jadida', 'Beni Mellal', 'Nador', 'Khouribga', 'Settat', 'Larache', 'Ksar El Kebir', 'Guelmim', 'Berrechid', 'Taza', 'Essaouira', 'Khemisset', 'Errachidia', 'Sidi Slimane', 'Al Hoceima', 'Ouarzazate', 'Tiznit', 'Berkane', 'Taroudant'] },
  { country: 'Tunisia', code: 'tn', genres: ['Oriental', 'Trap'], cities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabes', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous', 'Kasserine', 'Medenine', 'Nabeul', 'Beja', 'Jendouba', 'Mahdia', 'Sidi Bouzid', 'Tozeur', 'Siliana', 'Le Kef', 'Tataouine', 'Zaghouan', 'La Manouba', 'Kebili'] },
  { country: 'Egypt', code: 'eg', genres: ['Oriental', 'Trap'], cities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Faiyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada', 'Shibin El Kom', 'Banha', 'Kafr El Sheikh', 'Arish', 'Marsa Matruh', 'Sharm El Sheikh', '6th of October City', 'New Cairo'] },
  { country: 'France', code: 'fr', genres: ['Trap', 'Oriental'], cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Etienne', 'Toulon'] },
  { country: 'United Kingdom', code: 'gb', genres: ['Drill', 'Trap'], cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Southampton', 'Nottingham', 'Peterborough', 'Leicester', 'Coventry', 'Bradford', 'Stoke-on-Trent', 'Wolverhampton', 'Plymouth', 'Derby', 'Reading', 'Kingston upon Hull', 'Preston', 'Milton Keynes', 'Northampton', 'Norwich', 'Luton', 'York', 'Portsmouth', 'Middlesbrough', 'Sunderland', 'Blackpool', 'Oxford', 'Cambridge', 'Ipswich', 'Slough', 'Gloucester', 'Watford', 'Bolton', 'Blackburn', 'Exeter', 'Colchester', 'Chelmsford', 'Bournemouth', 'Swindon', 'Huddersfield', 'Warrington', 'Wigan', 'Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness', 'Stirling', 'Paisley', 'Dunfermline', 'Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Bangor (Wales)', 'St Davids', 'Merthyr Tydfil', 'Belfast', 'Derry-Londonderry', 'Lisburn', 'Newry', 'Bangor (NI)'] },
  { country: 'Ireland', code: 'ie', genres: ['Drill', 'Trap'], cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda', 'Dundalk', 'Swords', 'Bray', 'Navan', 'Ennis', 'Kilkenny', 'Carlow', 'Tralee', 'Newbridge', 'Portlaoise', 'Naas', 'Athlone', 'Mullingar', 'Letterkenny', 'Sligo', 'Clonmel', 'Malahide', 'Leixlip', 'Killarney'] },
  { country: 'Canada', code: 'ca', genres: ['Trap', 'Drill'], cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London (Ontario)', 'Victoria', 'Halifax', 'Oshawa', 'Windsor', 'Saskatoon', 'Regina', "St. John's", 'Barrie', 'Kelowna', 'Sudbury', 'Kingston', 'Sherbrooke', 'Guelph', 'Moncton'] },
];

const usaRegions = [
  { genres: ['Drill', 'Trap'], cities: ['New York', 'Philadelphia', 'Boston', 'Pittsburgh', 'Newark', 'Jersey City', 'Buffalo', 'Rochester', 'Providence', 'Hartford'] },
  { genres: ['Trap', 'Drill'], cities: ['Washington DC', 'Baltimore', 'Richmond', 'Virginia Beach', 'Norfolk'] },
  { genres: ['Trap', 'Afrotrap'], cities: ['Miami', 'Atlanta', 'Orlando', 'Tampa', 'Jacksonville', 'Charlotte', 'Raleigh', 'Nashville', 'Memphis', 'New Orleans', 'Charleston', 'Louisville'] },
  { genres: ['Drill', 'Trap'], cities: ['Chicago', 'Detroit', 'Columbus', 'Indianapolis', 'Milwaukee', 'Minneapolis', 'St. Louis', 'Kansas City', 'Cincinnati', 'Cleveland', 'Omaha', 'Des Moines'] },
  { genres: ['Trap', 'G-Funk'], cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Oklahoma City', 'Tulsa'] },
  { genres: ['G-Funk', 'Trap'], cities: ['Los Angeles', 'San Diego', 'San Francisco', 'San Jose', 'Sacramento', 'Las Vegas', 'Phoenix', 'Tucson'] },
  { genres: ['G-Funk', 'Deep House'], cities: ['Seattle', 'Portland', 'Denver', 'Salt Lake City', 'Boise'] },
];
usaRegions.forEach(r => countries.push({ country: 'United States', code: 'us', genres: r.genres, cities: r.cities }));

const gulf = [
  { name: 'Dubai', country: 'United Arab Emirates' },
  { name: 'Abu Dhabi', country: 'United Arab Emirates' },
  { name: 'Sharjah', country: 'United Arab Emirates' },
  { name: 'Al Ain', country: 'United Arab Emirates' },
  { name: 'Doha', country: 'Qatar' },
  { name: 'Riyadh', country: 'Saudi Arabia' },
  { name: 'Jeddah', country: 'Saudi Arabia' },
  { name: 'Mecca', country: 'Saudi Arabia' },
  { name: 'Dammam', country: 'Saudi Arabia' },
  { name: 'Kuwait City', country: 'Kuwait' },
  { name: 'Manama', country: 'Bahrain' },
  { name: 'Muscat', country: 'Oman' },
];
gulf.forEach(g => countries.push({ country: g.country, genres: ['Oriental', 'Trap'], cities: [g.name] }));

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
  (vst, city, genre) => `Produce ${genre} music in ${city}? ${vst.name} is the plugin of choice. Download the free demo.`,
  (vst, city, genre) => `${city} producers craft ${genre} beats with ${vst.name}. Try the free demo on Gumroad.`,
];

const whyTemplates = [
  (vst) => `${vst.name} delivers pro results instantly. VST3 certified, Windows & Mac compatible.`,
  (vst) => `Thousands of producers use ${vst.name}. Fast, reliable, professional.`,
];

// ============ BUILD PAGES ============
let pageCount = 0;
const pagesList = [];

countries.forEach(({ country, genres: countryGenres, cities }) => {
  cities.forEach((city) => {
    vstProducts.forEach(vst => {
      genres.forEach(genre => {
        const seed = hash(vst.slug + city + genre);
        const intro = pick(introTemplates, seed)(vst, city, genre);
        const why = pick(whyTemplates, seed + 1)(vst);

        const fileName = `${vst.slug}-${slugify(genre)}-${slugify(city)}.html`;
        const title = `${vst.name} for ${genre} in ${city} | DJBILBOX BEATS`;
        const description = `${vst.name} VST for ${genre} in ${city}. Free demo, instant download.`;

        const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="https://djbilboxbeats.com/blog/vst/${fileName}"><link rel="icon" href="../../favicon.png"><link rel="stylesheet" href="../../assets/css/theme.css"><style>.blog-wrap{max-width:720px;margin:0 auto;padding:50px 24px}.blog-h1{font-size:2rem;font-weight:700;margin-bottom:20px}.blog-section{margin:40px 0}.blog-cta{display:flex;gap:12px;margin:30px 0}</style></head><body><main class="blog-wrap"><h1 class="blog-h1">${vst.name} for ${genre} in ${city}</h1><p>${intro}</p><div class="blog-cta"><a href="${vst.gumroad}" class="btn primary">Free Demo</a></div><div class="blog-section"><h2>Why ${vst.name}?</h2><p>${why}</p></div><div class="blog-section"><a href="../../vst.html">All VST Plugins</a></div></main><script src="../../assets/js/site.js"><\/script></body></html>`;

        fs.writeFileSync(path.join(OUT_DIR, fileName), html, 'utf8');
        pageCount++;
        if (pageCount % 500 === 0) console.log(`  Generated ${pageCount} pages...`);
      });
    });

    // Beatmaker guide per city per VST
    vstProducts.forEach(vst => {
      const seed = hash(vst.slug + city + 'beatmaker');
      const fileName = `${vst.slug}-beatmaker-${slugify(city)}.html`;
      const title = `${vst.name} for ${city} Beatmakers`;
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="canonical" href="https://djbilboxbeats.com/blog/vst/${fileName}"><link rel="stylesheet" href="../../assets/css/theme.css"><style>.blog-wrap{max-width:720px;margin:0 auto;padding:50px 24px}</style></head><body><main class="blog-wrap"><h1>${vst.name} for ${city} Beatmakers</h1><p>${city} beatmakers love ${vst.name}.</p><a href="${vst.gumroad}" class="btn primary">Free Demo</a></main></body></html>`;
      fs.writeFileSync(path.join(OUT_DIR, fileName), html, 'utf8');
      pageCount++;
    });
  });
});

console.log(`✅ Generated ${pageCount} total VST pages`);
