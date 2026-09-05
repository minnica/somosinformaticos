const p3Header = document.querySelector("[data-p3-header]");
const p3Progress = document.querySelector(".p3-progress span");
const p3ReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const syncP3Chrome = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  p3Header?.classList.toggle("is-scrolled", window.scrollY > 24);
  if (p3Progress) p3Progress.style.transform = `scaleX(${progress})`;
};

syncP3Chrome();
window.addEventListener("scroll", syncP3Chrome, { passive: true });

const p3Gsap = window.gsap;
const p3ScrollTrigger = window.ScrollTrigger;

if (!p3Gsap || !p3ScrollTrigger || p3ReducedMotion) {
  document.body.classList.add("p3-no-gsap");
  document.querySelectorAll("[data-p3-stage]").forEach((stage) => stage.classList.add("is-active"));
} else {
  p3Gsap.registerPlugin(p3ScrollTrigger);
  p3Gsap.defaults({ ease: "expo.out", duration: 0.8 });

  const p3Media = p3Gsap.matchMedia();

  const heroTimeline = p3Gsap.timeline({ defaults: { ease: "expo.out" } });
  heroTimeline
    .from(".p3-header", { y: -32, autoAlpha: 0, duration: 0.65 })
    .from(".p3-hero-signal", { x: -24, autoAlpha: 0, duration: 0.55 }, 0.1)
    .from(".p3-title-line", { yPercent: 110, rotation: 1.5, autoAlpha: 0, stagger: 0.1, duration: 0.9 }, 0.16)
    .from(".p3-hero-bottom", { y: 26, autoAlpha: 0, duration: 0.7 }, 0.46)
    .from(".p3-machine", { clipPath: "inset(100% 0 0 0)", duration: 1.05 }, 0.18)
    .from(".p3-input", { x: -42, autoAlpha: 0, stagger: 0.08, duration: 0.55 }, 0.65)
    .from(".p3-core", { scale: 0.55, rotation: -25, autoAlpha: 0, duration: 0.85 }, 0.55)
    .from(".p3-output", { x: 48, autoAlpha: 0, duration: 0.65 }, 0.78);

  p3Gsap.to(".p3-core-ring", {
    rotation: 170,
    scrollTrigger: { trigger: ".p3-hero", start: "top top", end: "bottom top", scrub: 0.8 },
  });
  p3Gsap.to(".p3-core-ring.is-inner", {
    rotation: -230,
    scrollTrigger: { trigger: ".p3-hero", start: "top top", end: "bottom top", scrub: 0.8 },
  });
  p3Gsap.to(".p3-input-stack", {
    y: 90,
    scrollTrigger: { trigger: ".p3-hero", start: "top top", end: "bottom top", scrub: 1 },
  });
  p3Gsap.to(".p3-output", {
    y: -70,
    scrollTrigger: { trigger: ".p3-hero", start: "top top", end: "bottom top", scrub: 1 },
  });

  p3Gsap.utils.toArray("[data-p3-reveal]").forEach((element) => {
    p3Gsap.from(element, {
      y: 34,
      autoAlpha: 0,
      duration: 0.8,
      scrollTrigger: { trigger: element, start: "top 84%", once: true },
    });
  });

  p3Media.add("(min-width: 1024px)", () => {
    const systemTimeline = p3Gsap.timeline({
      scrollTrigger: {
        trigger: ".p3-system",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
        pin: ".p3-system-sticky",
        pinSpacing: false,
        onUpdate: (self) => {
          const activeIndex = Math.min(2, Math.floor(self.progress * 3));
          document.querySelectorAll("[data-p3-stage]").forEach((stage, index) => {
            stage.classList.toggle("is-active", index === activeIndex);
          });
        },
      },
    });

    systemTimeline
      .to(".p3-assembly-track span", { scaleX: 1, ease: "none", duration: 3 }, 0)
      .to(".p3-assembly-puck", { x: () => document.querySelector(".p3-assembly-track")?.clientWidth ?? 0, rotation: 720, ease: "none", duration: 3 }, 0)
      .fromTo(".p3-assembly-step.is-input", { scale: 1 }, { scale: 1.16, duration: 0.35, yoyo: true, repeat: 1 }, 0.05)
      .fromTo(".p3-assembly-step.is-logic", { scale: 1 }, { scale: 1.16, duration: 0.35, yoyo: true, repeat: 1 }, 1.08)
      .fromTo(".p3-assembly-step.is-output", { scale: 1 }, { scale: 1.16, duration: 0.35, yoyo: true, repeat: 1 }, 2.12)
      .to(".p3-assembly-map", { rotation: 2.5, transformOrigin: "center", duration: 3, ease: "none" }, 0);

    const machine = document.querySelector("[data-p3-machine]");
    if (machine && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const xTo = p3Gsap.quickTo(machine, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = p3Gsap.quickTo(machine, "y", { duration: 0.55, ease: "power3.out" });
      const moveMachine = (event) => {
        const bounds = machine.getBoundingClientRect();
        xTo(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        yTo(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
      };
      const resetMachine = () => { xTo(0); yTo(0); };
      machine.addEventListener("pointermove", moveMachine);
      machine.addEventListener("pointerleave", resetMachine);
      return () => {
        machine.removeEventListener("pointermove", moveMachine);
        machine.removeEventListener("pointerleave", resetMachine);
      };
    }
  });

  p3Media.add("(max-width: 1023px)", () => {
    document.querySelectorAll("[data-p3-stage]").forEach((stage) => stage.classList.add("is-active"));
    p3Gsap.from(".p3-assembly-step", {
      x: -28,
      autoAlpha: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: ".p3-assembly", start: "top 78%", once: true },
    });
    p3Gsap.to(".p3-assembly-track span", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: ".p3-assembly", start: "top 78%", end: "bottom 42%", scrub: 0.5 },
    });
  });

  p3Gsap.utils.toArray("[data-p3-capability]").forEach((row, index) => {
    p3Gsap.from(row, {
      xPercent: index % 2 === 0 ? -5 : 5,
      autoAlpha: 0,
      duration: 0.8,
      scrollTrigger: { trigger: row, start: "top 86%", once: true },
    });
  });

  p3Gsap.utils.toArray("[data-p3-project]").forEach((project, index) => {
    p3Gsap.from(project.querySelector(".p3-project-copy"), {
      x: index % 2 === 0 ? -36 : 36,
      autoAlpha: 0,
      duration: 0.72,
      scrollTrigger: { trigger: project, start: "top 82%", once: true },
    });
    p3Gsap.to(project.querySelector(".p3-project-mark"), {
      rotation: index % 2 === 0 ? 100 : -100,
      scrollTrigger: { trigger: project, start: "top bottom", end: "bottom top", scrub: 0.8 },
    });
  });

  const contactTimeline = p3Gsap.timeline({
    scrollTrigger: { trigger: ".p3-contact", start: "top 74%", once: true },
    defaults: { ease: "expo.out" },
  });
  contactTimeline
    .from(".p3-contact-orbit", { scale: 0.55, rotation: -60, autoAlpha: 0, duration: 1.1 })
    .from(".p3-contact-orbit span", { scale: 0.25, stagger: 0.1, duration: 0.65 }, 0.25)
    .from(".p3-contact-copy > *", { y: 28, autoAlpha: 0, stagger: 0.09, duration: 0.7 }, 0.38);

  document.fonts?.ready.then(() => p3ScrollTrigger.refresh());
  window.addEventListener("pagehide", () => {
    p3Media.revert();
    p3ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, { once: true });
}
