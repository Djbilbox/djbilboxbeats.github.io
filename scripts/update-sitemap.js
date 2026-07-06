/* ============================================================
   Update sitemap.xml with all generated pages
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Collect all generated pages
const staticPages = [
  'index.html', 'beats-redesign.html', 'drum-kits.html', 'vst.html', 'services.html',
  'discography.html', 'license.html', 'reviews.html', 'news.html', 'contact.html',
  'studio-setup.html', 'blog.html', 'locations/index.html', 'game/index.html'
];

const getAllFiles = (dir) => {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  });
  return files;
};

const vstPages = getAllFiles(path.join(ROOT, 'blog', 'vst'));
const kitPages = getAllFiles(path.join(ROOT, 'blog', 'kits'));
const locationPages = getAllFiles(path.join(ROOT, 'locations'));

// Build sitemap
const today = new Date().toISOString().slice(0, 10);
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Static pages
staticPages.forEach(p => {
  sitemap += `  <url>\n    <loc>https://djbilboxbeats.com/${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p === 'index.html' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
});

// Location pages
locationPages.forEach(p => {
  const relPath = p.replace(ROOT, '').replace(/\\/g, '/').substring(1);
  sitemap += `  <url>\n    <loc>https://djbilboxbeats.com/${relPath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
});

// VST pages
vstPages.forEach(p => {
  const relPath = p.replace(ROOT, '').replace(/\\/g, '/').substring(1);
  sitemap += `  <url>\n    <loc>https://djbilboxbeats.com/${relPath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
});

// Kit pages
kitPages.forEach(p => {
  const relPath = p.replace(ROOT, '').replace(/\\/g, '/').substring(1);
  sitemap += `  <url>\n    <loc>https://djbilboxbeats.com/${relPath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
});

sitemap += `</urlset>\n`;

// Write sitemap
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

const totalPages = staticPages.length + locationPages.length + vstPages.length + kitPages.length;
console.log(`✅ Sitemap updated!`);
console.log(`Total URLs: ${totalPages}`);
console.log(`- Static: ${staticPages.length}`);
console.log(`- Locations: ${locationPages.length}`);
console.log(`- VST: ${vstPages.length}`);
console.log(`- Kits: ${kitPages.length}`);
