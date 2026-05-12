/* ============================================
   DDent — contato.js
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
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    })
  );

  /* ── Dropdown ── */
  const dropdown = document.getElementById('espDropdown');
  if (dropdown) {
    const trigger = dropdown.querySelector('.nav-drop-trigger');
    trigger.addEventListener('click', () => dropdown.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  }

  /* ── Scroll reveal ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-scale').forEach(el => obs.observe(el));

  /* ── Phone mask ── */
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length >= 11) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      else if (v.length >= 7) v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
      else if (v.length >= 3) v = v.replace(/(\d{2})(\d+)/, '($1) $2');
      this.value = v;
    });
  }

  /* ── Form validation + submit ── */
  const form    = document.getElementById('contactForm');
  const btnSub  = document.getElementById('btnSubmit');
  const success = document.getElementById('formSuccess');
  const errBox  = document.getElementById('formError');

  function validate() {
    let ok = true;
    [
      { id: 'nome',     test: v => v.trim().length >= 2 },
      { id: 'email',    test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'mensagem', test: v => v.trim().length >= 10 },
    ].forEach(({ id, test }) => {
      const field = document.getElementById(id);
      const wrap  = field.closest('.form-field');
      const valid = test(field.value);
      wrap.classList.toggle('has-error', !valid);
      field.classList.toggle('error', !valid);
      if (!valid) ok = false;
    });
    return ok;
  }

  /* Clear error on input */
  form.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      el.closest('.form-field')?.classList.remove('has-error');
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    btnSub.classList.add('loading');
    btnSub.disabled = true;
    success.classList.remove('show');
    errBox.classList.remove('show');

    /* Simula envio (substitua pela sua integração real) */
    await new Promise(r => setTimeout(r, 1400));

    try {
      /* Para integração real:
         const res = await fetch('/api/contato', { method:'POST', body: new FormData(form) });
         if (!res.ok) throw new Error();
      */
      success.classList.add('show');
      form.reset();
    } catch {
      errBox.classList.add('show');
    } finally {
      btnSub.classList.remove('loading');
      btnSub.disabled = false;
    }
  });

  /* ── Input focus line animation ── */
  document.querySelectorAll('.form-field input, .form-field textarea, .form-field select').forEach(el => {
    el.addEventListener('focus',  () => el.closest('.form-field').classList.add('focused'));
    el.addEventListener('blur',   () => el.closest('.form-field').classList.remove('focused'));
  });

})();
