
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  sections.forEach(s => {
    if (s.getBoundingClientRect().top < window.innerHeight*0.85) {
      s.classList.add('visible');
    }
  });
});
