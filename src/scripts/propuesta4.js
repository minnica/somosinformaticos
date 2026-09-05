document.body.classList.add("p4-js");

const p4Header = document.querySelector("[data-p4-header]");
const p4Orbit = document.querySelector("[data-p4-orbit]");
const p4OrbitField = p4Orbit?.querySelector(".p4-orbit-field");
const p4ReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const syncP4Header = () => {
  p4Header?.classList.toggle("is-fixed", window.scrollY > 40);
};

syncP4Header();
window.addEventListener("scroll", syncP4Header, { passive: true });

if (!p4ReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7%" },
  );

  document.querySelectorAll("[data-p4-reveal]").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll("[data-p4-reveal]").forEach((element) => element.classList.add("is-visible"));
}

if (p4Orbit && p4OrbitField && !p4ReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const tiltOrbit = (event) => {
    const bounds = p4Orbit.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    p4OrbitField.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  };

  const resetOrbit = () => {
    p4OrbitField.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  p4Orbit.addEventListener("pointermove", tiltOrbit);
  p4Orbit.addEventListener("pointerleave", resetOrbit);
}

const year = document.querySelector("[data-p4-year]");
if (year) year.textContent = String(new Date().getFullYear());
