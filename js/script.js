/* ============================================
   FEATURED CARS DATA & RENDER
   ============================================ */
const featuredCars = [
  { name: 'BMW 6-Series', tag: 'Gran Coupe', price: '$89,395', year: 2024, mi: '3,100', hp: '240HP', img: 'images/featured-cars/fc1.png' },
  { name: 'Chevrolet Camaro', tag: 'WMV20', price: '$66,575', year: 2024, mi: '5,200', hp: '455HP', img: 'images/featured-cars/fc2.png' },
  { name: 'Lamborghini', tag: 'V520', price: '$125,250', year: 2024, mi: '1,800', hp: '640HP', img: 'images/featured-cars/fc3.png' },
  { name: 'Audi A3', tag: 'Sedan', price: '$95,500', year: 2024, mi: '4,100', hp: '228HP', img: 'images/featured-cars/fc4.png' },
  { name: 'Infiniti Z5', tag: 'Sport', price: '$36,850', year: 2024, mi: '6,700', hp: '300HP', img: 'images/featured-cars/fc5.png' },
  { name: 'Porsche 718', tag: 'Cayman', price: '$48,500', year: 2024, mi: '2,300', hp: '350HP', img: 'images/featured-cars/fc7.png' },
  { name: 'BMW 8-Series', tag: 'Coupe', price: '$56,000', year: 2024, mi: '3,900', hp: '335HP', img: 'images/featured-cars/fc8.png' },
  { name: 'BMW X-Series', tag: 'X6', price: '$75,800', year: 2024, mi: '2,100', hp: '375HP', img: 'images/featured-cars/fc5.png' }
];

const grid = document.getElementById('featuredGrid');
grid.innerHTML = featuredCars.map(c => `
  <article class="car-card reveal">
    <div class="car-card-img">
      <img src="${c.img}" alt="${c.name}" loading="lazy"/>
    </div>
    <div class="car-card-meta">
      <span>Model: ${c.year}</span>
      <span>${c.mi} mi · ${c.hp}</span>
    </div>
    <div class="car-card-body">
      <h3>${c.name} <span>${c.tag}</span></h3>
      <div class="car-price">${c.price}</div>
      <p>Exceptional condition, full service history, and ready for immediate delivery.</p>
    </div>
  </article>
`).join('');

/* ============================================
   HEADER SCROLL STATE
   ============================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============================================
   MOBILE NAV
   ============================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function openNav() { mobileNav.classList.add('open'); mobileOverlay.classList.add('open'); }
function closeNav() { mobileNav.classList.remove('open'); mobileOverlay.classList.remove('open'); }

menuToggle.addEventListener('click', openNav);
mobileClose.addEventListener('click', closeNav);
mobileOverlay.addEventListener('click', closeNav);
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

/* ============================================
   CAROUSEL
   ============================================ */
const track = document.getElementById('carTrack');
const slides = track.children;
const dotsContainer = document.getElementById('carDots');
let currentSlide = 0;

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  [...dotsContainer.children].forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('carPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('carNext').addEventListener('click', () => goToSlide(currentSlide + 1));

// Auto-advance
let autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
track.parentElement.addEventListener('mouseleave', () => {
  autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
});

/* ============================================
   TESTIMONIAL CAROUSEL (auto-scroll on mobile)
   ============================================ */
const tTrack = document.getElementById('testimonialTrack');
let tIndex = 0;

function rotateTestimonials() {
  if (window.innerWidth > 768) {
    // On desktop, do a subtle auto-slide
    const cardWidth = tTrack.children[0].offsetWidth + 24;
    tIndex = (tIndex + 1) % (tTrack.children.length - 2);
    tTrack.style.transform = `translateX(-${tIndex * cardWidth}px)`;
  } else {
    tTrack.style.transform = '';
  }
}

setInterval(rotateTestimonials, 4500);
window.addEventListener('resize', () => { tTrack.style.transform = ''; tIndex = 0; });

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   SCROLL TO TOP
   ============================================ */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});