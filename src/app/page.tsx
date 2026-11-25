import Link from "next/link";
import { ProductGrid, Todo } from "@/components/ProductBits";
import { ArrowRight, ChatIcon, TagIcon, TruckIcon } from "@/components/Icons";
import { activeProducts, categories, inCategory } from "@/data/catalog";
import { site } from "@/data/site";

export default function Home() {
  const all = activeProducts();
  const featured = all.filter((p) => p.featured && p.quantity > 0).slice(0, 4);
  const latest = all.filter((p) => !featured.includes(p)).slice(0, 8);
  const hasSamples = all.some((p) => p.sample);

  const howToBuy = [
    { icon: TagIcon, title: "Every item, described", text: "Each listing shows its condition, what's included and how many are left." },
    site.ebayStoreUrl
      ? { icon: ArrowRight, title: "Buy on eBay", text: "Items that are also on eBay have a button straight to the listing." }
      : { icon: ArrowRight, title: "Buy your way", text: "Online checkout is on the way. For now, ask about any item and we'll sort it out." },
    { icon: ChatIcon, title: "Questions? Just ask", text: "Every product page has an \"Ask about this item\" button." },
    { icon: TruckIcon, title: `Ships from ${site.shipsFrom}`, text: site.processingTime ?? "Shipping details are on the shipping page." },
  ];

  return (
    <>
      {hasSamples && (
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <Todo>this store is showing sample listings. Replace them with real items in <code>src/data/catalog.ts</code>.</Todo>
        </div>
      )}

      <section className="stripes border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-8 md:grid-cols-[1.15fr_.85fr] md:items-center md:pb-16 md:pt-14">
          <div>
            <p className="eyebrow">Shipped from {site.shipsFrom}</p>
            <h1 className="headline mt-3 text-[52px] sm:text-7xl">Cologne.<br />Appliances.<br /><span className="text-signal">Quick.</span></h1>
            <p className="mt-5 max-w-md text-lg text-muted">Fragrance and home appliances, resold. Every listing shows the real condition, what&apos;s in the box and how many are left.</p>
            <div className="mt-7 grid gap-3 sm:flex">
              <Link href="/shop" className="btn btn-primary">Shop all items <ArrowRight /></Link>
              {site.ebayStoreUrl
                ? <a href={site.ebayStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">See our eBay store</a>
                : <Link href="/conditions" className="btn btn-ghost">Condition guide</Link>}
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className={`tile-${c.slug} product-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line`}>
                  <img src={c.art} alt="" width={300} height={300} loading="eager" className="aspect-square w-full object-contain p-2" />
                  <span className="flex items-center justify-between gap-2 bg-card px-4 py-3">
                    <span>
                      <span className="block text-lg font-extrabold">{c.name}</span>
                      <span className="block text-sm text-muted">{inCategory(c.slug).length} items</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-signal transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12" aria-labelledby="featured">
          <div className="flex items-end justify-between gap-4">
            <div><p className="eyebrow">Picked for you</p><h2 id="featured" className="headline mt-2 text-3xl sm:text-4xl">Featured</h2></div>
          </div>
          <div className="mt-6"><ProductGrid products={featured} eagerFirst={2} /></div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pt-14" aria-labelledby="how">
        <h2 id="how" className="headline text-3xl sm:text-4xl">How buying works</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {howToBuy.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card flex gap-4 p-5 lg:block">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-signal-soft text-signal-ink"><Icon className="h-5 w-5" /></span>
              <div><h3 className="font-bold lg:mt-4">{title}</h3><p className="mt-1 text-[15px] text-muted">{text}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14" aria-labelledby="latest">
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow">Fresh in</p><h2 id="latest" className="headline mt-2 text-3xl sm:text-4xl">Just added</h2></div>
          <Link href="/shop" className="inline-flex min-h-11 items-center gap-1 font-bold text-signal-ink hover:underline">See all <ArrowRight /></Link>
        </div>
        <div className="mt-6"><ProductGrid products={latest} /></div>
      </section>
    </>
  );
}
