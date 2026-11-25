import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { activeProducts, categories } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", ...categories.map((c) => `/collections/${c.slug}`), ...activeProducts().map((p) => `/products/${p.slug}`),
    "/conditions", "/contact", "/shipping-policy", "/returns-policy", "/privacy-policy", "/terms"];
  return pages.map((p) => ({ url: `${site.url}${p}` }));
}
