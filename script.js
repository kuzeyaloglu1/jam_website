// BGJ'26 begins at 10:00 in Istanbul (UTC+3) on 23 October 2026.
const EVENT_START = new Date('2026-10-23T10:00:00+03:00').getTime();

const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

function pad(value) {
    return String(Math.max(0, value)).padStart(2, '0');
}

function updateCountdown() {
    const remaining = Math.max(0, EVENT_START - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);

    const values = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };

    Object.entries(countdownElements).forEach(([unit, element]) => {
        if (element) element.textContent = pad(values[unit]);
    });

    return remaining;
}

if (Object.values(countdownElements).some(Boolean)) {
    updateCountdown();

    const countdownTimer = window.setInterval(() => {
        if (updateCountdown() === 0) window.clearInterval(countdownTimer);
    }, 1000);
}

// --- NAVİGASYON (MOBILE MENU & NAVBAR) KODLARI ---
document.addEventListener('DOMContentLoaded', function () {
    if (window.lucide && typeof window.lucide.createIcons === 'function') { window.lucide.createIcons(); }
    const navWrap = document.getElementById('navbar');
    const toggle = document.getElementById('bgj-mobile-toggle');
    const menu = document.getElementById('bgj-mobile-menu');
    const mobileLinks = document.querySelectorAll('.bgj-mobile-link');

    function setMenu(open) {
        if (!toggle || !menu) return;
        toggle.classList.toggle('is-open', open);
        menu.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            setMenu(!menu.classList.contains('is-open'));
        });
    }

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 860) setMenu(false);
    });

    function handleScroll() {
        if (navWrap) navWrap.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
});

// --- SPONSOR SAATİ (SPONSOR CLOCK) KODLARI ---
(() => {
  const clock = document.querySelector('[data-sponsor-clock]');
  if (!clock || clock.dataset.ready === '1') return;
  clock.dataset.ready = '1';

  const nodes = [...clock.querySelectorAll('[data-sponsor-index]')];
  const hand = clock.querySelector('.bgj-clock-hand');
  const labelEl = document.querySelector('[data-active-sponsor-label]');
  const nameEl = document.querySelector('[data-active-sponsor-name]');
  const linkEl = document.querySelector('[data-active-sponsor-link]');
  if (!nodes.length || !hand) return;

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const angles = nodes.map(node => Number((node.style.getPropertyValue('--angle') || '0').replace('deg','')) || 0);
  let lastActive = -1;
  let raf = 0;
  const duration = 25000;
  const started = performance.now();

  const setActive = (i) => {
    if (i === lastActive) return;
    lastActive = i;
    nodes.forEach((node, idx) => node.classList.toggle('is-active', idx === i));
    const node = nodes[i];
    const name = node.dataset.name || node.getAttribute('aria-label') || 'Sponsor';
    const url = node.dataset.url || node.href;
    const tier = node.dataset.tier || '';
    if (labelEl) labelEl.textContent = tier;
    if (nameEl) nameEl.textContent = name;
    if (linkEl) {
      linkEl.href = url;
      linkEl.setAttribute('aria-label', name + ' web sitesini ziyaret et');
    }
  };

  const nearestIndex = (angle) => {
    let best = 0;
    let bestDiff = Infinity;
    angles.forEach((a, i) => {
      const diff = Math.abs(((angle - a + 540) % 360) - 180);
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    });
    return best;
  };

  const render = (now) => {
    const angle = reduce ? 0 : (((now - started) % duration) / duration) * 360;
    hand.style.transform = `rotate(${angle}deg)`;
    setActive(nearestIndex(angle));
    if (!reduce) raf = requestAnimationFrame(render);
  };

  nodes.forEach((node, i) => {
    node.addEventListener('mouseenter', () => setActive(i));
    node.addEventListener('focus', () => setActive(i));
  });

  render(performance.now());
  window.addEventListener('pagehide', () => raf && cancelAnimationFrame(raf), { once:true });
})();
/*
// Navbar dinamik renk değiştirici
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.bgj-floating-nav');
    const sections = document.querySelectorAll('section');

    // Hangi section'da hangi rengin yanacağını burada belirliyoruz
    const sectionColors = {
        'anasayfa': 'rgba(7, 12, 22, 0.88)',     // Varsayılan koyu renk
        'hakkimizda': 'rgba(11, 48, 68, 0.88)',  // Koyu Mavi
        'program': 'rgba(15, 61, 79, 0.88)',     // Turkuaz tonu
        'oduller': 'rgba(176, 38, 255, 0.65)',   // Senin yeni Neon Mor
        'ekibimiz': 'rgba(0, 255, 255, 0.40)'    // Senin yeni Neon Turkuaz
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Section'ın %50'si ekrandayken tetiklenir
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (sectionColors[id]) {
                    navbar.style.background = sectionColors[id];
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
*/
/*
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const root = document.documentElement;

    // Hangi section'da kaydırma çubuğunun hangi renk olacağını belirliyoruz
    const scrollbarColors = {
        'anasayfa': '#8B5CF6',     // Klasik Mor
        'hakkimizda': '#06B6D4',   // Klasik Turkuaz
        'program': '#F43F5E',      // Pembe/Kırmızı
        'oduller': '#B026FF',      // Canlı Neon Mor
        'merch': '#c7ff27',        // Merch/Sponsor sarısı
        'sponsorlar': '#06B6D4',
        'sss': '#c7ff27',
        'ekibimiz': '#00FFFF'      // Canlı Neon Turkuaz
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Section'ın %50'si ekrana girdiğinde çalışır
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (scrollbarColors[id]) {
                    // Sayfa indikçe CSS değişkenini yeni renkle eziyoruz
                    root.style.setProperty('--scrollbar-color', scrollbarColors[id]);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});*/