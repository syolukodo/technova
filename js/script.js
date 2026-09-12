document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.getElementById("header");
  const backTop = document.getElementById("backTop");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  /* ---------- Header scroll state ---------- */
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 8);
    backTop.classList.toggle("visible", y > 560);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- Mobile menu ---------- */
  const setMenu = (open) => {
    hamburger.classList.toggle("active", open);
    mobileMenu.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    body.classList.toggle("no-scroll", open);
  };

  hamburger.addEventListener("click", () => {
    setMenu(!mobileMenu.classList.contains("open"));
  });

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      setMenu(false);
    }
  });

  /* ---------- Active nav link ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const stagger = () => {
    document.querySelectorAll(".feature-grid, .services-grid, .case-grid, .testi-grid").forEach((grid) => {
      [...grid.children].forEach((child, i) => {
        child.style.transitionDelay = (i % 3) * 0.09 + "s";
      });
    });
    document.querySelectorAll(".contact-chips li").forEach((li, i) => {
      li.closest(".reveal").style.transitionDelay = i * 0.06 + "s";
    });
  };

  if (!reduceMotion) {
    stagger();
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -5% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    body.classList.add("no-animation");
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});