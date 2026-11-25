import Link from "next/link";
import SearchableGrid from "./SearchableGrid";
import { categories, isSoldOut, type Product } from "@/data/catalog";

// Shared page for "Shop all" and each collection: title, category tabs, grid (in-stock first, then sold out).
export default function Listing({ title, intro, current, products }: { title: string; intro: string; current: string | null; products: Product[] }) {
  const tabs = [{ href: "/shop", label: "All", slug: null as string | null }, ...categories.map((c) => ({ href: `/collections/${c.slug}`, label: c.name, slug: c.slug as string | null }))];
  const sorted = [...products.filter((p) => !isSoldOut(p)), ...products.filter(isSoldOut)];
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-8 sm:pt-12">
          <h1 className="headline text-5xl sm:text-6xl">{title}</h1>
          <p className="mt-3 max-w-xl text-lg text-muted">{intro}</p>
          <nav aria-label="Categories" className="mt-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Link key={t.href} scroll={false} href={t.href} aria-current={t.slug === current ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-ink px-5 text-[15px] font-bold aria-[current=page]:bg-ink aria-[current=page]:text-white">
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <SearchableGrid products={sorted} />
      </div>
    </>
  );
}
