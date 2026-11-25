/* Single-file preview runtime: hash routing between the real server-rendered pages, the mobile menu, and the
   shop-page search / sort / appliance filter (same rules as SearchableGrid: ignores case, spaces and dashes). */
(function () {
  const D = window.__QS;
  const main = document.getElementById("main");
  const norm = (s) => String(s).toLowerCase().replace(/[\s\-_./]+/g, "");
  const hashOf = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-"));
  const fillArt = (root) => root.querySelectorAll("[data-art]").forEach((img) => { img.src = D.art[img.dataset.art] || ""; });
  fillArt(document);

  const menuBtn = document.querySelector('button[aria-controls="mobile-nav"]');
  const menu = document.getElementById("mobile-nav");
  const setMenu = (open) => { if (!menuBtn) return; menu.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  if (menuBtn) menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  const searchBtn = document.querySelector('header button[aria-label="Search"]');
  if (searchBtn) searchBtn.addEventListener("click", () => { setMenu(true); const i = document.getElementById("search-mobile"); if (i) i.focus(); });

  // Search forms (header, part finder) go to a shop page with the query filled in.
  let pendingQ = null;
  document.addEventListener("submit", (e) => {
    const form = e.target.closest('form[role="search"]');
    if (!form) return;
    e.preventDefault();
    pendingQ = (new FormData(form).get("q") || "").toString();
    const target = "#" + hashOf(form.getAttribute("action") || "/shop");
    if (location.hash === target) applyPending(); else location.hash = target;
  });

  let apply = null;
  function applyPending() {
    const input = main.querySelector('input[type="search"]');
    if (pendingQ !== null && input) { input.value = pendingQ; pendingQ = null; if (apply) apply(); }
  }

  function wireBrowser() {
    apply = null;
    const input = main.querySelector('input[type="search"]');
    const list = main.querySelector("ul.grid");
    if (!input || !list) return;
    const sort = main.querySelector("select");
    const chips = Array.from(main.querySelectorAll('[aria-label="Filter by appliance"] button'));
    const count = main.querySelector("[aria-live]");
    const items = Array.from(list.children).map((li) => ({ li, text: norm(li.textContent), price: +li.dataset.price, order: +li.dataset.order, appliance: li.dataset.appliance || "" }));
    let appliance = "";
    apply = () => {
      const words = input.value.trim().split(/\s+/).map(norm).filter(Boolean);
      const mode = sort ? sort.value : "featured";
      const sorted = [...items].sort((a, b) => (mode === "price-asc" ? a.price - b.price : mode === "price-desc" ? b.price - a.price : a.order - b.order));
      let n = 0;
      for (const it of sorted) {
        const show = words.every((w) => it.text.includes(w)) && (!appliance || it.appliance === appliance);
        it.li.hidden = !show; if (show) n++;
        list.appendChild(it.li);
      }
      if (count) count.textContent = `${n} ${n === 1 ? "item" : "items"}`;
    };
    input.addEventListener("input", apply);
    if (sort) sort.addEventListener("change", apply);
    chips.forEach((c) => c.addEventListener("click", () => {
      appliance = c.textContent === "All appliances" ? "" : c.textContent;
      chips.forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
      apply();
    }));
  }

  function route() {
    const h = location.hash.replace(/^#/, "") || "home";
    main.innerHTML = D.pages[h] ?? D.pages["not-found"];
    fillArt(main);
    wireBrowser();
    applyPending();
    setMenu(false);
    document.querySelectorAll("header nav a, nav[aria-label=Categories] a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === "#" + h || (href !== "#shop" && href !== "#home" && h.startsWith(href.slice(1) + "-"))) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
