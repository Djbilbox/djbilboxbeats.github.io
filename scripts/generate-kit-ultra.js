/* ============================================================
   DJBILBOX BEATS — Sample Pack Ultra Generator
   Generates 50,000+ SEO pages for drum kits & sample packs
   Run: node scripts/generate-kit-ultra.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'blog', 'kits');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ============ PRODUCT DATA ============
const kitProducts = [
  { name: 'TONE VAULT', slug: 'tone-vault', type: 'One-Shots', desc: 'Ultimate instrument one-shots. WAV format.', price: '15', gumroad: 'https://djbilboxbeats.gumroad.com/l/yrkzl' },
  { name: 'VOID SIGNALS', slug: 'void-signals', type: 'SFX', desc: '19GB cinematic & sound effects suite. WAV.', price: '30', gumroad: 'https://djbilboxbeats.gumroad.com/l/mkijdn' },
  { name: 'GHOST VOICE', slug: 'ghost-voice', type: 'Vocals', desc: 'Vocal hooks & acapellas. WAV format.', price: '20', gumroad: 'https://djbilboxbeats.gumroad.com/l/fnpdxf' },
  { name: 'RAW ELEMENTS', slug: 'raw-elements', type: 'One-Shots', desc: 'Ultimate one-shot drum kit. 500+ hits.', price: '10', gumroad: 'https://djbilboxbeats.gumroad.com/l/pohwt' },
  { name: 'VINYL BREAKER', slug: 'vinyl-breaker', type: 'Hip-Hop', desc: 'Scratch & vinyl sample kit. Hip-hop loops.', price: '5', gumroad: 'https://djbilboxbeats.gumroad.com/l/yecrn' },
  { name: 'NEON PULSE', slug: 'neon-pulse', type: 'House', desc: 'House & techno drum loops. 120+ loops.', price: '10', gumroad: 'https://djbilboxbeats.gumroad.com/l/argerk' },
  { name: 'CONCRETE VAULT', slug: 'concrete-vault', type: 'Trap', desc: 'Trap & drill drum loops. 808s, hi-hats, kicks.', price: '12', gumroad: 'https://djbilboxbeats.gumroad.com/l/concrete' },
  { name: 'ORIENTAL WAVES', slug: 'oriental-waves', type: 'Oriental', desc: 'Oriental percussion & instrument samples.', price: '18', gumroad: 'https://djbilboxbeats.gumroad.com' },
  { name: 'AFRO ESSENCE', slug: 'afro-essence', type: 'Afrobeat', desc: 'Afrobeat & afrotrap drum samples.', price: '16', gumroad: 'https://djbilboxbeats.gumroad.com' },
  { name: 'G-FUNK GROOVE', slug: 'gfunk-groove', type: 'G-Funk', desc: 'Classic G-Funk drum and bass samples.', price: '14', gumroad: 'https://djbilboxbeats.gumroad.com' },
];

const genres = ['Trap', 'Afrotrap', 'Deep House', 'Oriental', 'G-Funk', 'Drill'];

// ============ ALL COUNTRIES & CITIES ============
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
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function pick(arr, seed) { return arr[seed % arr.length]; }

const introTemplates = [
  (kit, city, genre) => `Create ${genre} beats in ${city} with ${kit.name}. Professional-grade samples, royalty-free. Download now.`,
  (kit, city, genre) => `${city} producers trust ${kit.name} for ${genre}. Premium sounds, instant download.`,
];

const whyTemplates = [
  (kit) => `${kit.name} delivers pro-quality sounds ready to drop into your session.`,
  (kit) => `100% royalty-free. Commercial use included. No subscription needed.`,
];

// ============ BUILD PAGES ============
let pageCount = 0;

countries.forEach(({ country, cities }) => {
  cities.forEach((city) => {
    kitProducts.forEach(kit => {
      genres.forEach(genre => {
        const seed = hash(kit.slug + city + genre);
        const intro = pick(introTemplates, seed)(kit, city, genre);
        const why = pick(whyTemplates, seed + 1)(kit);

        const fileName = `${kit.slug}-${slugify(genre)}-${slugify(city)}.html`;
        const title = `${kit.name} for ${genre} in ${city} | DJBILBOX BEATS`;
        const description = `${kit.name} drum kit for ${genre} in ${city}. Royalty-free WAV, instant download.`;

        const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="https://djbilboxbeats.com/blog/kits/${fileName}"><link rel="stylesheet" href="../../assets/css/theme.css"><style>.blog-wrap{max-width:720px;margin:0 auto;padding:50px 24px}.blog-h1{font-size:2rem;font-weight:700}.blog-cta{display:flex;gap:12px;margin:30px 0}</style></head><body><main class="blog-wrap"><h1 class="blog-h1">${kit.name} for ${genre} in ${city}</h1><p>${intro}</p><div class="blog-cta"><a href="${kit.gumroad}" class="btn primary">Download</a></div><div class="blog-section"><p>${why}</p><a href="../../drum-kits.html">All Kits</a></div></main></body></html>`;

        fs.writeFileSync(path.join(OUT_DIR, fileName), html, 'utf8');
        pageCount++;
        if (pageCount % 500 === 0) console.log(`  Generated ${pageCount} pages...`);
      });
    });

    // Producer guide per city per kit
    kitProducts.forEach(kit => {
      const fileName = `${kit.slug}-producer-${slugify(city)}.html`;
      const title = `${kit.name} for ${city} Producers`;
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="stylesheet" href="../../assets/css/theme.css"><style>.blog-wrap{max-width:720px;margin:0 auto;padding:50px 24px}</style></head><body><main class="blog-wrap"><h1>${kit.name} for ${city} Producers</h1><p>${city} producers love ${kit.name}.</p><a href="${kit.gumroad}" class="btn primary">Download</a></main></body></html>`;
      fs.writeFileSync(path.join(OUT_DIR, fileName), html, 'utf8');
      pageCount++;
    });
  });
});

console.log(`✅ Generated ${pageCount} total sample pack pages`);
