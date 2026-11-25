// The product catalog. Until there is a database or an admin page, the owner's items live here.
//
// SAMPLE LISTINGS: the items marked `sample: true` are placeholders that show how the store looks. They use generic
// names on purpose (no real brands, prices or stock). Replace them with real items before the site goes public;
// `LAUNCH=1 npm test` fails while any sample is still active (see catalog.test.ts).

import { EBAY_PRICES_CHECKED_ON, ebayParts } from "./ebay-parts";

export type CategorySlug = "fragrance" | "appliances" | "appliance-parts";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  art: string;
};

export const categories: Category[] = [
  { slug: "fragrance", name: "Fragrance", blurb: "Cologne, eau de parfum and gift sets.", art: "/art/products/bottle-tall.svg" },
  { slug: "appliances", name: "Appliances", blurb: "Kitchen and home appliances.", art: "/art/products/mixer.svg" },
  { slug: "appliance-parts", name: "Appliance parts", blurb: "Replacement parts for refrigerators, washers, dryers and ranges. Search by part number.", art: "/products/ge-refrigerator-wire-basket-wr71x2402.jpg" },
];

// Condition labels describe the item, not a promise. The descriptions say what each label means on this shop;
// the owner can reword them.
export type Condition = "new-sealed" | "new-open-box" | "used-like-new" | "used-good" | "for-parts";
export const conditions: Record<Condition, { label: string; description: string; tone: "fresh" | "neutral" | "warn" }> = {
  "new-sealed": { label: "New, sealed", description: "Never opened. Original packaging and seal intact.", tone: "fresh" },
  "new-open-box": { label: "New, open box", description: "Unused, but the box has been opened. Listing notes say what's included.", tone: "fresh" },
  "used-like-new": { label: "Used, like new", description: "Used lightly with little or no sign of wear. See the notes and photos.", tone: "neutral" },
  "used-good": { label: "Used, good", description: "Used and working, with visible wear described in the notes.", tone: "neutral" },
  "for-parts": { label: "For parts", description: "Doesn't fully work or hasn't been tested. Sold as-is.", tone: "warn" },
};

export type Product = {
  slug: string;
  name: string;
  brand: string | null;
  category: CategorySlug;
  condition: Condition | null; // null = not recorded here; the eBay listing shows it
  // The condition exactly as the eBay listing states it (e.g. "Used"), when `condition` isn't set.
  listedCondition: string | null;
  priceCents: number;
  // Original retail price, only when the owner can back it up. Shown struck through next to the price.
  retailCents: number | null;
  quantity: number | null; // 0 = sold out (still shown, marked sold out); null = not tracked here
  // Short facts shown as a table: size, concentration, model number, wattage, what's in the box...
  specs: { label: string; value: string }[];
  description: string;
  // Anything a buyer should know before buying: missing cap, box dent, tested on..., etc.
  conditionNotes: string | null;
  images: string[]; // first one is the main photo; put photos in /public/products/
  ebayUrl: string | null; // this exact item's eBay listing, if it's listed there too
  // Set when the price was copied from eBay: the date it was checked. The product page says eBay has the current price.
  priceCheckedOn: string | null;
  featured: boolean;
  active: boolean;
  sample: boolean;
  addedOn: string | null; // YYYY-MM-DD, newest first on the shop page; null = unknown (listed after dated items)
};

