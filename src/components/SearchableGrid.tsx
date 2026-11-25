"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "./ProductBits";
import type { Product } from "@/data/catalog";

// Live filter by name, brand or any spec value (so part numbers like "W10285511" or "wr23x" match).
// Ignores spaces, dashes and case: "da41 00519q" finds "DA41-00519Q". Starts from ?q= (the header search).
const norm = (s: string) => s.toLowerCase().replace(/[\s\-_./]+/g, "");
const SORTS = { featured: "Featured", "price-asc": "Price: low to high", "price-desc": "Price: high to low" } as const;
type Sort = keyof typeof SORTS;
const applianceOf = (p: Product) => p.specs.find((s) => s.label === "Appliance")?.value ?? "";

// Re-mounts when ?q= changes, so a new header search on the same page starts fresh.
export default function SearchableGrid({ products }: { products: Product[] }) {
  const q = useSearchParams().get("q") ?? "";
  return <ProductBrowser key={q} products={products} initialQ={q} />;
}

// Also used on its own as the prerendered version (no ?q= yet), so the first paint already has the full toolbar.
export function ProductBrowser({ products, initialQ = "" }: { products: Product[]; initialQ?: string }) {
  const [q, setQ] = useState(initialQ);
  const [sort, setSort] = useState<Sort>("featured");
  const [appliance, setAppliance] = useState("");

  const index = useMemo(
    () => products.map((p) => ({ p, text: norm([p.name, p.brand ?? "", ...p.specs.map((s) => s.value)].join(" ")) })),
    [products],
  );
  // Appliance chips appear when the list has parts for more than one kind of appliance.
  const appliances = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) { const a = applianceOf(p); if (a) counts.set(a, (counts.get(a) ?? 0) + 1); }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([a]) => a);
  }, [products]);

  const words = q.trim().split(/\s+/).map(norm).filter(Boolean);
  let shown = index.filter(({ p, text }) => words.every((w) => text.includes(w)) && (!appliance || applianceOf(p) === appliance)).map(({ p }) => p);
  if (sort !== "featured") shown = [...shown].sort((a, b) => (sort === "price-asc" ? a.priceCents - b.priceCents : b.priceCents - a.priceCents));

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <label className="relative">
          <span className="sr-only">Search by name or part number</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or part number" enterKeyHint="search" autoComplete="off"
            className="h-12 w-full rounded-full border border-line bg-card px-5 text-base outline-none placeholder:text-muted focus:border-ink sm:max-w-md" />
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-muted">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-11 rounded-full border border-line bg-card px-4 text-base font-semibold text-ink outline-none focus:border-ink sm:text-[15px]">
            {Object.entries(SORTS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>
      {appliances.length > 1 && (
        <div className="swipe -mx-4 mt-3 px-4" role="group" aria-label="Filter by appliance">
          {["", ...appliances].map((a) => (
            <button key={a || "all"} type="button" aria-pressed={appliance === a} onClick={() => setAppliance(a)}
              className="min-h-10 rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink/80 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white">
              {a || "All appliances"}
            </button>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm font-semibold text-muted" aria-live="polite">{shown.length} {shown.length === 1 ? "item" : "items"}</p>
      <div className="mt-3">
        {shown.length === 0 && (words.length > 0 || appliance)
          ? <p className="card p-6 text-muted">No match{q.trim() && <> for &ldquo;{q.trim()}&rdquo;</>}. Try just the part number, or <button type="button" onClick={() => { setQ(""); setAppliance(""); }} className="min-h-11 font-semibold text-signal-ink underline">clear filters</button>.</p>
          : <ProductGrid products={shown} eagerFirst={4} />}
      </div>
    </>
  );
}
