(function () {
  'use strict';

  var body = document.body;
  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');

  // Mobil menü
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mobilde açılır menü (Hizmetler)
  document.querySelectorAll('.nav__item--drop > .nav__link').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        e.preventDefault();
        var item = btn.parentElement;
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    });
  });

  // Menüden bir bağlantıya tıklanınca mobil menüyü kapat
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { body.classList.remove('nav-open'); });
  });

  // Kaydırınca üst menü gölgesi
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Yıl
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Görünür olunca belirme animasyonu
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Akü amper tablosu filtresi
  var filters = document.querySelectorAll('[data-filter]');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      document.querySelectorAll('[data-cat]').forEach(function (row) {
        var show = cat === 'all' || row.getAttribute('data-cat') === cat;
        row.classList.toggle('is-hidden', !show);
      });
    });
  });

  // İletişim formu -> WhatsApp mesajı
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [
        'Merhaba Akü Noktası Balıkesir,',
        'Ad Soyad: ' + (data.get('ad') || ''),
        'Telefon: ' + (data.get('telefon') || ''),
        'Hizmet: ' + (data.get('hizmet') || ''),
        'Araç: ' + (data.get('arac') || '-'),
        'Mesaj: ' + (data.get('mesaj') || '-')
      ];
      var url = 'https://wa.me/905421340239?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }
})();
