document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.site-header nav a');
  const sections = Array.from(document.querySelectorAll('section'));
  const navBar = document.querySelector('.site-header');
  const navInner = document.querySelector('.nav-inner');
  const brand = document.querySelector('.brand-name');

  function highlightNav() {
    const navHeight = navBar.offsetHeight;
    const scrollTop = window.scrollY;
    let activeIdx = 0;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop - navHeight - 50;
      if (scrollTop >= sectionTop) {
        activeIdx = i;
        break;
      }
    }

    const isAtBottom = (window.innerHeight + scrollTop) >= (document.documentElement.scrollHeight - 10);
    if (isAtBottom) activeIdx = sections.length - 1;

    navLinks.forEach((link, idx) => {
      link.classList.toggle('active', idx === activeIdx);
    });
  }

  function resizeNavbar() {
    const scrollY = window.scrollY;
    const maxShrink = 100;
    const factor = Math.min(scrollY / maxShrink, 1);

    navInner.style.padding = `${1.5 - 0.6 * factor}rem 1rem`;
    brand.style.fontSize = `${2 - 0.5 * factor}rem`;
    navLinks.forEach(link => {
      link.style.fontSize = `${1.1 - 0.2 * factor}rem`;
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const targetTop = target.offsetTop - navBar.offsetHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        highlightNav();
        resizeNavbar();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { highlightNav(); resizeNavbar(); });

  highlightNav();
  resizeNavbar();


const slides = document.querySelectorAll('.carousel .slide');
const slidesContainer = document.querySelector('.carousel-slides');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;

function showSlide(idx) {
  const total = slides.length;
  if (idx < 0) currentSlide = total - 1;
  else if (idx >= total) currentSlide = 0;
  else currentSlide = idx;

  const offset = -currentSlide * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

showSlide(0);
});

const modal = document.getElementById('contact-modal');
const btnOpen = document.querySelector('.btn-open-modal');
const btnClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contact-form');

btnOpen.addEventListener('click', () => {
  modal.style.display = 'block';
});

btnClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  modal.style.display = 'none';
  contactForm.reset();
});

