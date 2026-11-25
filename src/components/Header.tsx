"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { CloseIcon, MenuIcon } from "./Icons";

export const navLinks = [
  { href: "/shop", label: "Shop all" },
  { href: "/collections/fragrance", label: "Fragrance" },
  { href: "/collections/appliances", label: "Appliances" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ ebayStoreUrl }: { ebayStoreUrl: string | null }) {
  const pathname = usePathname();
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-h-11 items-center" aria-label="Home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="py-2 text-[15px] font-semibold text-ink/75 underline-offset-[10px] decoration-2 decoration-signal hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline">{l.label}</Link>
          ))}
          {ebayStoreUrl && <a href={ebayStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-10 !py-1.5 text-sm">eBay store</a>}
        </nav>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-card md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpenAt(open ? null : pathname)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-line bg-paper px-4 pb-4 md:hidden">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className="flex min-h-12 items-center border-b border-line py-3 text-lg font-bold">{l.label}</Link>
        ))}
        {ebayStoreUrl && <a href={ebayStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4 w-full">Visit our eBay store</a>}
      </nav>
    </header>
  );
}
