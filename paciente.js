(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. HEADER — scroll effect
  ───────────────────────────────────────── */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ─────────────────────────────────────────
     2. BURGER / MOBILE MENU
  ───────────────────────────────────────── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  /* ─────────────────────────────────────────
     2b. DROPDOWN ESPECIALIDADES
  ───────────────────────────────────────── */
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-drop-trigger');
    const menu    = dd.querySelector('.nav-drop-menu');

    // Abrir/fechar ao clicar no trigger
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dd.classList.contains('open');
      // Fecha todos
      dropdowns.forEach(d => d.classList.remove('open'));
      dropdowns.forEach(d => d.querySelector('.nav-drop-trigger').setAttribute('aria-expanded','false'));
      if (!isOpen) {
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Hover (desktop) — abre ao passar o mouse
    dd.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    dd.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        dd.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', () => {
    dropdowns.forEach(d => {
      d.classList.remove('open');
      d.querySelector('.nav-drop-trigger').setAttribute('aria-expanded','false');
    });
  });

  // ESC fecha dropdown
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => {
        d.classList.remove('open');
        d.querySelector('.nav-drop-trigger').setAttribute('aria-expanded','false');
      });
    }
  });


  /* ─────────────────────────────────────────
     3. SMOOTH SCROLL para âncoras internas
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────
     4. REVEAL ON SCROLL (genérico)
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .dif-card');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────
     5. ESPECIALIDADES — stagger reveal
  ───────────────────────────────────────── */
  const espItems = document.querySelectorAll('.esp-item');
  const espObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx   = parseInt(entry.target.dataset.i || 0);
        const delay = idx * 60;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('visible');
        espObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  espItems.forEach(c => espObserver.observe(c));


  /* ─────────────────────────────────────────
     6. HERO STATS — contador animado
  ───────────────────────────────────────── */
  function formatNum(n) {
    // Formata com ponto como separador de milhar (ex: 1347 → 1.347)
    return n.toLocaleString('pt-BR');
  }

  function animateCount(el, target, duration) {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 4);
      el.textContent = formatNum(Math.floor(ease * target));
      if (prog < 1) requestAnimationFrame(step);
      else el.textContent = formatNum(target);
    };
    requestAnimationFrame(step);
  }

  const statsSection = document.querySelector('.hero-stats');
  let countDone = false;

  if (statsSection) {
    const statsObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countDone) {
        countDone = true;
        document.querySelectorAll('.hstat-n').forEach(el => {
          animateCount(el, parseInt(el.dataset.target), 2200);
        });
      }
    }, { threshold: 0.5 });
    statsObs.observe(statsSection);
  }


  /* ─────────────────────────────────────────
     7. HERO — fade da foto ao rolar + parallax leve
  ───────────────────────────────────────── */
  const heroBgImg = document.getElementById('heroBgImg');
  const heroSection = document.querySelector('.hero');

  if (heroBgImg && heroSection) {
    window.addEventListener('scroll', () => {
      const heroH  = heroSection.offsetHeight;
      const scrollY = window.scrollY;
      // Fade: opacidade vai de 0.18 → 0 nos primeiros 60% do hero
      const fade = Math.max(0, 0.18 - (scrollY / heroH) * 0.38);
      heroBgImg.style.opacity = fade;
      // Parallax leve: sobe um pouco ao rolar
      heroBgImg.style.transform = `translateY(${scrollY * 0.18}px) scale(1.05)`;
    }, { passive: true });
  }


  /* ─────────────────────────────────────────
     8. PARTÍCULAS — canvas, somente no hero
  ───────────────────────────────────────── */
  (function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Redimensionar canvas ao tamanho do hero
    function resize() {
      const hero = canvas.closest('.hero');
      canvas.width  = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Configuração das partículas
    const COUNT  = 55;
    const particles = [];

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function createParticle() {
      return {
        x:    rand(0, canvas.width),
        y:    rand(canvas.height * 0.2, canvas.height), // nascem na parte baixa/média
        r:    rand(0.8, 2.5),          // raio muito pequeno
        vy:   rand(0.2, 0.7),          // velocidade de subida (devagar)
        vx:   rand(-0.15, 0.15),       // leve deriva horizontal
        alpha: rand(0.15, 0.55),       // opacidade variada
        life:  1,                      // ciclo de vida
        maxLife: rand(0.4, 1),
      };
    }

    // Inicializa em posições aleatórias para não aparecerem todos de baixo
    for (let i = 0; i < COUNT; i++) {
      const p = createParticle();
      p.y = rand(0, canvas.height); // espalhadas verticalmente no início
      particles.push(p);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Move
        p.y  -= p.vy;
        p.x  += p.vx;

        // Opacidade: aparece e desaparece suavemente
        const lifeRatio = 1 - (p.y / canvas.height); // mais opaca no meio, some no topo
        const alpha = p.alpha * Math.min(1, lifeRatio * 3) * Math.min(1, (canvas.height - p.y) / (canvas.height * 0.1));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 187, ${Math.max(0, alpha)})`;
        ctx.fill();

        // Regenera quando sai pelo topo ou laterais
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle();
          particles[i].y = canvas.height + rand(0, 20);
        }
      });

      requestAnimationFrame(draw);
    }
    draw();
  })();


  /* ─────────────────────────────────────────
     8. DEPOIMENTOS — slider com drag/swipe
  ───────────────────────────────────────── */
  const track   = document.getElementById('depTrack');
  const dotsWrap = document.getElementById('depDots');
  const prevBtn  = document.getElementById('depPrev');
  const nextBtn  = document.getElementById('depNext');

  if (track && dotsWrap) {
    const cards      = track.querySelectorAll('.dep-card');
    const total      = cards.length;
    let   current    = 0;
    let   isAnimating = false;

    // Calcula quantos cards cabem por vez
    function visibleCount() {
      return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4;
    }

    // Cria dots
    function buildDots() {
      dotsWrap.innerHTML = '';
      const pages = Math.ceil(total / visibleCount());
      for (let i = 0; i < pages; i++) {
        const d = document.createElement('button');
        d.className = 'dep-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Página ${i + 1}`);
        d.addEventListener('click', () => goTo(i * visibleCount()));
        dotsWrap.appendChild(d);
      }
    }

    function updateDots() {
      const pages = Math.ceil(total / visibleCount());
      const page  = Math.floor(current / visibleCount());
      dotsWrap.querySelectorAll('.dep-dot').forEach((d, i) => {
        d.classList.toggle('active', i === page);
      });
    }

    function goTo(index) {
      if (isAnimating) return;
      isAnimating = true;
      const vc   = visibleCount();
      const max  = Math.max(0, total - vc);
      current    = Math.max(0, Math.min(index, max));

      const cardW = cards[0].getBoundingClientRect().width + 20; // gap 20px
      track.style.transform = `translateX(-${current * cardW}px)`;
      updateDots();
      setTimeout(() => isAnimating = false, 650);
    }

    prevBtn.addEventListener('click', () => goTo(current - visibleCount()));
    nextBtn.addEventListener('click', () => goTo(current + visibleCount()));

    // Swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const dx = startX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 50) goTo(dx > 0 ? current + 1 : current - 1);
    });

    // Drag support (mouse)
    let dragging = false, dragStartX = 0, dragStartScroll = 0;
    track.addEventListener('mousedown', e => { dragging = true; dragStartX = e.clientX; });
    track.addEventListener('mousemove', e => { if (!dragging) return; e.preventDefault(); });
    track.addEventListener('mouseup',   e => {
      if (!dragging) return;
      dragging = false;
      const dx = dragStartX - e.clientX;
      if (Math.abs(dx) > 50) goTo(dx > 0 ? current + visibleCount() : current - visibleCount());
    });
    track.addEventListener('mouseleave', () => { dragging = false; });

    buildDots();
    window.addEventListener('resize', () => { buildDots(); goTo(0); });
  }


  /* ─────────────────────────────────────────
     9. ESP CARDS — hover tilt sutil
  ───────────────────────────────────────── */
  document.querySelectorAll('.esp-card:not(.esp-card-feature)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
      const ry = ((e.clientX - rect.left) / rect.width  - 0.5) *  6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ─────────────────────────────────────────
     10. ACTIVE NAV — highlight ao scroll
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));


  /* ─────────────────────────────────────────
     11. NÚMEROS DA SEÇÃO SOBRE (se houver)
  ───────────────────────────────────────── */
  // Já coberto pelo item 6 (hero stats), mas pode expandir aqui


  /* ─────────────────────────────────────────
     12. MICRO-FEEDBACK no botão CTA
  ───────────────────────────────────────── */
  document.querySelectorAll('.btn-main, .cta-nav').forEach(btn => {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.96)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });


  /* ─────────────────────────────────────────
     13. HEADER NAV ACTIVE STYLE
  ───────────────────────────────────────── */
  const styleEl = document.createElement('style');
  styleEl.textContent = `.nav a.active { color: var(--teal) !important; }
  .nav a.active::after { width: 100% !important; }`;
  document.head.appendChild(styleEl);

})();