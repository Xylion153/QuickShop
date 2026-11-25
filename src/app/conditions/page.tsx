import type { Metadata } from "next";
import { conditions, type Condition } from "@/data/catalog";

export const metadata: Metadata = { title: "Condition guide" };

// Generated from the condition list in src/data/catalog.ts, so the guide always matches the labels on listings.
export default function ConditionGuide() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 sm:pt-12">
      <h1 className="headline text-4xl sm:text-5xl">Condition guide</h1>
      <p className="mt-3 text-lg text-muted">Every listing has one of these labels. Seller notes on the listing add anything specific to that item.</p>
      <ul className="mt-8 grid gap-3">
        {(Object.keys(conditions) as Condition[]).map((k) => (
          <li key={k} className="card p-5">
            <span className={`chip chip-${conditions[k].tone}`}>{conditions[k].label}</span>
            <p className="mt-3 leading-relaxed">{conditions[k].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
