const p1ReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const p1Header = document.querySelector(".p1-header");

const syncP1Header = () => p1Header?.classList.toggle("is-scrolled", window.scrollY > 16);
syncP1Header();
window.addEventListener("scroll", syncP1Header, { passive: true });

if (!p1ReducedMotion && "IntersectionObserver" in window) {
  document.body.classList.add("p1-motion");
  const p1Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        p1Observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".p1-reveal").forEach((element) => p1Observer.observe(element));
}
