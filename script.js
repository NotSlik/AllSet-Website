document.addEventListener('DOMContentLoaded', () => {
  const palmLeft = document.querySelector('.palm-left');
  const palmRight = document.querySelector('.palm-right');
  let palmFrame = null;

  const updatePalmTilt = () => {
    palmFrame = null;

    if (!palmLeft || !palmRight) {
      return;
    }

    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / maxScroll, 1);
    const maxRotation = window.innerWidth <= 720 ? 7 : 14;
    const leftRotation = progress * maxRotation;
    const rightRotation = progress * -maxRotation;

    palmLeft.style.transform = `rotate(${leftRotation}deg)`;
    palmRight.style.transform = `scaleX(-1) rotate(${rightRotation}deg)`;
  };

  const requestPalmTiltUpdate = () => {
    if (palmFrame !== null) {
      return;
    }

    palmFrame = window.requestAnimationFrame(updatePalmTilt);
  };

  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
      }
    });
  }

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
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

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const quoteForm = document.getElementById('quoteForm');
  const formNote = document.getElementById('formNote');

  if (quoteForm && formNote) {
    quoteForm.addEventListener('submit', () => {
      formNote.textContent =
        "Thanks! Your request has been sent. We'll reach out using the contact info you provided.";
      formNote.style.color = '#a5f3fc';
    });
  }

  requestPalmTiltUpdate();
  window.addEventListener('scroll', requestPalmTiltUpdate, { passive: true });
  window.addEventListener('resize', requestPalmTiltUpdate);
});
