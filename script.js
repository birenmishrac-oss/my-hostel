const loader = document.querySelector('#loader');
const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
const header = document.querySelector('#site-header');
const topButton = document.querySelector('#top');
const modal = document.querySelector('#gallery-modal');
const modalTitle = document.querySelector('#modal-title');

window.addEventListener('load', () => {
  if (loader) {
    loader.classList.add('loaded');
    window.setTimeout(() => loader.remove(), 600);
  }
});

menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menu.focus();
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  }
});

const updateScrolledState = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  topButton.classList.toggle('visible', window.scrollY > 500);
};
window.addEventListener('scroll', updateScrolledState, { passive: true });
updateScrolledState();

topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelector('#year').textContent = new Date().getFullYear();

// Each replaceable visual has one stable asset filename. Missing files retain the styled placeholder.
document.querySelectorAll('[data-asset]').forEach((surface) => {
  const asset = new Image();
  asset.addEventListener('load', () => surface.classList.add('has-image'));
  asset.src = surface.dataset.asset;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  modalTitle.textContent = item.dataset.title;
  modal.showModal();
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#form-message');
  message.textContent = 'Thank you — your enquiry is ready for our team.';
  event.currentTarget.reset();
});

document.querySelectorAll('[data-placeholder-contact]').forEach((link) => link.addEventListener('click', (event) => {
  if (link.href.includes('XXXXXXXXXX')) {
    event.preventDefault();
    document.querySelector('#form-message').textContent = 'Contact details will be available shortly.';
  }
}));
