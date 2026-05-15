/* ════════════════════════════════════════════════
   laboratorio-servicos.js
   ════════════════════════════════════════════════ */

/* ── Modal helpers ── */
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  const btn = overlay.querySelector('.smodal-close');
  if (btn) btn.focus();
}
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}
function closeModalOutside(e, overlay) {
  if (e.target === overlay) {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.smodal-overlay.is-open').forEach(function (el) {
      el.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }
});

/* ── Hero canvas — subtle particle network ── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function makeParticle() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.12, 0.12),
      r: rand(1, 2.2),
      a: rand(0.15, 0.5)
    };
  }

  function init() {
    resize();
    const count = Math.min(60, Math.floor((W * H) / 14000));
    particles = Array.from({ length: count }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(76,139,201,' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // dots
    particles.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(76,139,201,' + p.a + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    raf = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', function () {
    cancelAnimationFrame(raf);
    init();
    draw();
  });
})();

/* ── Scroll Reveal ── */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-scale');
  if (!els.length) return;

  const style = document.createElement('style');
  style.textContent = [
    '.reveal { opacity: 0; transform: translateY(32px); transition: opacity .7s ease, transform .7s ease; }',
    '.reveal.visible { opacity: 1; transform: none; }',
    '.reveal-scale { opacity: 0; transform: scale(.97); transition: opacity .7s ease, transform .7s ease; }',
    '.reveal-scale.visible { opacity: 1; transform: none; }'
  ].join('');
  document.head.appendChild(style);

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ── Quick-nav active state on scroll ── */
(function () {
  const sections = [
    'protese-fixa', 'protocolo', 'parcial-total',
    'placas', 'metal-free', 'facetas', 'zirconia'
  ];
  const links = document.querySelectorAll('.srv-qlink');
  const OFFSET = 160;

  function getActive() {
    var active = sections[0];
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top <= OFFSET) active = id;
    });
    return active;
  }

  function updateNav() {
    var id = getActive();
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + id);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.indexOf('#') !== 0) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - OFFSET + 10;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
