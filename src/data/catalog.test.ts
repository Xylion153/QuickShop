import { describe, expect, it } from "vitest";
import { categories, conditions, products } from "./catalog";

describe("catalog", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("uses known categories and conditions, sane prices and stock", () => {
    for (const p of products) {
      expect(categories.some((c) => c.slug === p.category)).toBe(true);
      expect(conditions[p.condition]).toBeDefined();
      expect(Number.isInteger(p.priceCents) && p.priceCents > 0).toBe(true);
      expect(Number.isInteger(p.quantity) && p.quantity >= 0).toBe(true);
      if (p.retailCents !== null) expect(p.retailCents).toBeGreaterThan(p.priceCents);
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.addedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (p.ebayUrl) expect(p.ebayUrl).toMatch(/^https:\/\/(www\.)?ebay\.com\//);
    }
  });

  // Set LAUNCH=1 when checking a build that will go public: sample listings must be gone by then.
  it.runIf(process.env.LAUNCH === "1")("has no active sample listings at launch", () => {
    expect(products.filter((p) => p.active && p.sample).map((p) => p.slug)).toEqual([]);
  });
});
