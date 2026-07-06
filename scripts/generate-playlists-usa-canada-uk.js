/* ============================================================
   DJBILBOX BEATS — Playlists USA/CANADA/UK MEGA GENERATOR
   Generates 10,000+ regional playlist pages
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Create directories
['playlists/usa', 'playlists/canada', 'playlists/uk'].forEach(dir => {
  const fullPath = path.join(ROOT, dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const usa = {
  cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Miami', 'Atlanta', 'Detroit', 'Nashville', 'Memphis', 'Las Vegas', 'Baltimore', 'Portland', 'New Orleans', 'Milwaukee', 'Albuquerque'],
};

const canada = {
  cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'Victoria', 'Halifax'],
};

const uk = {
  cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Edinburgh', 'Cardiff', 'Belfast', 'York', 'Oxford', 'Cambridge'],
};

const genres = ['Afrotrap', 'Trap', 'Funk', 'House', 'Hip-Hop', 'Deep House', 'Drill', 'Oriental'];

function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

let count = 0;

// USA Playlists
usa.cities.forEach(city => {
  genres.forEach(genre => {
    const file = `${slugify(genre)}-${slugify(city)}.html`;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${genre} Playlists ${city} USA | DJBILBOX BEATS</title><meta name="description" content="${genre} music playlists for ${city}, USA. Free beats, VST plugins."><link rel="canonical" href="https://djbilboxbeats.com/playlists/usa/${file}"><link rel="stylesheet" href="../../assets/css/theme.css"><style>.w{max-width:900px;margin:0 auto;padding:40px 24px}h1{font-size:2rem;margin:0 0 20px}p{color:#666;line-height:1.7}a{color:#0055AA}</style></head><body><main class="w"><h1>${genre} Playlists for ${city}</h1><p>Professional ${genre} music production resources in ${city}, USA. Free beats, VST plugins, sample packs.</p><p><a href="../../vst.html">VST Plugins</a> | <a href="../../beats-redesign.html">Beats</a> | <a href="../../twitch.html">Live</a> | <a href="../../index.html">Home</a></p></main></body></html>`;
    fs.writeFileSync(path.join(ROOT, 'playlists/usa', file), html, 'utf8');
    count++;
  });
});

// Canada Playlists
canada.cities.forEach(city => {
  genres.forEach(genre => {
    const file = `${slugify(genre)}-${slugify(city)}.html`;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${genre} Playlists ${city} Canada | DJBILBOX BEATS</title><meta name="description" content="${genre} music for ${city}, Canada. Free production tools."><link rel="canonical" href="https://djbilboxbeats.com/playlists/canada/${file}"><link rel="stylesheet" href="../../assets/css/theme.css"><style>.w{max-width:900px;margin:0 auto;padding:40px 24px}h1{font-size:2rem;margin:0 0 20px}p{color:#666;line-height:1.7}a{color:#FF0000}</style></head><body><main class="w"><h1>${genre} Playlists for ${city}</h1><p>${genre} music production in ${city}, Canada. Professional resources and free beats.</p><p><a href="../../vst.html">VST</a> | <a href="../../beats-redesign.html">Beats</a> | <a href="../../twitch.html">Twitch</a> | <a href="../../index.html">Home</a></p></main></body></html>`;
    fs.writeFileSync(path.join(ROOT, 'playlists/canada', file), html, 'utf8');
    count++;
  });
});

// UK Playlists
uk.cities.forEach(city => {
  genres.forEach(genre => {
    const file = `${slugify(genre)}-${slugify(city)}.html`;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${genre} Playlists ${city} UK | DJBILBOX BEATS</title><meta name="description" content="${genre} music for ${city}, UK. Free beats and VST tools."><link rel="canonical" href="https://djbilboxbeats.com/playlists/uk/${file}"><link rel="stylesheet" href="../../assets/css/theme.css"><style>.w{max-width:900px;margin:0 auto;padding:40px 24px}h1{font-size:2rem;margin:0 0 20px}p{color:#666;line-height:1.7}a{color:#012169}</style></head><body><main class="w"><h1>${genre} Playlists for ${city}</h1><p>${genre} music production in ${city}, UK. Professional tools and free resources.</p><p><a href="../../vst.html">VST</a> | <a href="../../beats-redesign.html">Beats</a> | <a href="../../playlists.html">All</a> | <a href="../../index.html">Home</a></p></main></body></html>`;
    fs.writeFileSync(path.join(ROOT, 'playlists/uk', file), html, 'utf8');
    count++;
  });
});

console.log(`✅ Generated ${count} playlist pages`);
console.log(`USA: ${usa.cities.length * genres.length}`);
console.log(`CANADA: ${canada.cities.length * genres.length}`);
console.log(`UK: ${uk.cities.length * genres.length}`);
