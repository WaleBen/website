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

  function loadAnalytics() {
    // Replace G-XXXXXXXXXX with your Google Analytics 4 Measurement ID
    const GA_ID = 'G-XXXXXXXXXX';
    if (GA_ID === 'G-XXXXXXXXXX') return; // placeholder — no ID set yet
    const s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  if (consent === 'accepted') {
    loadAnalytics();
    return;
  }

  if (consent === 'declined') return;

  // Show banner
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  banner.classList.remove('hidden');

  document.getElementById('cookieAccept').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    banner.classList.add('hidden');
    loadAnalytics();
  });

  document.getElementById('cookieDecline').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'declined');
    banner.classList.add('hidden');
  });
})();
