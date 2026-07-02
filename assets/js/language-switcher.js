/* ============================================================
   Language Switcher - Detects user language, loads translations
   Supports: EN, FR, AR, JA, RU
   ============================================================ */

(function() {
  const langs = ['en', 'fr', 'ar', 'ja', 'ru'];
  const langNames = { en: '🇬🇧 English', fr: '🇫🇷 Français', ar: '🇸🇦 العربية', ja: '🇯🇵 日本語', ru: '🇷🇺 Русский' };

  // Detect user language
  function detectLanguage() {
    const stored = localStorage.getItem('djbilbox_lang');
    if (stored && langs.includes(stored)) return stored;

    const nav = navigator.language.split('-')[0];
    if (langs.includes(nav)) return nav;

    return 'en';
  }

  // Create language switcher UI
  function createLangSwitcher() {
    if (document.getElementById('lang-switcher')) return;

    const switcher = document.createElement('div');
    switcher.id = 'lang-switcher';
    switcher.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2000;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px;
      display: flex;
      gap: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    langs.forEach(lang => {
      const btn = document.createElement('button');
      btn.textContent = langNames[lang].split(' ')[0]; // Just emoji
      btn.title = langNames[lang];
      btn.style.cssText = `
        background: transparent;
        border: 1px solid transparent;
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: .15s;
      `;

      const current = localStorage.getItem('djbilbox_lang') || detectLanguage();
      if (lang === current) {
        btn.style.background = 'var(--accent)';
        btn.style.borderColor = 'var(--accent)';
      }

      btn.onmouseover = () => {
        if (lang !== current) btn.style.opacity = '0.7';
      };
      btn.onmouseout = () => {
        if (lang !== current) btn.style.opacity = '1';
      };

      btn.onclick = () => {
        localStorage.setItem('djbilbox_lang', lang);
        location.reload();
      };

      switcher.appendChild(btn);
    });

    document.body.appendChild(switcher);
  }

  // On DOM ready
  document.addEventListener('DOMContentLoaded', createLangSwitcher);

  // Export
  window.getCurrentLang = detectLanguage;
})();
