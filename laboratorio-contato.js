    /* ── Hero canvas particles ── */
    (function () {
      const canvas = document.getElementById('ctCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let W, H, pts, raf;

      function mkPt(forceBottom) {
        return {
          x: Math.random() * (W || window.innerWidth),
          y: forceBottom ? (H || window.innerHeight) + Math.random() * 60 : Math.random() * (H || window.innerHeight),
          vy: -(Math.random() * 0.55 + 0.15),
          vx: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.6 + 0.35,
          maxOp: Math.random() * 0.45 + 0.1
        };
      }
      function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        pts = Array.from({ length: 70 }, () => mkPt(false));
      }
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
            const d = Math.sqrt(dx*dx + dy*dy);
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
    })();

    /* ── FAQ accordion ── */
    function toggleFaq(btn) {
      const item = btn.closest('.ct-faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.ct-faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }

    /* ── Form submit ── */
    document.getElementById('ctForm').addEventListener('submit', function(e) {
      e.preventDefault();
      this.style.display = 'none';
      document.getElementById('ctSuccess').classList.add('show');
    });

    /* ── Scroll reveal ── */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-scale').forEach(el => revObs.observe(el));