"use client";
import { useState } from "react";
import { ProductImage } from "./ProductBits";
import type { Product } from "@/data/catalog";

// Main photo plus tappable thumbnails. data-gallery-* hooks let the single-file preview do the same swap.
export default function Gallery({ product }: { product: Product }) {
  const [i, setI] = useState(0);
  const imgs = product.images;
  return (
    <div data-gallery="">
      <div data-gallery-main="">
        <ProductImage product={product} src={imgs[i]} eager className="rounded-[1.5rem] border border-line" />
      </div>
      {imgs.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3" aria-label="More photos">
          {imgs.map((src, n) => (
            <li key={src}>
              <button type="button" onClick={() => setI(n)} aria-label={`Photo ${n + 1} of ${imgs.length}`} aria-current={n === i ? "true" : undefined} data-gallery-src={src}
                className="block w-full overflow-hidden rounded-xl border-2 border-transparent ring-1 ring-line transition aria-[current=true]:border-ink">
                <img src={src} alt="" width={200} height={200} loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
