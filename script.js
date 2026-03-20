document.addEventListener('DOMContentLoaded', () => {
  const palmLeft = document.querySelector('.palm-left');
  const palmRight = document.querySelector('.palm-right');
  const navToggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  const yearSpan = document.getElementById('year');
  const quoteForm = document.getElementById('quoteForm');
  const formNote = document.getElementById('formNote');

  let palmFrame = null;

  const updatePalmTilt = () => {
    palmFrame = null;

    if (!palmLeft || !palmRight) {
      return;
    }

    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / maxScroll, 1);
    const maxRotation = window.innerWidth <= 720 ? 6 : 12;
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
        "Thanks! Your request has been sent. We will reach out using the contact info you provided.";
      formNote.style.color = '#a5f3fc';
    });
  }

  requestPalmTiltUpdate();
  window.addEventListener('scroll', requestPalmTiltUpdate, { passive: true });
  window.addEventListener('resize', requestPalmTiltUpdate);
});
