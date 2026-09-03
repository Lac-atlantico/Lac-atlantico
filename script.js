const toggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

// Carrusel automático de fotos del hero (solo actúa si existe en la página)
(function () {
  const slides = document.querySelectorAll('.hero-carousel .carousel-slide');
  const dotsWrap = document.getElementById('carouselDots');
  if (!slides.length || !dotsWrap) return;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Ver foto ' + (i + 1));
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  let current = 0;
  let timer;

  function goTo(index, manual) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    if (manual) restart();
  }
  function next() { goTo((current + 1) % slides.length); }
  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }
  if (prevBtn) prevBtn.addEventListener('click', () => goTo((current - 1 + slides.length) % slides.length, true));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo((current + 1) % slides.length, true));
  restart();
})();

// Lightbox (solo actúa si existe en la página)
function openLightbox(btn) {
  if (!lightbox || !lightboxImg) return;
  const src = btn.getAttribute('data-full');
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
