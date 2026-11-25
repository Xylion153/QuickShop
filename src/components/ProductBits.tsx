import Link from "next/link";
import type { ReactNode } from "react";
import { conditions, formatPrice, isSoldOut, type Product } from "@/data/catalog";

export function ConditionChip({ product }: { product: Product }) {
  if (!product.condition) return null;
  const c = conditions[product.condition];
  return <span className={`chip chip-${c.tone}`}>{c.label}</span>;
}

export function StockChip({ product }: { product: Product }) {
  if (product.quantity === null) return null;
  if (product.quantity === 0) return <span className="chip chip-out">Sold out</span>;
  if (product.quantity === 1) return <span className="chip chip-neutral">Only 1 left</span>;
  return <span className="chip chip-neutral">{product.quantity} in stock</span>;
}

export function Price({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <p className="flex items-baseline gap-2">
      <span className={`font-extrabold tracking-tight tabular-nums ${large ? "text-4xl" : "text-lg"}`}>{formatPrice(product.priceCents)}</span>
      {product.retailCents && (
        <span className={`text-muted line-through ${large ? "text-lg" : "text-sm"}`}>
          <span className="sr-only">Retail price </span>{formatPrice(product.retailCents)}
        </span>
      )}
    </p>
  );
}

// Product photo, or the illustration, filling a square. Illustrations carry their own studio backdrop.
export function ProductImage({ product, src, eager = false, className = "" }: { product: Product; src?: string; eager?: boolean; className?: string }) {
  return (
    <div className={`tile-${product.category} relative aspect-square overflow-hidden ${className}`}>
      <img src={src ?? product.images[0]} alt={product.name} width={600} height={600} loading={eager ? "eager" : "lazy"} decoding="async"
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${isSoldOut(product) ? "opacity-50 grayscale" : ""}`} />
    </div>
  );
}

// The brand is shown above the name only when the name doesn't already start with it.
const brandLine = (p: Product) => (p.brand && !p.name.toLowerCase().startsWith(p.brand.toLowerCase()) ? p.brand : null);
const applianceOf = (p: Product) => p.specs.find((s) => s.label === "Appliance")?.value ?? "";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const brand = brandLine(product);
  return (
    <article className="product-card group card relative flex h-full flex-col overflow-hidden">
      <ProductImage product={product} eager={eager} />
      {isSoldOut(product) && <span className="chip chip-out absolute left-3 top-3">Sold out</span>}
      <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:p-4">
        {brand && <p className="text-xs font-semibold text-muted">{brand}</p>}
        <h3 className="text-[15px] font-semibold leading-snug sm:text-base">
          {/* the whole card is the link */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">{product.name}</Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-1.5">
          <Price product={product} />
          {product.ebayUrl ? <span className="text-xs font-semibold text-muted">on eBay</span> : <ConditionChip product={product} />}
        </div>
        {product.sample && <p className="text-[11px] font-medium uppercase tracking-wider text-muted/80">Sample listing</p>}
      </div>
    </article>
  );
}

export function ProductGrid({ products, eagerFirst = 0 }: { products: Product[]; eagerFirst?: number }) {
  if (products.length === 0) return <p className="card p-6 text-muted">Nothing here yet. Check back soon.</p>;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {products.map((p, i) => (
        // data-* let the single-file preview sort and filter the same way the live page does
        <li key={p.slug} data-price={p.priceCents} data-order={i} data-appliance={applianceOf(p)}><ProductCard product={p} eager={i < eagerFirst} /></li>
      ))}
    </ul>
  );
}

// Owner to-do note: what's still missing (policy text, real listings...). Shown while building the site
// (npm run dev, or NEXT_PUBLIC_SHOW_TODOS=1). A production build shows `fallback` instead, or nothing,
// so customers never see notes meant for the owner.
const showTodos = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_TODOS === "1";
export function Todo({ children, fallback = null, className = "" }: { children: ReactNode; fallback?: ReactNode; className?: string }) {
  if (!showTodos) return fallback;
  return <p role="note" className={`todo ${className}`}><strong>To fill in:</strong> {children}</p>;
}
