import Link from "next/link";
import { Suspense } from "react";
import SearchableGrid, { ProductBrowser } from "./SearchableGrid";
import { activeProducts, categories, isSoldOut, type Product } from "@/data/catalog";

// Shared page for "Shop all" and each collection: title, category tabs, grid (in-stock first, then sold out).
export default function Listing({ title, intro, current, products }: { title: string; intro: string; current: string | null; products: Product[] }) {
  const all = activeProducts();
  const tabs = [
    { href: "/shop", label: "All", slug: null as string | null, count: all.length },
    ...categories.map((c) => ({ href: `/collections/${c.slug}`, label: c.name, slug: c.slug as string | null, count: all.filter((p) => p.category === c.slug).length })),
  ];
  const sorted = [...products.filter((p) => !isSoldOut(p)), ...products.filter(isSoldOut)];
  return (
    <>
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-8 sm:pb-8 sm:pt-12">
          <h1 className="headline text-[40px] sm:text-6xl">{title}</h1>
          <p className="mt-3 max-w-xl text-[17px] text-muted sm:text-lg">{intro}</p>
          <nav aria-label="Categories" className="mt-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Link key={t.href} scroll={false} href={t.href} aria-current={t.slug === current ? "page" : undefined}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 text-[15px] font-semibold text-ink/80 transition-colors hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white">
                {t.label}<span className="text-xs font-bold opacity-60">{t.count}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <Suspense fallback={<ProductBrowser products={sorted} />}>
          <SearchableGrid products={sorted} />
        </Suspense>
      </div>
    </>
  );
}
