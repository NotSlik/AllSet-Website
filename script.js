// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    // Close nav after clicking a link (on mobile)
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
      }
    });
  }

  // Smooth scroll for internal links (#hero, #services, etc.)
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const id = href.slice(1); // remove the #
      const target = document.getElementById(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Handle the quote form submit (optional – just prevents page reload)
  const quoteForm = document.getElementById('quoteForm');
  const formNote = document.getElementById('formNote');

  if (quoteForm && formNote) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent =
        "Thanks! Your request is noted. We'll reach out using the contact info you provided.";
      formNote.style.color = '#a5f3fc'; // light teal/blue
      quoteForm.reset();
    });
  }
});
