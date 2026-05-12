/* ============================================
   DDent — especialidades.js
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

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items in the same section
      const section = item.closest('.esp-section');
      section.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── Sticky nav tab highlight on scroll ── */
  const sections  = document.querySelectorAll('.esp-section[id]');
  const navTabs   = document.querySelectorAll('.esp-nav-tab[data-target]');
  const headerH   = () => (header ? header.offsetHeight : 64);

  const tabObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navTabs.forEach(tab => {
          tab.classList.toggle('active', tab.dataset.target === id);
        });
      }
    });
  }, {
    threshold: 0,
    rootMargin: `-${headerH() + 60}px 0px -55% 0px`
  });
  sections.forEach(s => tabObs.observe(s));

  /* ── Smooth scroll for all hash links (header offset aware) ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        // Extra offset for sticky esp-nav bar (~52px)
        const offset = headerH() + 56;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── Section icon hover effect ── */
  document.querySelectorAll('.esp-sec-icon-wrap').forEach(wrap => {
    wrap.addEventListener('mouseenter', () => {
      wrap.style.background = 'var(--teal)';
      wrap.style.color = 'white';
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.style.background = '';
      wrap.style.color = '';
    });
  });

})();
