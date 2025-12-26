(() => {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");

  // Header scroll state
  const onScroll = () => {
    header?.setAttribute("data-scrolled", window.scrollY > 10 ? "true" : "false");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const setNavOpen = (open) => {
    nav?.setAttribute("data-open", open ? "true" : "false");
    toggle?.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle?.addEventListener("click", () => {
    const open = nav?.getAttribute("data-open") === "true";
    setNavOpen(!open);
  });

  // Close mobile nav when clicking a link
  nav?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setNavOpen(false));
  });

  // Set year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Email-only form handling (opens mail client with prefilled body)
  const mailto = (subject, body) => {
    const email = document.getElementById("contactEmail")?.textContent?.trim() || "bookings@anvilsecurity.co.uk";
    const href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const validateRequired = (form) => {
    const required = Array.from(form.querySelectorAll("[required]"));
    let ok = true;
    required.forEach(el => {
      const val = (el.value || "").trim();
      if (!val) {
        ok = false;
        el.setAttribute("aria-invalid", "true");
      } else {
        el.removeAttribute("aria-invalid");
      }
    });
    return ok;
  };

  const quoteForm = document.getElementById("quoteForm");
  const formStatus = document.getElementById("formStatus");
  quoteForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateRequired(quoteForm)) {
      if (formStatus) formStatus.textContent = "Please fill in the required fields.";
      return;
    }

    const data = new FormData(quoteForm);
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Service: ${data.get("service") || ""}`,
      "",
      `Notes:`,
      `${data.get("message") || ""}`
    ].join("\n");

    if (formStatus) formStatus.textContent = "Opening your email app…";
    mailto("Quick quote request — Anvil Security", body);
  });

  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateRequired(contactForm)) {
      if (contactStatus) contactStatus.textContent = "Please fill in the required fields.";
      return;
    }

    const data = new FormData(contactForm);
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      "",
      `${data.get("message") || ""}`
    ].join("\n");

    if (contactStatus) contactStatus.textContent = "Opening your email app…";
    mailto("Website enquiry — Anvil Security", body);
  });
})();
