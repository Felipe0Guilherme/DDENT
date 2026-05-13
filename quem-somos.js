(function () {
  'use strict';

  /* ── Header scroll state ─────────────────── */
  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Burger / Mobile menu ─────────────────── */
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

  /* ── Dropdown nav ─────────────────────────── */
  const dropdown = document.getElementById('espDropdown');
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

  /* ── Scroll reveal ─────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── Counter animation ─────────────────────── */
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
  }, { threshold: 0.6 });
  counters.forEach(el => counterObs.observe(el));

  /* ── Doctor cards — subtle image parallax on hover ── */
  document.querySelectorAll('.doctor-card__img-wrap').forEach(wrap => {
    const img = wrap.querySelector('img');
    if (!img) return;
    wrap.addEventListener('mousemove', e => {
      const r  = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left)  / r.width  - 0.5;
      const ny = (e.clientY - r.top)   / r.height - 0.5;
      img.style.transform = `scale(1.06) translate(${nx * 10}px, ${ny * 8}px)`;
    });
    wrap.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });

  /* ── Gallery — lightbox placeholder ─────────── */
  document.querySelectorAll('.gal-item').forEach(item => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') item.click();
    });
    // Future: hook into a real lightbox library here
  });

  /* ── Smooth-scroll for hash anchors ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 16 : 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── Active nav highlight on scroll ─────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle(
            'nav-link--active',
            href === `#${id}` || href === `quem-somos.html` && id === 'clinica'
          );
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => activeObs.observe(s));

  /* ── Pillar hover ripple ─────────────────────── */
  document.querySelectorAll('.pillar').forEach(pillar => {
    pillar.addEventListener('mouseenter', () => {
      pillar.style.background = 'var(--teal-l)';
      pillar.style.borderRadius = '10px';
      pillar.style.padding = '16px 12px';
      pillar.style.transition = 'all .25s var(--ease)';
    });
    pillar.addEventListener('mouseleave', () => {
      pillar.style.background = '';
      pillar.style.borderRadius = '';
      pillar.style.padding = '';
    });
  });

})();