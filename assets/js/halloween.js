/* ============================================================
   HALLOWEEN 2026 — « ZOMBIE NIGHT »
   Chargé par site.js sur toutes les pages jusqu'au 1er novembre 2026
   (heure de Paris). Ajoute la classe .halloween sur <html>, la feuille
   halloween.css, le décor (brouillard, éclairs, mains de zombies,
   chauves-souris, sang qui coule) et le bandeau BLOOD KEYS avec le
   compte à rebours. Rien n'est cliquable dans le décor (pointer-events
   none) et tout s'arrête si l'utilisateur préfère moins d'animations.
   ============================================================ */
(function () {
  var END = Date.parse('2026-11-01T23:59:00+01:00');
  if (Date.now() > END) return;
  // racine du site déduite de l'adresse de ce script (pages en sous-dossiers : blog/, fr/...)
  var BASE = ((document.currentScript && document.currentScript.src) || '').replace(/assets\/js\/halloween\.js.*$/, '');
  var root = document.documentElement;
  root.classList.add('halloween');

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = BASE + 'assets/css/halloween.css?v=26101302';
  document.head.appendChild(css);

  var BUY = 'https://djbilboxbeats.gumroad.com/l/bloodkeys';
  var promoOn = window.Promo && Promo.active && Promo.active();
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }

  var HAND = '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hwSkin" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#6d7f55"/><stop offset=".6" stop-color="#3d4a2e"/><stop offset="1" stop-color="#151a10"/></linearGradient></defs>' +
    '<path fill="url(#hwSkin)" stroke="#0b0e08" stroke-width="3" d="M70 260 C66 210 58 190 44 172 C30 154 18 138 24 126 C30 116 44 124 52 138 L60 150 ' +
    'C56 118 48 86 46 62 C44 46 58 42 64 56 C70 72 74 100 78 122 C78 92 76 52 78 30 C80 12 96 12 98 30 C100 52 98 92 98 120 ' +
    'C102 96 106 58 110 38 C114 22 130 24 128 42 C126 64 120 98 118 124 C124 104 132 80 138 66 C144 52 158 58 154 74 C148 98 138 130 132 158 ' +
    'C128 184 126 214 130 260 Z"/>' +
    '<path d="M86 200 l10 -6 M104 214 l8 6 M76 228 l12 2" stroke="#7a0b0b" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M60 150 q14 -6 22 4 M98 120 q6 10 0 18" stroke="#1d2416" stroke-width="3" fill="none"/></svg>';
  var BAT = '<svg viewBox="0 0 64 28" xmlns="http://www.w3.org/2000/svg"><path fill="#050505" d="M32 10c2-4 4-6 4-6s0 4 2 6c6-6 16-6 26 0-6 0-10 4-12 10-2-4-8-6-12-2-2 2-4 6-8 6s-6-4-8-6c-4-4-10-2-12 2C10 14 6 10 0 10c10-6 20-6 26 0 2-2 2-6 2-6s2 2 4 6z"/>' +
    '<circle cx="29" cy="11" r="1.2" fill="#ff2a2a"/><circle cx="35" cy="11" r="1.2" fill="#ff2a2a"/></svg>';

  function decor() {
    document.body.appendChild(el('<div class="hw-layer hw-fog" aria-hidden="true"></div>'));
    document.body.appendChild(el('<div class="hw-layer hw-fog b" aria-hidden="true"></div>'));
    document.body.appendChild(el('<div class="hw-layer hw-vignette" aria-hidden="true"></div>'));
    var flash = el('<div class="hw-layer hw-flash" aria-hidden="true"></div>');
    document.body.appendChild(flash);
    document.body.appendChild(el('<div class="hw-hands l" aria-hidden="true">' + HAND + '</div>'));
    document.body.appendChild(el('<div class="hw-hands r" aria-hidden="true">' + HAND + '</div>'));

    // sang qui coule sous la barre du haut
    var drips = '<svg class="hw-drips" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true"><path fill="#9b000d" d="M0 0H1200V4';
    for (var x = 1200; x > 0; x -= 40) {
      var h = 4 + ((x * 37) % 19);
      drips += 'L' + x + ' 4L' + (x - 6) + ' ' + h + 'Q' + (x - 10) + ' ' + (h + 6) + ' ' + (x - 14) + ' ' + h + 'L' + (x - 20) + ' 4';
    }
    drips += 'L0 4Z"/></svg>';
    document.body.appendChild(el(drips));

    if (reduce) return;
    for (var i = 0; i < 4; i++) {
      var b = el('<div class="hw-bat" aria-hidden="true">' + BAT + '</div>');
      b.style.top = (8 + i * 17) + 'vh';
      b.style.animationDuration = (16 + i * 5) + 's';
      b.style.animationDelay = (-i * 6) + 's';
      b.style.width = (24 + (i % 2) * 14) + 'px';
      document.body.appendChild(b);
    }
    // éclairs : deux flashs rapprochés toutes les 9 à 20 s
    (function storm() {
      setTimeout(function () {
        flash.classList.add('on');
        setTimeout(function () { flash.classList.remove('on'); }, 90);
        setTimeout(function () { flash.classList.add('on'); }, 190);
        setTimeout(function () { flash.classList.remove('on'); storm(); }, 260);
      }, 9000 + Math.random() * 11000);
    })();
  }

  function hero() {
    if (document.querySelector('.hw-hero')) return;
    var page = document.body.dataset.page;
    if (page !== 'shop' && page !== '' && page !== 'home' && page !== 'vst') return;
    var link = BUY + (promoOn ? '/HUMPIRE30' : '');
    var price = promoOn
      ? '<s>$14</s><b>$9.80</b><em>−30% · HUMPIRE30</em>'
      : '<b>$14</b>';
    var h = el(
      '<section class="hw-hero" aria-label="BLOOD KEYS — Halloween">' +
      '<div class="hw-hero-in">' +
      '<div class="hw-hero-txt">' +
      '<div class="hw-kicker">🧟 ZOMBIE NIGHT · NEW RELEASE</div>' +
      '<h2 class="hw-title">BLOOD KEYS</h2>' +
      '<p class="hw-sub">The horror piano VST3. Real recorded pianos, ghost choir, music box, funeral bells and cursed textures. 822 presets. The whole interface lights up as you play. Windows &amp; Mac.</p>' +
      '<div class="hw-price">' + price + '</div>' +
      '<a class="hw-cta" href="' + link + '" target="_blank" rel="noopener">🩸 Get BLOOD KEYS</a>' +
      '<div class="hw-countdown" id="hwCountdown" aria-label="Countdown to Halloween"></div>' +
      '</div>' +
      '<a class="hw-hero-media" href="' + link + '" target="_blank" rel="noopener"><img src="' + BASE + 'img/bloodkeys-cover.jpg" alt="BLOOD KEYS horror piano VST3 interface" loading="eager"></a>' +
      '</div></section>');
    var anchor = document.querySelector('.subnav') || document.querySelector('main') || document.body.firstChild;
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(h, anchor);
    var target = Date.parse('2026-10-31T23:59:00+01:00');
    var cd = document.getElementById('hwCountdown');
    function tick() {
      var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      var d = Math.floor(s / 86400), hh = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
      cd.innerHTML = '<span><b>' + d + '</b>DAYS</span><span><b>' + hh + '</b>HRS</span><span><b>' + m + '</b>MIN</span><span><b>' + ss + '</b>SEC</span>' +
        '<span style="border:0;background:none;align-self:center">UNTIL HALLOWEEN</span>';
    }
    tick();
    setInterval(tick, 1000);
  }

  function start() { decor(); hero(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
