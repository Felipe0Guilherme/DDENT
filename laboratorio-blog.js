  /* ── Modal logic ── */
  function openModal(id) {
    const overlay = document.getElementById('modal-' + id);
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.modal').focus();
  }
  function closeModal(id) {
    const overlay = document.getElementById('modal-' + id);
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(o => {
        o.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  // Keyboard activate cards
  document.querySelectorAll('.topic-card[tabindex]').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Tab switching
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const modal = tab.dataset.modal;
      const tabName = tab.dataset.tab;

      // Update active tab
      tab.closest('.modal-tabs').querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      const body = tab.closest('.modal').querySelector('.modal-body');
      body.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(modal + '-' + tabName);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Canvas particles (hero) ── */
  const canvas = document.getElementById('blogCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, pts;
    function mkPt(forceBottom) {
      return {
        x: Math.random() * (W || window.innerWidth),
        y: forceBottom ? (H || window.innerHeight) + Math.random() * 60 : Math.random() * (H || window.innerHeight),
        vy: -(Math.random() * 0.55 + 0.15),
        vx: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 0.35,
        maxOp: Math.random() * 0.45 + 0.1,
      };
    }
    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      pts = Array.from({ length: 70 }, () => mkPt(false));
    }
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.y += p.vy; p.x += p.vx;
        const progress = 1 - (p.y / H);
        const fade = progress < 0.1 ? progress / 0.1 : progress > 0.85 ? 1 - (progress - 0.85) / 0.15 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76,139,201,${p.maxOp * fade})`;
        ctx.fill();
        if (p.y < -10) { const n = mkPt(true); Object.assign(p, n); }
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(76,139,201,${0.07*(1-d/90)})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
    resize(); draw();
  }

  /* ── Newsletter ── */
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const ok = document.getElementById('nlOk');
      ok.classList.add('show');
      nlForm.querySelector('[type=submit]').disabled = true;
    });
  }

  /* ── Reveal ── */
  const revEls = document.querySelectorAll('.reveal, .reveal-scale');
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); revObs.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revEls.forEach(el => revObs.observe(el));