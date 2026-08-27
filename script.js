// Simple scroll-reveal for section content.
// Respects prefers-reduced-motion (handled in CSS transition-duration override too).
document.addEventListener("DOMContentLoaded", () => {
  // Photo slots: if an image fails to load (i.e. hasn't been added yet),
  // fall back to a labeled placeholder instead of a broken-image icon.
  document.querySelectorAll(".photo").forEach((slot) => {
    const img = slot.querySelector(".photo-img");
    if (!img) return;
    img.addEventListener("error", () => slot.classList.add("missing"));
    if (img.complete && img.naturalWidth === 0) slot.classList.add("missing");
  });

  const revealEls = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
});
