/* ── Lógica dos Modais ── */
function openModal(id) {
  const overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  const modal = overlay.querySelector('.modal');
  if (modal) modal.focus();
}

function closeModal(id) {
  const overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Fechar ao clicar no overlay (fora do modal)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      const id = overlay.id.replace('modal-', '');
      closeModal(id);
    }
  });
});

// Fechar com a tecla ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(o => {
      const id = o.id.replace('modal-', '');
      closeModal(id);
    });
  }
});

// Ativar cards via teclado (Enter ou Espaço)
document.querySelectorAll('.topic-card[tabindex]').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Troca de Abas (Tabs) dentro do Modal
document.querySelectorAll('.modal-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const modalId = tab.dataset.modal;
    const tabName = tab.dataset.tab;

    // Atualiza aba ativa
    tab.closest('.modal-tabs').querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Atualiza painel ativo
    const body = tab.closest('.modal').querySelector('.modal-body');
    body.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
    
    const panel = document.getElementById(modalId + '-' + tabName);
    if (panel) panel.classList.add('active');
  });
});

/* ── Partículas no Canvas (Hero) ── */
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
      if (p.y < -10) Object.assign(p, mkPt(true));
    });
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); });
  resize(); 
  draw();
}

/* ── Newsletter ── */
const nlForm = document.getElementById('newsletterForm');
if (nlForm) {
  nlForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('nlOk').classList.add('show');
    nlForm.querySelector('[type=submit]').disabled = true;
  });
}

/* ── Efeito Reveal (Scroll) ── */
const revEls = document.querySelectorAll('.reveal, .reveal-scale');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { 
      entry.target.classList.add('in-view'); 
      revObs.unobserve(entry.target); 
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revEls.forEach(el => revObs.observe(el));