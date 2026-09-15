/* ============================================================
   WALE BEN — Shared JS
   ============================================================ */

// Force HTTPS
if (location.protocol === 'http:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
  location.replace('https:' + location.href.slice(5));
}

(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');

  // Scroll-based nav background
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav__links a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('mobile-open'));
    });
  }

  // Mark active nav link based on current page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ---- Cookie Consent ----
(function () {
  const CONSENT_KEY = 'wb_cookie_consent';
  const consent = localStorage.getItem(CONSENT_KEY);

  if (consent === 'declined') return;

  // Show banner
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  if (consent !== 'accepted') {
    banner.classList.remove('hidden');
  }

  document.getElementById('cookieAccept').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    banner.classList.add('hidden');
  });

  document.getElementById('cookieDecline').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'declined');
    banner.classList.add('hidden');
  });
})();
