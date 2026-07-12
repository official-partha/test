/* ============================================================
   SSC 2026 – Main JavaScript
   Vidyasagar University Social Science Conclave
   ============================================================ */

// ---- Scroll Progress Bar ----
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const progress   = docHeight > 0 ? scrollTop / docHeight : 0;
  progressBar.style.transform = `scaleX(${progress})`;
}

// ---- Navbar scroll behaviour ----
const navbar       = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu   = document.getElementById('mobile-menu');
const menuIconOpen  = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

function updateNavbar() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
    if (mobileToggle) mobileToggle.className = 'p-2 rounded-md text-gray-900';
  } else {
    navbar.classList.remove('scrolled');
    if (mobileToggle) mobileToggle.className = 'p-2 rounded-md text-white';
  }
}

// ---- Mobile Menu toggle ----
mobileToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuIconOpen.classList.toggle('hidden', isOpen);
  menuIconClose.classList.toggle('hidden', !isOpen);
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuIconOpen.classList.remove('hidden');
  menuIconClose.classList.add('hidden');
}

// Expose closeMobileMenu globally (called from inline onclick in HTML)
window.closeMobileMenu = closeMobileMenu;

// ---- Mouse follower (hero) ----
const mouseFollower = document.getElementById('mouse-follower');
document.addEventListener('mousemove', (e) => {
  if (mouseFollower) {
    mouseFollower.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
  }
});

// ---- Floating Particles (hero) ----
const particlesContainer = document.getElementById('particles-container');
if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const p   = document.createElement('div');
    p.className = 'particle';
    const left  = Math.random() * 100;
    const top   = Math.random() * 100;
    const dur   = (Math.random() * 5 + 5).toFixed(1) + 's';
    const delay = (Math.random() * 5).toFixed(1) + 's';
    const dx    = ((Math.random() - 0.5) * 100).toFixed(0) + 'px';
    p.style.cssText = `left:${left}%;top:${top}%;--dur:${dur};--delay:${delay};--dx:${dx};`;
    particlesContainer.appendChild(p);
  }
}

// ---- Ripple button effect ----
document.querySelectorAll('.ripple-btn').forEach(btn => {
  const circle = btn.querySelector('.ripple-circle');
  if (!circle) return;

  btn.addEventListener('mouseenter', (e) => {
    const rect = btn.getBoundingClientRect();
    circle.style.left       = (e.clientX - rect.left) + 'px';
    circle.style.top        = (e.clientY - rect.top)  + 'px';
    circle.style.transition = 'transform 0.8s ease-out';
    circle.style.transform  = 'scale(1) translate(-50%, -50%)';
  });

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    circle.style.transition = 'transform 0.8s ease-out';
    circle.style.left = (e.clientX - rect.left) + 'px';
    circle.style.top  = (e.clientY - rect.top)  + 'px';
  });

  btn.addEventListener('mouseleave', () => {
    circle.style.transition = 'transform 0.3s ease-out';
    circle.style.transform  = 'scale(0) translate(-50%, -50%)';
  });
});

// ---- Scroll Reveal (IntersectionObserver) ----
const revealEls = document.querySelectorAll('.reveal, .reveal-left');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => observer.observe(el));

// Trigger hero section reveals immediately on load
setTimeout(() => {
  document.querySelectorAll('#hero-logo, [id^="hero"]').forEach(el => {
    el.classList.add('visible');
  });
  document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
}, 100);

// ---- Scroll event listeners ----
window.addEventListener('scroll', () => {
  updateProgress();
  updateNavbar();
}, { passive: true });

// Initial calls
updateProgress();
updateNavbar();
