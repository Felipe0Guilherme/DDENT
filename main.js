/* ============================================
   DDent — main.js
============================================ */

(function () {
  'use strict';

  // ── Custom cursor ──────────────────────────
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function lerpFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(lerpFollower);
  })();

  document.querySelectorAll('.card, .nav a').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ── Card magnetic glow ─────────────────────
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      const glow = card.querySelector('.card-glow');
      if (glow) { glow.style.left = x + '%'; glow.style.top = y + '%'; }
    });
  });

  // ── Card tilt ──────────────────────────────
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
      const ry = ((e.clientX - rect.left) / rect.width  - 0.5) *  10;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Orb parallax ──────────────────────────
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    orbs.forEach((orb, i) => {
      const d = (i + 1) * 12;
      orb.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
    });
  });

})();
