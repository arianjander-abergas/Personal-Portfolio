(function () {
  "use strict";

  const C = CONTENT;
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const isUrl = (s) => /^(https?:\/\/|assets\/)/i.test(s || "");
  const ext = (url) => (/^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Render content ---------- */
  document.title = `${C.name} | Portfolio`;
  /* ---------- Top-left badge: view counter (falls back to initials) ---------- */
  const brand = $("brand");
  const showInitials = () => {
    brand.classList.remove("nav__brand--views");
    brand.textContent = C.initials;
    brand.setAttribute("aria-label", "Home");
    brand.removeAttribute("title");
  };
  const vc = C.viewCounter;
  if (!vc || !vc.namespace) {
    showInitials();
  } else {
    brand.classList.add("nav__brand--views");
    brand.title = "Site views";
    brand.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
      '<path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<circle cx="12" cy="12" r="3.2" fill="currentColor"/></svg>' +
      '<span id="viewCount">…</span><small>views</small>';
    // A visit is counted once per browser session, so refreshing does not inflate the number.
    // Local previews (localhost or a file opened from disk) only read the count and never add to it.
    const isLocal = /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname);
    let counted = false;
    try {
      counted = sessionStorage.getItem("viewCounted") === "1";
    } catch (e) {
      /* storage unavailable: fall through and count the visit */
    }
    const action = isLocal || counted ? "get" : "hit";
    const url = `https://abacus.jasoncameron.dev/${action}/${encodeURIComponent(vc.namespace)}/${encodeURIComponent(vc.key || "views")}`;
    fetch(url)
      .then((r) => (r.status === 404 ? { value: 0 } : r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        const total = Math.max(0, Number(d.value) || 0);
        if (action === "hit") {
          try {
            sessionStorage.setItem("viewCounted", "1");
          } catch (e) {
            /* ignore */
          }
        }
        const out = $("viewCount");
        brand.setAttribute("aria-label", `Home. ${total.toLocaleString()} site views`);
        if (reduceMotion || total < 2) {
          out.textContent = total.toLocaleString();
          return;
        }
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 900);
          out.textContent = Math.round(total * (1 - Math.pow(1 - t, 3))).toLocaleString();
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      })
      .catch(showInitials); // counter service unreachable: show the initials rather than a broken badge
  }
  $("heroEyebrow").textContent = C.hero.eyebrow;
  const hint = C.nameHint;
  if (hint && hint.target && C.name.includes(hint.target)) {
    const at = C.name.indexOf(hint.target);
    $("heroName").innerHTML =
      esc(C.name.slice(0, at)) +
      `<span class="hint" tabindex="0" aria-describedby="nameHint">${esc(hint.target)}` +
      `<span class="hint__balloon" id="nameHint" role="tooltip">${esc(hint.text)}</span></span>` +
      esc(C.name.slice(at + hint.target.length));
    // Tap support: hover and keyboard focus are handled in CSS.
    const hintEl = document.querySelector(".hint");
    hintEl.addEventListener("click", (e) => {
      e.stopPropagation();
      hintEl.classList.toggle("is-open");
    });
    document.addEventListener("click", () => hintEl.classList.remove("is-open"));
    document.addEventListener("keydown", (e) => e.key === "Escape" && hintEl.classList.remove("is-open"));
  } else {
    $("heroName").textContent = C.name;
  }

  /* ---------- Theme: colour comic / black-and-white comic ---------- */
  const root = document.documentElement;
  const themeBtn = $("themeToggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const applyTheme = (dark) => {
    root.dataset.theme = dark ? "dark" : "light";
    const label = dark ? "Switch to colour mode" : "Switch to black and white mode";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", label);
    themeBtn.title = label;
    if (themeMeta) themeMeta.content = dark ? "#0b0b0b" : "#1d68f0";
  };
  applyTheme(root.dataset.theme === "dark");
  themeBtn.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    applyTheme(dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      /* storage unavailable: the choice just won't be remembered */
    }
  });
  $("heroRole").textContent = C.hero.role;
  $("heroTagline").textContent = C.hero.tagline;
  // Resume button, to the right of "Contact me"
  if (C.contact.resume) {
    document
      .querySelector(".hero__actions")
      .insertAdjacentHTML(
        "beforeend",
        `<a class="btn btn--accent" href="${esc(C.contact.resume)}" target="_blank" rel="noopener">Resume</a>`
      );
  }

  // With a photo: a comic panel (ink frame, halftone shadow, caption box and a small burst).
  // Without one: the initials on a halftone card.
  if (C.about.photo) {
    $("aboutPhoto").classList.add("has-photo");
    $("aboutPhoto").innerHTML =
      `<div class="about__frame"><img src="${esc(C.about.photo)}" alt="Photo of ${esc(C.name)}"></div>` +
      (C.about.photoCaption ? `<span class="about__caption">${esc(C.about.photoCaption)}</span>` : "") +
      `<span class="about__burst" aria-hidden="true">!</span>`;
  } else {
    $("aboutPhoto").innerHTML = `<span aria-hidden="true">${esc(C.initials)}</span>`;
  }
  $("aboutText").innerHTML = C.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("education").innerHTML = C.about.education
    .map((e) => `<li><time>${esc(e.years)}</time><h4>${esc(e.school)}</h4><p>${esc(e.detail)}</p></li>`)
    .join("");

  $("skillGroups").innerHTML = C.skills
    .map(
      (g) => `<article class="skill-card reveal">
        <h3 class="label">${esc(g.group)}</h3>
        <ul class="chips">${g.items.map((i) => `<li class="chip">${esc(i)}</li>`).join("")}</ul>
      </article>`
    )
    .join("");

  // Project visuals: one screenshot in a browser window, or up to three as fanned phones. Each opens the viewer.
  const projectMedia = (p) => {
    const shots = p.shots || [];
    if (!shots.length) return "";
    const shot = (sh, cls) =>
      `<button class="${cls}" type="button" data-full="${esc(sh.src)}" data-caption="${esc(`${p.title}: ${sh.caption}`)}" aria-label="View screenshot: ${esc(sh.caption)}">
         <img src="${esc(sh.src)}" alt="${esc(`${p.title}, ${sh.caption}`)}" loading="lazy">
       </button>`;
    const inner =
      p.device === "phone"
        ? `<div class="phones">${shots.slice(0, 3).map((sh) => shot(sh, "phone")).join("")}</div>`
        : shot(shots[0], "browser");
    return `<div class="project__media">${inner}${
      p.sticker ? `<span class="project__sticker" aria-hidden="true">${esc(p.sticker)}</span>` : ""
    }</div>`;
  };
  $("projectList").innerHTML = C.projects
    .map((p, i) => {
      const media = projectMedia(p);
      return `<article class="project reveal${media ? " has-media" : ""}">
        ${media}
        <div class="project__body">
          <div class="project__meta"><span>${String(i + 1).padStart(2, "0")}</span><span>${esc(p.type)} · ${esc(p.year)}</span></div>
          <h3>${esc(p.title)}</h3>
          <p class="project__desc">${esc(p.description)}</p>
          <p class="project__role"><strong>Role:</strong> ${esc(p.role)}</p>
          <ul class="chips">${p.tech.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
          ${p.highlights.length ? `<ul class="project__hl">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
          ${
            p.links.length
              ? `<div class="project__links">${p.links
                  .map((l) => `<a class="link" href="${esc(l.url)}"${ext(l.url)}>${esc(l.label)}</a>`)
                  .join("")}</div>`
              : ""
          }
        </div>
      </article>`;
    })
    .join("");

  // One card per certificate. Cards with an image get a thumbnail that opens the full-size viewer.
  const certCard = (a) => `<li class="achievement reveal${a.image ? " has-image" : ""}">
      ${
        a.image
          ? `<button class="achievement__thumb" type="button" data-full="${esc(a.image)}" data-caption="${esc(a.title)}" aria-label="View certificate: ${esc(a.title)}">
               <img src="${esc(a.image)}" alt="" loading="lazy">
             </button>`
          : ""
      }
      <div class="achievement__body">
        <div class="achievement__meta">
          <span class="badge">${esc(a.kind)}</span>
          <span class="achievement__date">${esc(a.date)}</span>
        </div>
        <h3>${esc(a.title)}</h3>
        <p class="achievement__issuer">${esc(a.issuer)}</p>
        ${isUrl(a.link) ? `<a class="link" href="${esc(a.link)}"${ext(a.link)}>Verify</a>` : ""}
      </div>
    </li>`;
  $("achievementList").innerHTML = C.achievements.map(certCard).join("");
  const seminars = C.seminars || [];
  $("seminarList").innerHTML = seminars.map(certCard).join("");
  if (!seminars.length) $("seminarCol").hidden = true;

  /* ---------- Picture viewer (certificates and project screenshots) ---------- */
  const lightbox = $("lightbox");
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-full]");
    if (!thumb) return;
    if (!lightbox.showModal) return window.open(thumb.dataset.full, "_blank", "noopener");
    $("lightboxImg").src = thumb.dataset.full;
    $("lightboxImg").alt = thumb.dataset.caption;
    $("lightboxCap").textContent = thumb.dataset.caption;
    lightbox.showModal();
  });
  // clicking the dark area around the picture closes it (Esc and the X button also work)
  lightbox.addEventListener("click", (e) => e.target === lightbox && lightbox.close());

  $("contactBlurb").textContent = C.contact.blurb;
  $("contactActions").innerHTML =
    `<a class="btn btn--primary" href="mailto:${esc(C.contact.email)}">${esc(C.contact.email)}</a>` +
    (C.contact.resume
      ? `<a class="btn btn--ghost" href="${esc(C.contact.resume)}" target="_blank" rel="noopener">View resume</a>
         <a class="btn btn--ghost" href="${esc(C.contact.resume)}" download>Download PDF</a>`
      : "");
  // Links still holding a [PLACEHOLDER] are hidden so no dead link is ever shown.
  $("contactLinks").innerHTML = C.contact.links
    .filter((l) => isUrl(l.url))
    .map((l) => `<li><a class="link" href="${esc(l.url)}"${ext(l.url)}>${esc(l.label)}</a></li>`)
    .join("");

  $("footerText").textContent = `© ${new Date().getFullYear()} ${C.name}`;

  /* ---------- Mobile menu ---------- */
  const toggle = $("navToggle");
  const links = $("navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  window.addEventListener("resize", () => window.innerWidth > 800 && setMenu(false));

  /* ---------- Scroll: nav state, progress bar, back-to-top ---------- */
  const nav = $("nav");
  const progress = $("progress");
  const toTop = $("toTop");
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle("is-scrolled", y > 20);
    toTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- Active nav link ---------- */
  const navAnchors = [...links.querySelectorAll("a")];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const siblings = [...en.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
          en.target.style.transitionDelay = `${Math.min(siblings.indexOf(en.target), 5) * 80}ms`;
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Pointer effects (mouse only) ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const hero = $("home");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
    });

    document.querySelectorAll(".project").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transitionDelay = "0ms";
        card.style.setProperty("--px", `${x * 100}%`);
        card.style.setProperty("--py", `${y * 100}%`);
        card.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
        card.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }
})();
