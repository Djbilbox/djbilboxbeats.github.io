/* ============================================================
   DJBILBOX BEATS — Modern Animations Engine
   Scroll effects, particles, progress bar, scroll indicators
   ============================================================ */

// ---- Progress Bar ----
function initProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// ---- Ambient Particles Background ----
function createAmbientParticles() {
  const bg = document.createElement('div');
  bg.className = 'particles-bg';
  document.body.insertBefore(bg, document.body.firstChild);

  const particleCount = Math.min(Math.floor(window.innerWidth / 100), 30);

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 5;
    const duration = Math.random() * 8 + 10;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.3;

    bg.appendChild(particle);
  }
}

// ---- Scroll Indicators ----
function initScrollIndicators() {
  const sections = document.querySelectorAll('section');
  if (sections.length === 0) return;

  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'scroll-indicators';

  sections.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    if (index === 0) indicator.classList.add('active');

    indicator.addEventListener('click', () => {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    });

    indicatorsContainer.appendChild(indicator);
  });

  document.body.appendChild(indicatorsContainer);

  // Update active indicator on scroll
  window.addEventListener('scroll', () => {
    let current = 0;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        current = index;
      }
    });

    document.querySelectorAll('.scroll-indicator').forEach((ind, index) => {
      ind.classList.toggle('active', index === current);
    });
  });
}

// ---- Observe Elements for Scroll Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe cards
  document.querySelectorAll('.card').forEach((card) => {
    observer.observe(card);
  });

  // Observe sections
  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });

  // Observe promo blocks
  document.querySelectorAll('.promo-block').forEach((block) => {
    observer.observe(block);
  });
}

// ---- Parallax Effect on Scroll ----
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    parallaxElements.forEach((el) => {
      const speed = el.dataset.parallax || 0.5;
      const yPos = window.scrollY * speed;
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ---- Enhanced Hover Effects on Cards ----
function enhanceCardHovers() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-8px)';
    });
  });
}

// ---- Glow Effect Following Mouse ----
function initMouseGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 215, 74, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    filter: blur(40px);
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = (e.clientX - 150) + 'px';
    glow.style.top = (e.clientY - 150) + 'px';
  });
}

// ---- Smooth Scroll Behavior ----
function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// ---- Add CSS to Hero H1 for Split Text Effect ----
function enhanceHeroText() {
  const heroH1 = document.querySelector('.hero h1');
  if (!heroH1) return;

  const text = heroH1.innerText;
  heroH1.innerHTML = text
    .split('')
    .map((char, i) => `<span style="animation-delay: ${i * 0.02}s">${char}</span>`)
    .join('');
}

// ---- Initialize All Modern Effects ----
document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  createAmbientParticles();
  initScrollIndicators();
  initScrollAnimations();
  initParallax();
  enhanceCardHovers();
  initMouseGlow();
  initSmoothScroll();
  enhanceHeroText();

  // Trigger initial animations
  document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = '1';
  });

  // Re-observe elements after DOM loaded
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }, 100);
});

// ---- Cleanup on Page Unload ----
window.addEventListener('beforeunload', () => {
  const particlesBg = document.querySelector('.particles-bg');
  if (particlesBg) particlesBg.remove();

  const indicators = document.querySelector('.scroll-indicators');
  if (indicators) indicators.remove();

  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) progressBar.remove();
});
