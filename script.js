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

  // Google Ads conversion tag for the "Request quote" action
  // (read from Google Ads > Goals > Conversions, Oct 12 2026).
  const ADS_CONVERSION = { id: "AW-18496943428", label: "XLzKCNmwxJMdEMTqg_RE" };

  // Fires the conversion, then calls done(). Redirect waits for Google's
  // callback (or a 1.5s fallback) so the conversion is never lost.
  const fireAdsConversion = (done) => {
    let finished = false;
    const finish = () => { if (!finished) { finished = true; done(); } };
    try {
      if (window.gtag && ADS_CONVERSION.id && ADS_CONVERSION.label) {
        window.gtag("event", "conversion", {
          send_to: ADS_CONVERSION.id + "/" + ADS_CONVERSION.label,
          event_callback: finish
        });
        setTimeout(finish, 1500);
        return;
      }
    } catch (e) { /* tracking must never break the form */ }
    finish();
  };

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formNote) {
        formNote.textContent = "Sending your request...";
        formNote.style.color = "#a5f3fc";
      }
      fetch(quoteForm.action, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: { Accept: "application/json" }
      })
        .then((response) => {
          if (response.ok) {
            fireAdsConversion(() => { window.location.href = "thank-you.html"; });
          } else {
            throw new Error("form error");
          }
        })
        .catch(() => {
          if (formNote) {
            formNote.textContent =
              "Something went wrong sending your request. Please text us at (319) 471-1377.";
          }
        });
    });
  }


  const winRange = document.getElementById("winRange");
  const winCount = document.getElementById("winCount");
  const calcTotal = document.getElementById("calcTotal");
  const calcCta = document.getElementById("calcCta");

  const updateCalc = () => {
    if (!winRange || !calcTotal) return;
    const n = parseInt(winRange.value, 10) || 0;
    if (winCount) winCount.textContent = n;
    calcTotal.textContent = "$" + n * 8;
  };

  if (winRange) {
    winRange.addEventListener("input", updateCalc);
    updateCalc();
  }

  if (calcCta) {
    calcCta.addEventListener("click", () => {
      const n = winRange ? parseInt(winRange.value, 10) || 0 : 0;
      const msg = document.querySelector('#quoteForm textarea[name="message"]');
      if (msg && !msg.value) {
        msg.value = "Instant quote estimate: " + n + " windows \u2248 $" + n * 8 + " (approximate). Please confirm my final quote.";
      }
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
