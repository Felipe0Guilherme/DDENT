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
/* ── Fix tech icon fallbacks ── */
document.querySelectorAll('.qs-tech-icon-wrap img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const svg = this.nextElementSibling;
    if (svg) svg.style.display = 'block';
  });
});

/* ── Reveal Observer (supplement to laboratorio.js) ── */
const qsRevealEls = document.querySelectorAll('.reveal, .reveal-scale');
const qsRevObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); qsRevObs.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
qsRevealEls.forEach(el => qsRevObs.observe(el));

/* ── Tech Accordion ── */
(function () {
  const techData = [
    {
      name: 'Scanner de Bancada',
      tags: ['Alta precisão', 'Integração CAD', 'Arquivo digital'],
      icon: `<svg viewBox="0 0 24 24" fill="none" width="40" stroke="currentColor" stroke-width="1.2"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 8h10M7 12h6M3 18h18" stroke-linecap="round"/></svg>`
    },
    {
      name: 'Software CAD/CAM',
      tags: ['Fluxo completo', 'Multi-peças', 'Scan intraoral'],
      icon: `<svg viewBox="0 0 24 24" fill="none" width="40" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 6M15 9l-6 6" stroke-linecap="round"/></svg>`
    },
    {
      name: 'Impressoras 3D',
      tags: ['Personalização', 'Alta velocidade', 'Fidelidade'],
      icon: `<svg viewBox="0 0 24 24" fill="none" width="40" stroke="currentColor" stroke-width="1.2"><path d="M6 9V4h12v5M6 18H4a2 2 0 01-2-2v-5h20v5a2 2 0 01-2 2h-2M9 21h6v-6H9v6z" stroke-linecap="round"/></svg>`
    },
    {
      name: 'Fresadora 5 Eixos',
      tags: ['Zircônia', 'Dissilicato', '5 eixos', '8 blocos'],
      icon: `<svg viewBox="0 0 24 24" fill="none" width="40" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke-linecap="round"/></svg>`
    }
  ];

  const showcaseIcon = document.getElementById('techShowcaseIcon');
  const showcaseName = document.getElementById('techShowcaseName');
  const showcaseTags = document.getElementById('techShowcaseTags');

  function updateShowcase(index) {
    if (!showcaseIcon) return;
    const d = techData[index];
    // Animate icon swap
    showcaseIcon.classList.add('animating');
    setTimeout(() => {
      showcaseIcon.innerHTML = d.icon;
      showcaseName.textContent = d.name;
      showcaseTags.innerHTML = d.tags.map(t => `<span class="qs-tech-tag">${t}</span>`).join('');
      showcaseIcon.classList.remove('animating');
    }, 200);
  }

  document.querySelectorAll('.qs-acc-item').forEach((item) => {
    const header = item.querySelector('.qs-acc-header');
    if (!header) return;

    const toggle = () => {
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.qs-acc-item').forEach(i => {
        i.classList.remove('active');
        const h = i.querySelector('.qs-acc-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        const idx = parseInt(item.dataset.index, 10);
        updateShowcase(idx);
      }
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();