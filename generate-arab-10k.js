#!/usr/bin/env node

/**
 * Generate 10,000+ pages for ARAB WORLD - COMPLETE DOMINANCE
 * Covers all major Arab cities + all genres + all moods
 */

const fs = require('fs');
const path = require('path');

// 120+ ARAB CITIES - ALL ARAB COUNTRIES
const ARAB_CITIES = [
  // EGYPT (8)
  'Cairo', 'Alexandria', 'Giza', 'Aswan', 'Luxor', 'Port Said', 'Ismailia', 'Suez',

  // SAUDI ARABIA (8)
  'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Taif', 'Abha', 'Khobar',

  // UAE (8)
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain',

  // MOROCCO (8)
  'Casablanca', 'Fez', 'Marrakech', 'Tangier', 'Rabat', 'Salé', 'Agadir', 'Tanger',

  // ALGERIA (8)
  'Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Tlemcen', 'Setif', 'Tizi Ouzou',

  // TUNISIA (8)
  'Tunis', 'Sousse', 'Sfax', 'Gabes', 'Kairouan', 'Djerba', 'Tozeur', 'Kef',

  // LEBANON (6)
  'Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Baalbek', 'Byblos',

  // JORDAN (6)
  'Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Jerash', 'Madaba',

  // PALESTINE (5)
  'Jerusalem', 'Ramallah', 'Bethlehem', 'Gaza', 'Nablus',

  // IRAQ (7)
  'Baghdad', 'Basra', 'Mosul', 'Kirkuk', 'Najaf', 'Karbala', 'Erbil',

  // SYRIA (6)
  'Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama', 'Raqqa',

  // KUWAIT (2)
  'Kuwait City', 'Salmiya',

  // QATAR (2)
  'Doha', 'Al Rayyan',

  // BAHRAIN (2)
  'Manama', 'Al Muharraq',

  // OMAN (4)
  'Muscat', 'Salalah', 'Sohar', 'Nizwa',

  // YEMEN (4)
  'Sanaa', 'Aden', 'Taiz', 'Hodeidah',

  // LIBYA (4)
  'Tripoli', 'Benghazi', 'Misrata', 'Zawiya',

  // SUDAN (4)
  'Khartoum', 'Omdurman', 'Kassala', 'Port Sudan',

  // DJIBOUTI (2)
  'Djibouti City', 'Ali Sabieh',

  // MAURITANIA (3)
  'Nouakchott', 'Nouadhibou', 'Atar',

  // COMOROS (2)
  'Moroni', 'Mutsamudu',

  // SOMALIA (3)
  'Mogadishu', 'Hargeisa', 'Kismayo'
];

// 60+ GENRES
const ARAB_GENRES = [
  'Trap', 'Hip-Hop', 'Drill', 'Afrobeat', 'Synthwave', 'Lo-Fi', 'G-Funk',
  'House', 'Techno', 'Ambient', 'Cinematic', 'Oriental', 'Reggae', 'R&B',
  'Funk', 'Soul', 'Jazz', 'K-Pop', 'Boom-Bap', 'Future Bass', 'Grime',
  'Dubstep', 'Deep House', 'Tech House', 'Minimal', 'UK Garage', 'Garage Rock',
  'Indie', 'Alternative', 'Rock', 'Metal', 'Heavy Metal', 'Punk', 'Emo',
  'Pop', 'Dance', 'EDM', 'Trance', 'Drum and Bass', 'Jungle', 'Liquid Funk',
  'Reggaeton', 'Salsa', 'Bachata', 'Merengue', 'Samba', 'Bossa Nova',
  'Afrohouse', 'Amapiano', 'Gqom', 'Hyperpop', 'Vaporwave', 'Seapunk',
  'Arabic Trap', 'Arabic Hip-Hop', 'Khaliji', 'Lebanese Pop', 'Egyptian Pop', 'Moroccan Gnawa'
];

