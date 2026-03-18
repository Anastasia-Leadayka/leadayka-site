(() => {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // Back to top
  const toTopBtn = document.querySelector("[data-to-top]");
  if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  // Filter chips (visual state only — no data filtering, preserves design)
  const chips = Array.from(document.querySelectorAll(".chip"));
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");
    });
  });

  // Reveal cards on load/scroll
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { root: null, threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback
    requestAnimationFrame(() => revealEls.forEach((el) => el.classList.add("is-visible")));
  }
})();
