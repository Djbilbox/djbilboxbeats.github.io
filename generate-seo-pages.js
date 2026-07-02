#!/usr/bin/env node

/**
 * Generate 500+ SEO pages for DJBILBOX BEATS
 * Creates URLs for: regions × genres × moods × use-cases
 * Generates sitemap.xml for Google indexing
 */

const fs = require('fs');
const path = require('path');

const REGIONS = [
  'Paris', 'Tokyo', 'Dubai', 'New York', 'Moscow', 'London', 'Berlin',
  'Mumbai', 'São Paulo', 'Bangkok', 'Seoul', 'Mexico City', 'Istanbul', 'Cairo', 'Singapore',
  'Los Angeles', 'Toronto', 'Amsterdam', 'Madrid', 'Rome', 'Athens', 'Stockholm',
  'Copenhagen', 'Vienna', 'Prague', 'Warsaw', 'Budapest', 'Lisbon', 'Barcelona',
  'Milan', 'Hong Kong', 'Shanghai', 'Singapore', 'Bangkok', 'Jakarta', 'Manila',
  'Kuala Lumpur', 'Sydney', 'Melbourne', 'Auckland', 'Vancouver', 'Mexico City'
];

const GENRES = [
  'Trap', 'Hip-Hop', 'Drill', 'Afrobeat', 'Synthwave', 'Lo-Fi',
  'G-Funk', 'House', 'Techno', 'Ambient', 'Cinematic', 'Oriental', 'Reggae',
  'R&B', 'Funk', 'Soul', 'Jazz', 'K-Pop', 'Boom-Bap', 'Future Bass',
  'Grime', 'Dubstep', 'Deep House', 'Tech House', 'Minimal', 'UK Garage'
];

const MOODS = [
  'Aggressive', 'Relaxed', 'Epic', 'Dark', 'Happy', 'Sad', 'Energetic',
  'Mysterious', 'Atmospheric', 'Upbeat', 'Chill', 'Dramatic', 'Smooth', 'Vibe'
];

const USE_CASES = [
  'YouTube', 'TikTok', 'Twitch', 'Gaming', 'Podcast', 'Film', 'Commercial',
  'Instagram', 'Anime', 'Documentary', 'Streaming', 'Royalty Free', 'Production'
];

// Generate URLs
const urls = [];
let count = 0;

REGIONS.forEach(region => {
  GENRES.forEach(genre => {
    // For each region+genre combo, add 3-4 moods
    MOODS.slice(0, 3).forEach(mood => {
      const url = `beats-generator.html?region=${encodeURIComponent(region)}&genre=${encodeURIComponent(genre)}&mood=${encodeURIComponent(mood)}`;
      urls.push({
        url,
        title: `${genre} Beats for ${region} - ${mood}`,
        description: `Browse free-for-profit ${genre} beats from ${region}. ${mood} vibe, instant download, royalty-free.`,
        lastmod: new Date().toISOString().split('T')[0],
        priority: 0.8,
        changefreq: 'weekly'
      });
      count++;
    });
  });
});

// Add use-case landing pages
USE_CASES.forEach(useCase => {
  GENRES.slice(0, 5).forEach(genre => {
    const url = `beats-generator.html?genre=${encodeURIComponent(genre)}&use=${encodeURIComponent(useCase)}`;
    urls.push({
      url,
      title: `${genre} Beats for ${useCase}`,
      description: `${genre} beats optimized for ${useCase}. Free-for-profit, instant download, royalty-free production music.`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.7,
      changefreq: 'weekly'
    });
    count++;
  });
});

// Generate sitemap.xml
let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add main pages
const mainPages = [
  { url: 'index.html', priority: 1.0, changefreq: 'daily' },
  { url: 'vst.html', priority: 0.9, changefreq: 'weekly' },
  { url: 'drum-kits.html', priority: 0.9, changefreq: 'weekly' },
  { url: 'contact.html', priority: 0.8, changefreq: 'monthly' },
  { url: 'license.html', priority: 0.7, changefreq: 'monthly' },
  { url: 'discography.html', priority: 0.8, changefreq: 'weekly' },
  { url: 'reviews.html', priority: 0.7, changefreq: 'monthly' },
  { url: 'news.html', priority: 0.7, changefreq: 'weekly' }
];

mainPages.forEach(page => {
  sitemapXml += `  <url>
    <loc>https://djbilboxbeats.com/${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
});

// Add generated beat pages
urls.forEach(item => {
  sitemapXml += `  <url>
    <loc>https://djbilboxbeats.com/${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>\n`;
});

sitemapXml += '</urlset>';

// Write sitemap
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml);
console.log(`✅ Generated sitemap.xml with ${count + mainPages.length} URLs`);

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Allow: /beats-generator.html
Allow: /vst.html
Allow: /drum-kits.html
Allow: /product.html
Allow: /assets/
Allow: /img/
Disallow: /admin/
Disallow: /.git/
Disallow: /.claude/
Disallow: /worker/

Sitemap: https://djbilboxbeats.com/sitemap.xml
Crawl-delay: 1
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt);
console.log(`✅ Generated robots.txt`);

// Generate URL list for reference
const urlList = urls.map(u => u.url).join('\n');
fs.writeFileSync(path.join(__dirname, 'generated-urls.txt'), urlList);
console.log(`✅ Generated ${count} beat page URLs (saved to generated-urls.txt)`);

console.log(`
🚀 SEO GENERATION COMPLETE
- Total URLs: ${count + mainPages.length}
- Beat combinations: ${count}
- Regions: ${REGIONS.length}
- Genres: ${GENRES.length}
- Moods: ${MOODS.length}
- Use cases: ${USE_CASES.length}

📊 Next: Push to GitHub, Google will crawl these automatically!
`);
