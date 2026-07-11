document.documentElement.classList.add("reveal-ready");

const sections = document.querySelectorAll(".main-wrapper > .section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  sections.forEach((section) => observer.observe(section));

  const navLinks = [...document.querySelectorAll(".section-nav a")];
  const navTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const navObserver = new IntersectionObserver(
    (entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (!current) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${current.target.id}`
        );
      });
    },
    { rootMargin: "-15% 0px -70%", threshold: 0 }
  );
  navTargets.forEach((target) => navObserver.observe(target));
} else {
  sections.forEach((section) => section.classList.add("is-visible"));
}
