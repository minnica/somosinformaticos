const p2ReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const p2Header = document.querySelector(".p2-header");
const p2Journey = document.querySelector(".p2-journey");

const syncP2Header = () => p2Header?.classList.toggle("is-scrolled", window.scrollY > 16);
syncP2Header();
window.addEventListener("scroll", syncP2Header, { passive: true });

if (!p2ReducedMotion && "IntersectionObserver" in window) {
  document.body.classList.add("p2-motion");
  const p2Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        p2Observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".p2-reveal").forEach((element) => p2Observer.observe(element));

  let p2Ticking = false;
  const syncJourneyProgress = () => {
    if (!p2Journey) return;
    const bounds = p2Journey.getBoundingClientRect();
    const total = bounds.height + window.innerHeight;
    const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / total));
    p2Journey.style.setProperty("--journey-progress", String(progress));
    p2Ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (p2Ticking) return;
      p2Ticking = true;
      window.requestAnimationFrame(syncJourneyProgress);
    },
    { passive: true },
  );
  syncJourneyProgress();
}
