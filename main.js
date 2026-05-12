/* DDent — main.js */
(function () {
  'use strict';

  // Card glow seguindo o mouse
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      const g = card.querySelector('.card-glow');
      if (g) { g.style.left = x + '%'; g.style.top = y + '%'; }
    });
  });

  // Tilt 3D nos cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -7;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  7;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // Parallax nos orbs
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const d = (i + 1) * 10;
      orb.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
    });
  });
})();
