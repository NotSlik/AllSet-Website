// script.js

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  const yearSpan = document.getElementById('year');
  const quoteForm = document.getElementById('quoteForm');
  const formNote = document.getElementById('formNote');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const id = href.slice(1);
      const target = document.getElementById(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (quoteForm && formNote) {
    quoteForm.addEventListener('submit', () => {
      formNote.textContent =
        'Thanks! Your request has been sent. We will reach out soon.';
      formNote.style.color = '#a5f3fc';
    });
  }

  const sections = document.querySelectorAll('.section');

  const revealSections = () => {
    const trigger = window.innerHeight * 0.85;

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < trigger) {
        section.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealSections);
  revealSections();
});
