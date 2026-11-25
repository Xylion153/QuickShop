import Link from "next/link";
import Form from "next/form";
import { ProductGrid, Todo } from "@/components/ProductBits";
import { ArrowRight, BoxIcon, ChatIcon, SearchIcon, StarIcon, TagIcon, TruckIcon } from "@/components/Icons";
import { activeProducts, categories, inCategory, isSoldOut } from "@/data/catalog";
import { site } from "@/data/site";

export default function Home() {
  const all = activeProducts();
  const featured = all.filter((p) => p.featured && !isSoldOut(p)).slice(0, 4);
  const latest = all.filter((p) => !featured.includes(p) && !isSoldOut(p)).slice(0, 8);
  const hasSamples = all.some((p) => p.sample);
  const partsCount = inCategory("appliance-parts").length;
  const stats = site.ebayStats;

  const trust = [
    stats && { icon: StarIcon, big: stats.feedbackPercent, small: "positive feedback on eBay" },
    stats && { icon: BoxIcon, big: stats.itemsSold, small: "items sold on eBay" },
    { icon: TruckIcon, big: site.shipsFrom, small: "where orders ship from" },
  ].filter(Boolean) as { icon: typeof StarIcon; big: string; small: string }[];

  const howToBuy = [
    { icon: SearchIcon, title: "Find it fast", text: "Search any shop page by name, brand or part number." },
    site.ebayStoreUrl
      ? { icon: TagIcon, title: "Buy on eBay", text: "Items listed on eBay have a button straight to the listing, with eBay checkout." }
      : { icon: TagIcon, title: "Buy your way", text: "Online checkout is on the way. For now, ask about any item and we'll sort it out." },
    { icon: ChatIcon, title: "Questions? Just ask", text: "Every product page has an “Ask about this item” button." },
    { icon: TruckIcon, title: `Ships from ${site.shipsFrom}`, text: site.processingTime ?? "Packed and shipped by us. Details are on the shipping page." },
  ];

  return (
    <>
      {hasSamples && <Todo className="mx-4 mt-4 xl:mx-auto xl:max-w-6xl">this store is showing sample listings. Replace them with real items in <code>src/data/catalog.ts</code>.</Todo>}

      {/* ---------- hero ---------- */}
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-12 text-center sm:pb-14 sm:pt-20">
          <h1 className="headline text-[52px] sm:text-7xl lg:text-[84px]">Cologne. Appliances. <span className="text-signal">Quick.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">Fragrance, home appliances and replacement parts, resold and shipped from {site.shipsFrom}. Buy straight from our eBay listings.</p>
          <Form action="/shop" role="search" className="mx-auto mt-8 flex max-w-xl flex-col gap-2.5 sm:flex-row sm:rounded-full sm:border sm:border-line sm:bg-paper sm:p-1.5 sm:shadow-[0_12px_30px_-18px_rgba(21,23,28,.35)]">
            <label htmlFor="hero-q" className="sr-only">Search products or part numbers</label>
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input id="hero-q" name="q" type="search" placeholder={partsCount > 0 ? "Search products or part numbers" : "Search products"} enterKeyHint="search" autoComplete="off"
                className="h-13 w-full rounded-full border border-line bg-paper pl-12 pr-4 text-base outline-none placeholder:text-muted focus:border-ink sm:h-12 sm:border-0 sm:bg-transparent" />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </Form>
          <p className="mt-4 text-sm text-muted">
            or browse{" "}
            {categories.map((c, i) => (
              <span key={c.slug}>{i > 0 && (i === categories.length - 1 ? " and " : ", ")}<Link href={`/collections/${c.slug}`} className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">{c.name.toLowerCase()}</Link></span>
            ))}
          </p>
        </div>
        {/* trust row: real numbers from the eBay store (site.ebayStats) */}
        <ul className="mx-auto grid max-w-6xl grid-cols-1 border-t border-line sm:grid-cols-3">
          {trust.map(({ icon: Icon, big, small }) => (
            <li key={small} className="flex items-center gap-4 border-b border-line px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:py-5 sm:last:border-r-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-signal-soft text-signal-ink"><Icon className="h-5 w-5" /></span>
              <p className="leading-tight"><span className="block text-xl font-extrabold tracking-tight">{big}</span><span className="text-sm text-muted">{small}</span></p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- categories ---------- */}
      <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16" aria-labelledby="cats">
        <h2 id="cats" className="headline text-3xl sm:text-4xl">Shop by category</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/collections/${c.slug}`} className="product-card group relative flex overflow-hidden rounded-2xl border border-line bg-card sm:block">
                <img src={c.art} alt="" width={600} height={600} loading="lazy" className="aspect-square w-28 shrink-0 object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:w-full" />
                <span className="flex flex-1 items-center justify-between gap-3 px-4 py-4 sm:px-5">
                  <span>
                    <span className="block text-lg font-extrabold">{c.name}</span>
                    <span className="mt-0.5 block text-sm text-muted">{inCategory(c.slug).length} items</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-ink transition-colors group-hover:bg-signal group-hover:text-white"><ArrowRight /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20" aria-labelledby="featured">
          <div className="flex items-end justify-between gap-4">
            <h2 id="featured" className="headline text-3xl sm:text-4xl">Featured</h2>
            <Link href="/shop" className="inline-flex min-h-11 items-center gap-1 font-bold text-signal-ink hover:underline">Shop all <ArrowRight /></Link>
          </div>
          <div className="mt-6"><ProductGrid products={featured} /></div>
        </section>
      )}

      {/* ---------- how buying works ---------- */}
      <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20" aria-labelledby="how">
        <h2 id="how" className="headline text-3xl sm:text-4xl">How buying works</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {howToBuy.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 bg-card p-5 lg:block lg:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ink"><Icon className="h-5 w-5" /></span>
              <div><h3 className="font-bold lg:mt-5">{title}</h3><p className="mt-1 text-[15px] leading-relaxed text-muted">{text}</p></div>
            </li>
          ))}
        </ul>
      </section>

      {latest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20" aria-labelledby="latest">
          <div className="flex items-end justify-between gap-4">
            <h2 id="latest" className="headline text-3xl sm:text-4xl">Just added</h2>
            <Link href="/shop" className="inline-flex min-h-11 items-center gap-1 font-bold text-signal-ink hover:underline">See all <ArrowRight /></Link>
          </div>
          <div className="mt-6"><ProductGrid products={latest} /></div>
        </section>
      )}

      {/* ---------- eBay band ---------- */}
      {site.ebayStoreUrl && (
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
          <div className="flex flex-col items-start gap-5 rounded-[1.75rem] border border-line bg-card px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Also on eBay</h2>
              <p className="mt-1 max-w-md text-muted">
                {stats ? <>{stats.feedbackPercent} positive feedback across {stats.itemsSold} items sold. </> : null}
                Follow the store for new listings.
              </p>
            </div>
            <a href={site.ebayStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark shrink-0">Visit our eBay store</a>
          </div>
        </section>
      )}
    </>
  );
}