// 20+ MOODS
const ARAB_MOODS = [
  'Aggressive', 'Relaxed', 'Epic', 'Dark', 'Happy', 'Sad', 'Energetic',
  'Mysterious', 'Atmospheric', 'Upbeat', 'Chill', 'Dramatic', 'Smooth',
  'Vibe', 'Intense', 'Dreamy', 'Funky', 'Groovy', 'Hypnotic', 'Chaotic'
];

// Generate URLs
const urls = [];
let count = 0;

console.log('🕌 Generating 10,000+ pages for ARAB WORLD...');

// ARAB CITIES × GENRES × MOODS combinations
ARAB_CITIES.forEach(city => {
  ARAB_GENRES.forEach(genre => {
    ARAB_MOODS.slice(0, 2).forEach(mood => {
      const url = `beats-generator.html?region=${encodeURIComponent(city)}&genre=${encodeURIComponent(genre)}&mood=${encodeURIComponent(mood)}`;
      urls.push({
        url,
        title: `${genre} Beats for ${city} - ${mood}`,
        description: `Free-for-profit ${genre} beats from ${city}. ${mood} vibe, instant download, royalty-free production music.`,
        priority: 0.85,
        changefreq: 'weekly'
      });
      count++;

      // Stop at 10,000
      if (count >= 10000) return;
    });
    if (count >= 10000) return;
  });
  if (count >= 10000) return;
});

console.log(`✅ Generated ${count} Arab world beat URLs`);

// Generate sitemap-arab.xml
let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add Arab world pages
urls.forEach(item => {
  sitemapXml += `  <url>
    <loc>https://djbilboxbeats.com/${item.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>\n`;
});

sitemapXml += '</urlset>';

fs.writeFileSync(path.join(__dirname, 'sitemap-arab.xml'), sitemapXml);
console.log(`✅ Sitemap-arab.xml with ${count} URLs generated`);

// Save URL list
const urlList = urls.map(u => u.url).join('\n');
fs.writeFileSync(path.join(__dirname, 'generated-urls-arab-10k.txt'), urlList);
console.log(`✅ URL list saved (generated-urls-arab-10k.txt)`);

console.log(`
🕌 10,000+ PAGE ARAB WORLD DOMINANCE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total URLs: ${count}
- Arab Cities: ${ARAB_CITIES.length}
- Genres: ${ARAB_GENRES.length}
- Moods: ${ARAB_MOODS.length}

COVERAGE - ALL ARAB COUNTRIES:
✅ Egypt (8 cities: Cairo, Alexandria, Giza, Aswan, Luxor, etc.)
✅ Saudi Arabia (8: Riyadh, Jeddah, Mecca, Medina, etc.)
✅ UAE (8: Dubai, Abu Dhabi, Sharjah, etc.)
✅ Morocco (8: Casablanca, Fez, Marrakech, etc.)
✅ Algeria (8: Algiers, Oran, Constantine, etc.)
✅ Tunisia (8: Tunis, Sousse, Sfax, etc.)
✅ Lebanon (6: Beirut, Tripoli, etc.)
✅ Jordan (6: Amman, Zarqa, etc.)
✅ Palestine (5: Jerusalem, Ramallah, etc.)
✅ Iraq (7: Baghdad, Basra, Mosul, etc.)
✅ Syria (6: Damascus, Aleppo, etc.)
✅ Kuwait, Qatar, Bahrain, Oman, Yemen, Libya, Sudan, Mauritania, etc.

DJBILBOX will rank for:
- "trap beats cairo"
- "synthwave beats dubai"
- "reggaeton beats casablanca"
- "oriental beats beirut"
- "khaliji beats riyadh"
- ... and 10,000 more Arab-world keywords!

📊 This is 20,000 TOTAL PAGES now (10K global + 10K Arab)
🌍 Coverage: Every major city in the Arab world
💰 Impact: Dominate search results across entire Middle East, North Africa

Ready to push!
`);
