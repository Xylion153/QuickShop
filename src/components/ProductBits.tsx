import Link from "next/link";
import type { ReactNode } from "react";
import { conditions, formatPrice, type Product } from "@/data/catalog";

export function ConditionChip({ product }: { product: Product }) {
  const c = conditions[product.condition];
  return <span className={`chip chip-${c.tone}`}>{c.label}</span>;
}

export function StockChip({ product }: { product: Product }) {
  if (product.quantity === 0) return <span className="chip chip-out">Sold out</span>;
  if (product.quantity === 1) return <span className="chip chip-neutral">Only 1 left</span>;
  return <span className="chip chip-neutral">{product.quantity} in stock</span>;
}

export function Price({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <p className="flex items-baseline gap-2">
      <span className={`font-extrabold tracking-tight ${large ? "text-4xl" : "text-xl"}`}>{formatPrice(product.priceCents)}</span>
      {product.retailCents && (
        <span className={`text-muted line-through ${large ? "text-lg" : "text-sm"}`}>
          <span className="sr-only">Retail price </span>{formatPrice(product.retailCents)}
        </span>
      )}
    </p>
  );
}

// Product photo, or the sample illustration, on a category-tinted square.
export function ProductImage({ product, src, eager = false, className = "" }: { product: Product; src?: string; eager?: boolean; className?: string }) {
  return (
    <div className={`tile-${product.category} relative aspect-square overflow-hidden ${className}`}>
      <img src={src ?? product.images[0]} alt={`${product.name}`} width={600} height={600} loading={eager ? "eager" : "lazy"} decoding="async" className={`h-full w-full object-contain ${product.quantity === 0 ? "opacity-50 grayscale" : ""}`} />
    </div>
  );
}

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <article className="product-card card relative flex h-full flex-col overflow-hidden">
      <ProductImage product={product} eager={eager} />
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        {product.sample && <span className="chip chip-sample">Sample</span>}
        {product.quantity === 0 && <span className="chip chip-out">Sold out</span>}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.brand && <p className="text-xs font-bold uppercase tracking-[.1em] text-muted">{product.brand}</p>}
        <h3 className="font-bold leading-snug">
          {/* the whole card is the link */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">{product.name}</Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <Price product={product} />
          <ConditionChip product={product} />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, eagerFirst = 0 }: { products: Product[]; eagerFirst?: number }) {
  if (products.length === 0) return <p className="card p-6 text-muted">Nothing here yet. Check back soon.</p>;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {products.map((p, i) => <li key={p.slug}><ProductCard product={p} eager={i < eagerFirst} /></li>)}
    </ul>
  );
}

// Marks information the owner still has to provide. Visible on purpose so nothing ships half-filled.
export function Todo({ children }: { children: ReactNode }) {
  return <p role="note" className="todo"><strong>To fill in:</strong> {children}</p>;
}
