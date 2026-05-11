document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const yearSpan = document.getElementById("year");
  const quoteForm = document.getElementById("quoteForm");
  const formNote = document.getElementById("formNote");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const sliderImages = {
    car: ["assets/car1.png", "assets/car2.png"],
    windows: [
      "assets/win1.png",
      "assets/win2.png",
      "assets/win3.png",
      "assets/win4.png",
      "assets/win5.png",
      "assets/win6.png"
    ]
  };

  document.querySelectorAll(".slider").forEach((slider) => {
    const type = slider.dataset.slider;
    const images = sliderImages[type] || [];
    const img = slider.querySelector("img");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");
    let current = 0;

    const showImage = (index) => {
      if (!img || images.length === 0) return;
      current = (index + images.length) % images.length;
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = images[current];
        img.style.opacity = "1";
      }, 120);
    };

    if (prev) {
      prev.addEventListener("click", () => showImage(current - 1));
    }

    if (next) {
      next.addEventListener("click", () => showImage(current + 1));
    }

    if (img) {
      img.style.transition = "opacity 180ms ease";
    }
  });

  const compareRange = document.getElementById("compareRange");
  const beforeWrap = document.getElementById("beforeWrap");
  const compareLine = document.getElementById("compareLine");

  const updateCompare = () => {
    if (!compareRange || !beforeWrap || !compareLine) return;
    const value = compareRange.value;
    beforeWrap.style.width = `${value}%`;
    compareLine.style.left = `${value}%`;
  };

  if (compareRange) {
    compareRange.addEventListener("input", updateCompare);
    updateCompare();
  }

  if (quoteForm && formNote) {
    quoteForm.addEventListener("submit", () => {
      formNote.textContent = "Thanks! Your request has been sent. We will reach out soon.";
      formNote.style.color = "#a5f3fc";
    });
  }

  const sections = document.querySelectorAll(".section");

  const revealSections = () => {
    const trigger = window.innerHeight * 0.86;

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < trigger) {
        section.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealSections);
  revealSections();
});
