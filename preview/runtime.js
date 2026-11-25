/* Single-file preview runtime: hash routing between the real server-rendered pages, the mobile menu,
   and the shop-page search (same matching as SearchableGrid: ignores case, spaces and dashes). */
(function () {
  const D = window.__QS;
  const main = document.getElementById("main");
  const norm = (s) => String(s).toLowerCase().replace(/[\s\-_./]+/g, "");
  const fillArt = (root) => root.querySelectorAll("[data-art]").forEach((img) => { img.src = D.art[img.dataset.art] || ""; });
  fillArt(document);

  const menuBtn = document.querySelector('button[aria-controls="mobile-nav"]');
  const menu = document.getElementById("mobile-nav");
  const setMenu = (open) => { if (!menuBtn) return; menu.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  if (menuBtn) menuBtn.addEventListener("click", () => setMenu(menu.hidden));

  function wireSearch() {
    const input = main.querySelector('input[type="search"]');
    if (!input) return;
    const items = Array.from(main.querySelectorAll("ul.grid > li")).map((li) => ({ li, text: norm(li.textContent) }));
    const count = main.querySelector("[aria-live]");
    input.addEventListener("input", () => {
      const words = input.value.trim().split(/\s+/).map(norm).filter(Boolean);
      let n = 0;
      for (const { li, text } of items) { const show = words.every((w) => text.includes(w)); li.hidden = !show; if (show) n++; }
      if (count) count.textContent = `${n} ${n === 1 ? "item" : "items"}`;
    });
  }

  function route() {
    const h = location.hash.replace(/^#/, "") || "home";
    const html = D.pages[h] ?? D.pages["not-found"];
    main.innerHTML = html;
    fillArt(main);
    wireSearch();
    setMenu(false);
    document.querySelectorAll("header nav a, nav[aria-label=Categories] a").forEach((a) => {
      if (a.getAttribute("href") === "#" + h) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
