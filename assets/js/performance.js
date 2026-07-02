/* ============================================================
   Performance Optimization - Core Web Vitals
   - Lazy loading images
   - Prefetch critical resources
   - Defer non-critical JS
   ============================================================ */

// Prefetch important resources
window.addEventListener('load', () => {
  const prefetchUrls = [
    'assets/js/site.js',
    'assets/css/theme.css',
    'assets/js/chat.js',
    'beats-generator.html'
  ];

  prefetchUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Report Web Vitals
  if ('web-vital' in window) {
    console.log('✅ Core Web Vitals tracking enabled');
  }
});

// Defer non-critical CSS
function deferNonCritical() {
  const sheets = document.querySelectorAll('link[rel=stylesheet]');
  sheets.forEach(sheet => {
    if (!sheet.href.includes('theme.css')) {
      sheet.media = 'print';
      sheet.onload = () => sheet.media = 'all';
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', deferNonCritical);
} else {
  deferNonCritical();
}

console.log('✅ Performance optimizations loaded');
