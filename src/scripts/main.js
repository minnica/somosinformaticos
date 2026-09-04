const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

const revealElements = document.querySelectorAll(".reveal:not(.show)");

if ("IntersectionObserver" in window && !reduceMotion) {
  revealElements.forEach((element) => element.classList.add("is-observed"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
}

const heroTilt = document.querySelector("#heroTilt");

if (heroTilt && hasFinePointer && !reduceMotion) {
  heroTilt.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 980) return;

    const bounds = heroTilt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroTilt.style.transform = `perspective(1100px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });

  heroTilt.addEventListener("pointerleave", () => {
    heroTilt.style.transform = "";
  });
}

if (hasFinePointer && !reduceMotion) {
  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 900) return;

      const bounds = button.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);

      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px) translateY(-2px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
}

const menuButton = document.querySelector("#menuBtn");
const navigation = document.querySelector("#navlinks");

const closeMenu = ({ restoreFocus = false } = {}) => {
  if (!menuButton || !navigation) return;

  navigation.classList.remove("mobile");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  document.body.classList.remove("menu-open");

  if (restoreFocus) menuButton.focus();
};

menuButton?.addEventListener("click", () => {
  if (!navigation) return;

  const shouldOpen = !navigation.classList.contains("mobile");
  navigation.classList.toggle("mobile", shouldOpen);
  menuButton.classList.toggle("open", shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen ? "Cerrar menú" : "Abrir menú");
  document.body.classList.toggle("menu-open", shouldOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("mobile")) {
    closeMenu({ restoreFocus: true });
  }
});

document.addEventListener("pointerdown", (event) => {
  if (!(event.target instanceof Node)) return;
  if (!navigation?.classList.contains("mobile")) return;
  if (navigation.contains(event.target) || menuButton?.contains(event.target)) return;

  closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

const phrases = [
  "¿Tienes una idea? Si_ la construimos.",
  "¿Necesitas vender mejor? Si_ diseñamos para convertir.",
  "¿Tu sitio ya se quedó atrás? Si_ lo renovamos.",
  "¿Quieres algo claro y profesional? Si_",
];
const typingTarget = document.querySelector("#siTyping");

if (typingTarget && !reduceMotion) {
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const type = () => {
    const phrase = phrases[phraseIndex];
    typingTarget.innerHTML = phrase
      .slice(0, characterIndex)
      .replace("Si_", "<strong>Si_</strong>");

    let delay = 38;

    if (!deleting && characterIndex < phrase.length) {
      characterIndex += 1;
    } else if (!deleting) {
      deleting = true;
      delay = 1500;
    } else if (characterIndex > 0) {
      characterIndex -= 1;
      delay = 20;
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 260;
    }

    window.setTimeout(type, delay);
  };

  type();
}
