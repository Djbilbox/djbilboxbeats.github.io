/* ============================================================
   DJBILBOX BEATS — Premium Motion Engine
   Gold starscape · scroll reveals (GSAP w/ IO fallback) ·
   count-up stats · parallax orbs · scroll progress bar.
   ============================================================ */
(function(){
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Scroll progress bar ---------- */
  function progressBar(){
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    document.body.appendChild(bar);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  /* ---------- 2. Gold / platinum starscape ---------- */
  function starscape(){
    if (reduce) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'starscape';
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');
    let w, h, stars, dpr = window.devicePixelRatio || 1;
    const COLORS = ['255,255,255', '212,175,55', '229,228,226'];

    function resize(){
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.floor(w * h / 14000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        base: Math.random() * 0.5 + 0.2,
        dx: (Math.random() - 0.5) * 0.05,
        dy: (Math.random() - 0.5) * 0.04,
        tw: Math.random() * 0.004 + 0.001,
        ph: Math.random() * Math.PI * 2,
        c: COLORS[Math.floor(Math.random() * COLORS.length)]
      }));
    }
    function frame(){
      ctx.clearRect(0, 0, w, h);
      const t = Date.now();
      for (const s of stars){
        s.x += s.dx; s.y += s.dy;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        const o = Math.max(0, s.base + Math.sin(t * s.tw + s.ph) * 0.3);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.c},${o})`;
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    window.addEventListener('resize', resize);
    resize(); frame();
  }

  /* ---------- 3. Hero orbs + grid overlay (injected) ---------- */
  function heroDecor(){
    const hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.orb')) return;
    const frag = document.createDocumentFragment();
    ['orb orb-1', 'orb orb-2', 'orb orb-3', 'grid-overlay'].forEach(cls => {
      const d = document.createElement('div');
      d.className = cls;
      frag.appendChild(d);
    });
    hero.insertBefore(frag, hero.firstChild);
  }

  /* ---------- 4. Count-up on stats ---------- */
  function parseStat(txt){
    const m = String(txt).match(/^([\d.,]+)(.*)$/);
    if (!m) return null;
    const target = parseFloat(m[1].replace(/,/g, ''));
    return isNaN(target) ? null : { target, suffix: m[2] || '' };
  }
  function easeOutExpo(t){ return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function countUp(el, target, suffix){
    const dur = 1800, start = performance.now();
    const isInt = target % 1 === 0;
    el.classList.add('counting');
    (function step(now){
      const p = Math.min((now - start) / dur, 1);
      const val = easeOutExpo(p) * target;
      el.textContent = (isInt ? Math.floor(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else { el.textContent = (isInt ? target : target.toFixed(1)) + suffix; el.classList.remove('counting'); }
    })(start);
  }
  function initCounters(){
    const nums = document.querySelectorAll('.stat .num');
    if (!nums.length) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, parsed = parseStat(el.textContent);
        if (parsed && !reduce) countUp(el, parsed.target, parsed.suffix);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }

  /* ---------- 5. Scroll reveals ---------- */
  function initReveals(){
    // Tag elements to reveal
    const targets = [];
    document.querySelectorAll('.home-card, .card, .promo-block, .newsletter, .section-head, .blog-card')
      .forEach(el => { el.classList.add('reveal'); targets.push(el); });
    document.querySelectorAll('.section-head h2').forEach(h => targets.push(h));

    if (window.gsap && window.ScrollTrigger && !reduce){
      gsap.registerPlugin(ScrollTrigger);
      // Reveal groups with a subtle stagger per section
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      // Underline sweep on H2s
      gsap.utils.toArray('.section-head h2').forEach(h => {
        ScrollTrigger.create({ trigger: h, start: 'top 85%', once: true,
          onEnter: () => h.classList.add('in') });
      });
      // Parallax on hero orbs
      gsap.utils.toArray('.hero .orb').forEach((orb, i) => {
        gsap.to(orb, { yPercent: (i + 1) * 12, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      });
    } else {
      // Fallback: IntersectionObserver
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal, .section-head h2').forEach(el => io.observe(el));
    }
  }

  /* ---------- boot ---------- */
  function boot(){
    document.documentElement.classList.add('js-reveal');
    heroDecor();
    progressBar();
    starscape();
    initCounters();
    initReveals();
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
