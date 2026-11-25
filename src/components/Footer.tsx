import Link from "next/link";
import { site } from "@/data/site";
import Logo from "./Logo";

const cols = [
  { title: "Shop", items: [["/shop", "Shop all"], ["/collections/fragrance", "Fragrance"], ["/collections/home-kitchen", "Home & kitchen"], ["/collections/appliance-parts", "Appliance parts"]] },
  { title: "Help", items: [["/contact", "Contact"], ["/shipping-policy", "Shipping"], ["/returns-policy", "Returns"], ["/conditions", "Condition guide"]] },
  { title: "Legal", items: [["/privacy-policy", "Privacy"], ["/terms", "Terms"]] },
] as const;

export default function Footer() {
  const socials = [
    site.ebayStoreUrl && { href: site.ebayStoreUrl, label: "eBay" },
    site.instagramHandle && { href: `https://www.instagram.com/${site.instagramHandle}`, label: "Instagram" },
    site.tiktokHandle && { href: `https://www.tiktok.com/@${site.tiktokHandle}`, label: "TikTok" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))] lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-white/70">{site.tagline}. Shipped from {site.shipsFrom}.</p>
          {socials.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-5">
              {socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline">{s.label}</a></li>)}
            </ul>
          )}
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-xs font-bold uppercase tracking-[.14em] text-signal">{c.title}</h2>
            <ul className="mt-3 space-y-0.5">
              {c.items.map(([href, label]) => (
                <li key={href}><Link href={href} className="inline-flex min-h-11 items-center text-sm text-white/85 hover:text-white hover:underline">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-white/60">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
