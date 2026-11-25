"use client";
import { useMemo, useState } from "react";
import { ProductGrid } from "./ProductBits";
import type { Product } from "@/data/catalog";

// Live filter by name, brand or any spec value (so part numbers like "W10285511" or "wr23x" match).
// Ignores spaces, dashes and case: "da41 00519q" finds "DA41-00519Q".
const norm = (s: string) => s.toLowerCase().replace(/[\s\-_./]+/g, "");

export default function SearchableGrid({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const index = useMemo(
    () => products.map((p) => ({ p, text: norm([p.name, p.brand ?? "", ...p.specs.map((s) => s.value)].join(" ")) })),
    [products],
  );
  const words = q.trim().split(/\s+/).map(norm).filter(Boolean);
  const shown = words.length ? index.filter(({ text }) => words.every((w) => text.includes(w))).map(({ p }) => p) : products;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="relative w-full sm:max-w-sm">
          <span className="sr-only">Search by name or part number</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or part number" enterKeyHint="search" autoComplete="off"
            className="h-12 w-full rounded-xl border-[1.5px] border-line bg-card px-4 text-base outline-none placeholder:text-muted focus:border-ink" />
        </label>
        <p className="text-sm font-semibold text-muted" aria-live="polite">{shown.length} {shown.length === 1 ? "item" : "items"}</p>
      </div>
      <div className="mt-4">
        {shown.length === 0 && words.length > 0
          ? <p className="card p-6 text-muted">No match for &ldquo;{q.trim()}&rdquo;. Try just the part number, or <button type="button" onClick={() => setQ("")} className="min-h-11 font-semibold text-signal-ink underline">clear the search</button>.</p>
          : <ProductGrid products={shown} eagerFirst={4} />}
      </div>
    </>
  );
}
