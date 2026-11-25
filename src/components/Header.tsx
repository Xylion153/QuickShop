"use client";
import Link from "next/link";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { CloseIcon, MenuIcon, SearchIcon } from "./Icons";

export const navLinks = [
  { href: "/shop", label: "Shop all" },
  { href: "/collections/fragrance", label: "Fragrance" },
  { href: "/collections/home-kitchen", label: "Home & kitchen" },
  { href: "/collections/appliance-parts", label: "Parts" },
  { href: "/contact", label: "Contact" },
];

// Searches go to /shop?q=..., where the product grid filters by name, brand or part number.
function SearchForm({ id, inputRef, className = "" }: { id: string; inputRef?: React.Ref<HTMLInputElement>; className?: string }) {
  return (
    <Form action="/shop" role="search" className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">Search products or part numbers</label>
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
      <input ref={inputRef} id={id} name="q" type="search" placeholder="Search products or part #" enterKeyHint="search" autoComplete="off"
        className="h-11 w-full rounded-full border border-line bg-card pl-10 pr-4 text-base outline-none placeholder:text-muted focus:border-ink lg:text-[15px]" />
    </Form>
  );
}

export default function Header({ ebayStoreUrl }: { ebayStoreUrl: string | null }) {
  const pathname = usePathname();
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const mobileSearch = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const isCurrent = (href: string) => pathname === href || (href !== "/shop" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 lg:h-[72px] lg:gap-8">
        <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label="Quick Shop home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined}
              className="relative py-2 text-[15px] font-semibold text-ink/70 transition-colors hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-0 after:-bottom-[19px] after:h-0.5 after:bg-signal after:opacity-0 aria-[current=page]:after:opacity-100">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchForm id="search-desktop" className="hidden w-64 lg:block" />
          {ebayStoreUrl && <a href={ebayStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark hidden !min-h-11 !rounded-full !px-5 !py-2 text-sm lg:inline-flex">eBay store</a>}
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card lg:hidden" aria-label="Search"
            onClick={() => { setOpenAt(pathname); requestAnimationFrame(() => mobileSearch.current?.focus()); }}>
            <SearchIcon className="h-5 w-5" />
          </button>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpenAt(open ? null : pathname)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-line bg-paper px-4 pb-5 pt-4 lg:hidden">
        <SearchForm id="search-mobile" inputRef={mobileSearch} />
        <div className="mt-2">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined} className="flex min-h-12 items-center border-b border-line py-3 text-lg font-bold aria-[current=page]:text-signal-ink">{l.label}</Link>
          ))}
        </div>
        {ebayStoreUrl && <a href={ebayStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-5 w-full">Visit our eBay store</a>}
      </nav>
    </header>
  );
}
