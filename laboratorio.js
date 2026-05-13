/* ============================================
   DDent — laboratorio.js  v3
   Hero: partículas subindo (estilo paciente)
============================================ */
(function () {
  'use strict';

  /* ── Header scroll ── */
  const header = document.getElementById('header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Burger / Mobile menu ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    })
  );

  /* ── Dropdown nav ── */
  const dropdown = document.getElementById('srvDropdown');
  if (dropdown) {
    const trigger = dropdown.querySelector('.nav-drop-trigger');
    trigger.addEventListener('click', () => {
      const open = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── Counter animation ── */
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const dur    = 2000;
      const fps    = 60;
      const step   = target / (dur / (1000 / fps));
      let   cur    = 0;
      const tick   = () => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur).toLocaleString('pt-BR');
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  /* ── Smooth scroll (header-aware) ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 16 : 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── Testimonials carousel ── */
  const track  = document.getElementById('testTrack');
  const dotsEl = document.getElementById('tDots');
  const prev   = document.getElementById('tPrev');
  const next   = document.getElementById('tNext');

  if (track) {
    const cards   = Array.from(track.querySelectorAll('.tcard'));
    let   current = 0;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'tdot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    });

    function getCardWidth() {
      if (!cards[0]) return 0;
      return cards[0].getBoundingClientRect().width + 20; // gap
    }

    function goTo(idx) {
      current = (idx + cards.length) % cards.length;
      track.style.transform = `translateX(-${current * getCardWidth()}px)`;
      track.style.transition = 'transform .55s cubic-bezier(0.16,1,0.3,1)';
      dotsEl.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    // Auto advance every 5s
    let autoTimer = setInterval(() => goTo(current + 1), 5000);
    [prev, next].forEach(btn => btn.addEventListener('click', () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }));

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', () => goTo(current));
  }

  /* ══════════════════════════════════════════
     HERO — Partículas subindo (como paciente.html)
  ══════════════════════════════════════════ */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, pts;

    function mkPt(forceBottom) {
      return {
        x:   Math.random() * (W || window.innerWidth),
        y:   forceBottom ? (H || window.innerHeight) + Math.random() * 60 : Math.random() * (H || window.innerHeight),
        vy:  -(Math.random() * 0.55 + 0.15),   // sobe
        vx:  (Math.random() - 0.5) * 0.12,      // deriva lateral leve
        r:   Math.random() * 1.6 + 0.35,
        opacity: Math.random() * 0.45 + 0.1,
        maxOp: Math.random() * 0.45 + 0.1,
      };
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      pts = Array.from({ length: 70 }, () => mkPt(false));
    }

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      pts.forEach(p => {
        // move
        p.y += p.vy;
        p.x += p.vx;

        // fade in from bottom, fade out at top
        const progress = 1 - (p.y / H); // 0 at bottom, 1 at top
        const fade = progress < 0.1
          ? progress / 0.1
          : progress > 0.85
            ? 1 - (progress - 0.85) / 0.15
            : 1;
        const alpha = p.maxOp * fade;

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76,139,201,${alpha})`;
        ctx.fill();

        // reset when out of top
        if (p.y < -10) {
          const n = mkPt(true);
          p.x = n.x; p.y = n.y;
          p.vy = n.vy; p.vx = n.vx;
          p.r = n.r; p.maxOp = n.maxOp;
        }
      });

      // subtle connecting lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(76,139,201,${0.07 * (1 - d / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      resize();
      draw();
    });

    resize();
    draw();
  }

  /* ── Service items — active nav highlight ── */
  const srvIds   = ['protese-fixa','protocolo','parcial-total','facetas','metal-free','zirconia'];
  const navLinks = document.querySelectorAll('.nav-link');
  const srvObs   = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav-link--active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { threshold: 0.6 });
  srvIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) srvObs.observe(el);
  });

})();