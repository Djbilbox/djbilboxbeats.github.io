/* ============================================================
   Language Switcher — real whole-page translation via Google Translate
   Flags trigger an actual translation (EN/FR/AR/JA/RU). The ugly
   Google banner is hidden; the choice persists via the googtrans cookie.
   ============================================================ */
(function () {
  const langs = ['en', 'fr', 'es', 'pt', 'ar', 'ja', 'ru'];
  const flags = { en: '🇬🇧', fr: '🇫🇷', es: '🇪🇸', pt: '🇵🇹', ar: '🇸🇦', ja: '🇯🇵', ru: '🇷🇺' };
  const names = { en: 'English', fr: 'Français', es: 'Español', pt: 'Português', ar: 'العربية', ja: '日本語', ru: 'Русский' };

  function currentLang() {
    const m = document.cookie.match(/googtrans=\/[^/]+\/([a-z]{2})/);
    if (m && langs.includes(m[1])) return m[1];
    const stored = localStorage.getItem('djbilbox_lang');
    if (stored && langs.includes(stored)) return stored;
    return 'en';
  }

  function setLang(code) {
    localStorage.setItem('djbilbox_lang', code);
    // googtrans cookie drives the Google Translate widget on load & live
    const host = location.hostname;
    const val = '/en/' + code;
    document.cookie = 'googtrans=' + val + ';path=/';
    document.cookie = 'googtrans=' + val + ';path=/;domain=.' + host;
    if (code === 'en') {
      // clear translation → back to source
      document.cookie = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'googtrans=;path=/;domain=.' + host + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
      location.reload();
      return;
    }
    // trigger the hidden Google combo live if present, else reload
    const combo = document.querySelector('.goog-te-combo');
    if (combo) { combo.value = code; combo.dispatchEvent(new Event('change')); markActive(code); }
    else location.reload();
  }

  function markActive(code) {
    document.querySelectorAll('#lang-switcher button').forEach(b => {
      const on = b.dataset.lang === code;
      b.style.background = on ? 'var(--accent)' : 'transparent';
      b.style.borderColor = on ? 'var(--accent)' : 'transparent';
      b.style.color = on ? '#0b0710' : 'var(--text-2)';
    });
  }

  function buildUI() {
    if (document.getElementById('lang-switcher')) return;
    const cur = currentLang();
    const box = document.createElement('div');
    box.id = 'lang-switcher';
    box.className = 'notranslate';
    box.setAttribute('translate', 'no');
    box.style.cssText = 'position:fixed;top:16px;right:16px;z-index:2000;background:var(--surface-2);' +
      'border:1px solid var(--accent);border-radius:10px;padding:6px;display:flex;gap:3px;' +
      'box-shadow:0 6px 20px rgba(0,0,0,.35)';
    langs.forEach(code => {
      const b = document.createElement('button');
      b.dataset.lang = code;
      b.textContent = flags[code];
      b.title = names[code];
      b.style.cssText = 'background:transparent;border:1px solid transparent;padding:5px 9px;' +
        'border-radius:6px;cursor:pointer;font-size:.92rem;font-weight:700;color:var(--text-2);transition:.15s';
      b.onclick = () => setLang(code);
      box.appendChild(b);
    });
    document.body.appendChild(box);
    markActive(cur);
  }

  // Hide the Google Translate banner / tooltip chrome
  function injectHideCSS() {
    if (document.getElementById('gt-hide-css')) return;
    const st = document.createElement('style');
    st.id = 'gt-hide-css';
    st.textContent =
      '.goog-te-banner-frame,.goog-te-gadget-icon,#goog-gt-tt,.goog-te-balloon-frame{display:none!important}' +
      '.goog-te-gadget{height:0;overflow:hidden;font-size:0}' +
      'body{top:0!important}' +
      '#google_translate_element{width:0;height:0;overflow:hidden}' +
      '.skiptranslate{line-height:0}';
    document.head.appendChild(st);
  }

  // Load Google Translate (once), targeting the sidebar's #google_translate_element
  function loadGoogle() {
    if (window.__gtLoaded) return;
    window.__gtLoaded = true;
    window.googleTranslateElementInit = function () {
      if (!document.getElementById('google_translate_element')) {
        const d = document.createElement('div');
        d.id = 'google_translate_element';
        d.className = 'notranslate';
        d.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(d);
      }
      /* eslint-disable no-undef */
      new google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: langs.join(','), autoDisplay: false },
        'google_translate_element'
      );
      // re-assert active state once combo exists
      setTimeout(() => markActive(currentLang()), 400);
    };
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);
  }

  function boot() { injectHideCSS(); buildUI(); loadGoogle(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.getCurrentLang = currentLang;
})();
