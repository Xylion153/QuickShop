import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConditionChip, Price, ProductGrid, ProductImage, StockChip, Todo } from "@/components/ProductBits";
import { ChatIcon, ChevronLeft, ExternalIcon, TruckIcon } from "@/components/Icons";
import { activeProducts, conditions, formatPrice, getCategory, getProduct, hasPhoto, isSoldOut } from "@/data/catalog";
import { policies, site } from "@/data/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return activeProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: `${p.condition ? `${conditions[p.condition].label}. ` : ""}${formatPrice(p.priceCents)}. ${p.description}`, openGraph: { images: [p.images[0]] } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const category = getCategory(p.category)!;
  const condition = p.condition ? conditions[p.condition] : null;
  const soldOut = isSoldOut(p);
  const askHref = `/contact?item=${encodeURIComponent(p.slug)}`;
  const related = activeProducts().filter((x) => x.category === p.category && x.slug !== p.slug && !isSoldOut(x)).slice(0, 4);

  // Without online checkout: eBay listing if there is one, otherwise ask the seller.
  const primary = soldOut
    ? { href: askHref, label: "Ask if more are coming", external: false }
    : p.ebayUrl
      ? { href: p.ebayUrl, label: "Buy on eBay", external: true }
      : { href: askHref, label: "Ask to buy this item", external: false };

  const cta = (className = "") =>
    primary.external
      ? <a href={primary.href} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${className}`}>{primary.label} <ExternalIcon /></a>
      : <Link href={primary.href} className={`btn ${soldOut ? "btn-dark" : "btn-primary"} ${className}`}>{primary.label}</Link>;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <Link href={`/collections/${category.slug}`} className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-muted hover:text-ink"><ChevronLeft /> {category.name}</Link>
        {p.sample && <div className="mt-2"><Todo>this is a sample listing. Replace it with a real item in <code>src/data/catalog.ts</code>.</Todo></div>}
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-4 md:grid-cols-2 md:gap-10">
        <div>
          <ProductImage product={p} eager className="rounded-2xl border border-line" />
          {!hasPhoto(p) && !p.sample && <p className="mt-2 text-sm text-muted">Illustration only.{p.ebayUrl && <> <a href={p.ebayUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-signal-ink underline">See photos on eBay</a></>}</p>}
          {p.images.length > 1 && (
            <ul className="swipe mt-3" aria-label="More photos">
              {p.images.slice(1).map((src) => <li key={src} className="w-24"><ProductImage product={p} src={src} className="rounded-xl border border-line" /></li>)}
            </ul>
          )}
        </div>

        <div>
          {p.brand && <p className="text-sm font-bold uppercase tracking-[.1em] text-muted">{p.brand}</p>}
          <h1 className="headline mt-1 text-3xl sm:text-4xl">{p.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2"><ConditionChip product={p} /><StockChip product={p} /></div>
          <div className="mt-5"><Price product={p} large /></div>
          {p.priceCheckedOn && <p className="mt-1 text-sm text-muted">eBay price as of {new Date(`${p.priceCheckedOn}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}. The listing shows today&apos;s price.</p>}

          <div className="mt-6 hidden gap-2 md:grid">
            {cta()}
            {!soldOut && p.ebayUrl && <Link href={askHref} className="btn btn-ghost"><ChatIcon /> Ask about this item</Link>}
          </div>
          {!site.checkoutEnabled && !soldOut && !p.ebayUrl && <p className="mt-3 text-sm text-muted">Online checkout is coming soon. Send a message and we&apos;ll arrange payment and shipping with you.</p>}

          <section className="card mt-6 p-5" aria-labelledby="cond">
            <h2 id="cond" className="font-bold">Condition: {condition ? condition.label : "see listing"}</h2>
            <p className="mt-1 text-[15px] text-muted">
              {condition
                ? <>{condition.description} <Link href="/conditions" className="font-semibold text-signal-ink underline">Condition guide</Link></>
                : p.ebayUrl ? <>The <a href={p.ebayUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-signal-ink underline">eBay listing</a> shows this item&apos;s condition and photos.</> : "Ask us about this item's condition."}
            </p>
            {p.conditionNotes && <p className="mt-3 border-t border-line pt-3 text-[15px]"><strong>Seller notes:</strong> {p.conditionNotes}</p>}
          </section>

          {p.specs.length > 0 && (
            <section className="mt-6" aria-labelledby="details">
              <h2 id="details" className="text-xl font-extrabold">Details</h2>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {p.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-3 py-3 text-[15px]"><dt className="text-muted">{s.label}</dt><dd className="font-semibold">{s.value}</dd></div>
                ))}
              </dl>
            </section>
          )}

          <p className="mt-6 leading-relaxed">{p.description}</p>

          {p.category === "fragrance" && (policies.authenticity
            ? <section className="mt-6"><h2 className="text-xl font-extrabold">About our fragrances</h2><p className="mt-2 leading-relaxed text-muted">{policies.authenticity}</p></section>
            : <div className="mt-6"><Todo>how fragrances are sourced and checked, in the owner&apos;s words (<code>policies.authenticity</code> in <code>src/data/site.ts</code>).</Todo></div>)}

          <p className="mt-6 flex items-center gap-2 text-[15px] text-muted"><TruckIcon /> Ships from {site.shipsFrom}. <Link href="/shipping-policy" className="font-semibold text-signal-ink underline">Shipping</Link></p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14" aria-labelledby="more">
          <h2 id="more" className="headline text-2xl sm:text-3xl">More {category.name.toLowerCase()}</h2>
          <div className="mt-5"><ProductGrid products={related} /></div>
        </section>
      )}

      <div className="mobile-bar-space" />
      <div className="mobile-bar flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-muted">{p.name}</p>
          <p className="text-lg font-extrabold">{formatPrice(p.priceCents)}</p>
        </div>
        {cta("shrink-0 !px-4")}
      </div>
    </>
  );
}
