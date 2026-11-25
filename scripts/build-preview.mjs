// Builds a single-file, phone-friendly preview of the storefront from the REAL server-rendered pages
// (adapted from the scoops store). Every page becomes a #hash view in one HTML file; art and fonts are inlined.
// Usage: npm run build && npm run start -- -p 3100, then (in another terminal): npm run preview:build
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = process.env.PREVIEW_BASE ?? "http://localhost:3100";
const OUT = process.env.PREVIEW_OUT ?? path.join(ROOT, "preview", "dist", "index.html");

// Every public page, from the site's own sitemap, plus the 404 page.
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, u]) => new URL(u).pathname.replace(/\/$/, "") || "/");
routes.push("/__preview-not-found");
const hashOf = (r) => (r === "/" ? "home" : r === "/__preview-not-found" ? "not-found" : r.slice(1).replace(/\//g, "-"));
const known = new Set(routes.map(hashOf));

const clean = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<template[\s\S]*?<\/template>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<link[^>]*>/g, "")
    .replace(/src="\/art\//g, 'data-art="/art/')
    .replace(/\ssrcSet="[^"]*"/gi, "")
    .replace(/href="(\/[^"#?]*)(\?[^"]*)?"/g, (m, p) => { const h = hashOf(p.replace(/\/$/, "") || "/"); return known.has(h) ? `href="#${h}"` : m; });

const between = (s, startTag, endTag, inner = false) => {
  const a = s.indexOf(startTag); if (a < 0) throw new Error(`missing ${startTag}`);
  const b = s.lastIndexOf(endTag); if (b < a) throw new Error(`missing ${endTag}`);
  return inner ? s.slice(s.indexOf(">", a) + 1, b) : s.slice(a, b + endTag.length);
};
const dataUri = (file, type) => `data:${type};base64,${fs.readFileSync(file).toString("base64")}`;

const pages = {};
let home = "";
for (const r of routes) {
  const res = await fetch(BASE + r);
  if (r !== "/__preview-not-found" && !res.ok) throw new Error(`${r} -> ${res.status}`);
  const html = await res.text();
  if (r === "/") home = html;
  pages[hashOf(r)] = clean(between(html, '<main id="main"', "</main>", true));
}

const htmlClass = home.match(/<html[^>]*class="([^"]+)"/)?.[1] ?? "";
const bodyClass = home.match(/<body[^>]*class="([^"]+)"/)?.[1] ?? "";
const header = clean(between(home, "<header", "</header>"));
const footer = clean(between(home, "<footer", "</footer>"));

let css = "";
for (const [, href] of home.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/g)) {
  const file = path.join(ROOT, ".next", href.replace(/^\/_next\//, ""));
  css += fs.readFileSync(file, "utf8").replace(/url\(([^)]+\.woff2)\)/g, (_m, u) => {
    const c = u.replace(/['"]/g, "");
    const f = c.startsWith("/_next/") ? path.join(ROOT, ".next", c.replace(/^\/_next\//, "")) : path.resolve(path.dirname(file), c);
    return `url(${dataUri(f, "font/woff2")})`;
  });
}
if (!css) throw new Error("no stylesheet found");

const art = {};
for (const f of fs.readdirSync(path.join(ROOT, "public", "art"), { recursive: true })) {
  if (f.endsWith(".svg")) art[`/art/${f.split(path.sep).join("/")}`] = dataUri(path.join(ROOT, "public", "art", f), "image/svg+xml");
}
// Fail loudly if a page uses art that wasn't bundled (it would show as a blank tile).
for (const [, a] of Object.values(pages).join("").matchAll(/data-art="([^"]+)"/g)) if (!art[a]) throw new Error(`missing art ${a}`);

const json = JSON.stringify({ pages, art }).replace(/</g, "\\u003c");
const runtime = fs.readFileSync(path.join(ROOT, "preview", "runtime.js"), "utf8");
const notice = "Preview of the storefront · not live yet · buttons to eBay open the real listings";
const out = `<!DOCTYPE html>
<html lang="en" class="${htmlClass}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Quick Shop preview</title><style>${css}</style></head>
<body class="${bodyClass}">
<p style="margin:0;background:#15171c;color:#fff;text-align:center;font:600 12px/1.4 system-ui,sans-serif;padding:7px 12px">${notice}</p>
${header}<main id="main" class="flex-1"></main>${footer}
<script>window.__QS=${json};</script><script>${runtime}</script></body></html>`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log(`preview written: ${OUT} (${(out.length / 1024).toFixed(0)} KB, ${Object.keys(pages).length} pages)`);