export const products: Product[] = [
  {
    slug: "sample-woody-cologne-100ml", sample: true, active: true, featured: true, addedOn: "2026-11-24",
    name: "Sample Woody Eau de Parfum, 3.4 oz", brand: "Sample Brand", category: "fragrance", condition: "new-sealed",
    priceCents: 6500, retailCents: null, quantity: 3,
    specs: [{ label: "Size", value: "3.4 oz / 100 ml" }, { label: "Concentration", value: "Eau de parfum" }, { label: "Box", value: "Sealed" }],
    description: "Placeholder listing. Describe the scent family, notes and who it suits in the owner's words.",
    conditionNotes: null, images: ["/art/products/bottle-tall.svg"], ebayUrl: null, priceCheckedOn: null, listedCondition: null,
  },
  {
    slug: "sample-fresh-cologne-50ml", sample: true, active: true, featured: true, addedOn: "2026-11-22",
    name: "Sample Fresh Eau de Toilette, 1.7 oz", brand: "Sample Brand", category: "fragrance", condition: "new-open-box",
    priceCents: 4200, retailCents: null, quantity: 1,
    specs: [{ label: "Size", value: "1.7 oz / 50 ml" }, { label: "Concentration", value: "Eau de toilette" }, { label: "Fill level", value: "Full" }],
    description: "Placeholder listing. Open-box items work well with a clear photo of the bottle and fill level.",
    conditionNotes: "Box opened for photos. Bottle unused.", images: ["/art/products/bottle-round.svg"], ebayUrl: null, priceCheckedOn: null, listedCondition: null,
  },
  {
    slug: "sample-gift-set", sample: true, active: true, featured: false, addedOn: "2026-11-18",
    name: "Sample Cologne Gift Set", brand: "Sample Brand", category: "fragrance", condition: "new-sealed",
    priceCents: 7800, retailCents: null, quantity: 0,
    specs: [{ label: "Includes", value: "Spray, travel spray, aftershave balm" }],
    description: "Placeholder listing that shows how a sold-out item looks.",
    conditionNotes: null, images: ["/art/products/gift-set.svg"], ebayUrl: null, priceCheckedOn: null, listedCondition: null,
  },
  {
    slug: "sample-stand-mixer", sample: true, active: true, featured: true, addedOn: "2026-11-23",
    name: "Sample 5-Quart Stand Mixer", brand: "Sample Brand", category: "appliances", condition: "new-open-box",
    priceCents: 18900, retailCents: null, quantity: 1,
    specs: [{ label: "Model", value: "SM-500" }, { label: "Bowl", value: "5 qt stainless" }, { label: "In the box", value: "Bowl, whisk, dough hook, beater" }],
    description: "Placeholder listing. For appliances, list the model number and everything that's in the box.",
    conditionNotes: "Opened and tested once. All attachments included.", images: ["/art/products/mixer.svg"], ebayUrl: null, priceCheckedOn: null, listedCondition: null,
  },
  {
    slug: "sample-air-fryer", sample: true, active: true, featured: true, addedOn: "2026-11-20",
    name: "Sample 6-Quart Air Fryer", brand: "Sample Brand", category: "appliances", condition: "used-like-new",
    priceCents: 5900, retailCents: null, quantity: 2,
    specs: [{ label: "Model", value: "AF-6" }, { label: "Capacity", value: "6 qt" }, { label: "Power", value: "1700 W" }],
    description: "Placeholder listing. Say how it was tested and cleaned.",
    conditionNotes: "Light marks on the basket.", images: ["/art/products/air-fryer.svg"], ebayUrl: null, priceCheckedOn: null, listedCondition: null,
  },
  {
    slug: "sample-coffee-maker", sample: true, active: true, featured: false, addedOn: "2026-11-15",
    name: "Sample 12-Cup Coffee Maker", brand: "Sample Brand", category: "appliances", condition: "used-good",
    priceCents: 2500, retailCents: null, quantity: 1,
    specs: [{ label: "Model", value: "CM-12" }, { label: "Capacity", value: "12 cups" }],
    description: "Placeholder listing.",
    conditionNotes: "Works. Scuffs on the side panel.", images: ["/art/products/coffee-maker.svg"], ebayUrl: null, priceCheckedOn: null, listedCondition: null,
  },
  // Real listings from the eBay store (see ebay-parts.ts).
  ...ebayParts.map((e): Product => ({
    slug: e.slug, name: e.name, brand: e.brand, category: "appliance-parts", condition: null, listedCondition: e.listedCondition,
    priceCents: e.priceCents, retailCents: null, quantity: null, specs: e.specs,
    description: "Check the part number in the details against your appliance before buying. The eBay listing has more photos and compatibility details.",
    conditionNotes: null, images: [e.image], ebayUrl: `https://www.ebay.com/itm/${e.ebayItemId}`, priceCheckedOn: EBAY_PRICES_CHECKED_ON,
    featured: false, active: true, sample: false, addedOn: null,
  })),
];

// Dated items newest first, then undated items in catalog order.
export const activeProducts = () =>
  products.filter((p) => p.active).sort((a, b) => (b.addedOn ?? "").localeCompare(a.addedOn ?? ""));

export const isSoldOut = (p: Product) => p.quantity === 0;
// Illustrations (from /art/) stand in for photos until the owner adds real ones.
export const hasPhoto = (p: Product) => !p.images[0].startsWith("/art/");

export const getProduct = (slug: string) => products.find((p) => p.slug === slug && p.active);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const inCategory = (slug: CategorySlug) => activeProducts().filter((p) => p.category === slug);

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100).replace(/\.00$/, "");
