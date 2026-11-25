// The product catalog. Until there is a database or an admin page, the owner's items live here.
//
// SAMPLE LISTINGS: the items marked `sample: true` are placeholders that show how the store looks. They use generic
// names on purpose (no real brands, prices or stock). Replace them with real items before the site goes public;
// `LAUNCH=1 npm test` fails while any sample is still active (see catalog.test.ts).

export type CategorySlug = "fragrance" | "appliances";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  art: string;
};

export const categories: Category[] = [
  { slug: "fragrance", name: "Fragrance", blurb: "Cologne, eau de parfum and gift sets.", art: "/art/bottle-tall.svg" },
  { slug: "appliances", name: "Appliances", blurb: "Kitchen and home appliances.", art: "/art/mixer.svg" },
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
  condition: Condition;
  priceCents: number;
  // Original retail price, only when the owner can back it up. Shown struck through next to the price.
  retailCents: number | null;
  quantity: number; // 0 = sold out (still shown, marked sold out)
  // Short facts shown as a table: size, concentration, model number, wattage, what's in the box...
  specs: { label: string; value: string }[];
  description: string;
  // Anything a buyer should know before buying: missing cap, box dent, tested on..., etc.
  conditionNotes: string | null;
  images: string[]; // first one is the main photo; put photos in /public/products/
  ebayUrl: string | null; // this exact item's eBay listing, if it's listed there too
  featured: boolean;
  active: boolean;
  sample: boolean;
  addedOn: string; // YYYY-MM-DD, newest first on the shop page
};

export const products: Product[] = [
  {
    slug: "sample-woody-cologne-100ml", sample: true, active: true, featured: true, addedOn: "2026-11-24",
    name: "Sample Woody Eau de Parfum, 3.4 oz", brand: "Sample Brand", category: "fragrance", condition: "new-sealed",
    priceCents: 6500, retailCents: null, quantity: 3,
    specs: [{ label: "Size", value: "3.4 oz / 100 ml" }, { label: "Concentration", value: "Eau de parfum" }, { label: "Box", value: "Sealed" }],
    description: "Placeholder listing. Describe the scent family, notes and who it suits in the owner's words.",
    conditionNotes: null, images: ["/art/bottle-tall.svg"], ebayUrl: null,
  },
  {
    slug: "sample-fresh-cologne-50ml", sample: true, active: true, featured: true, addedOn: "2026-11-22",
    name: "Sample Fresh Eau de Toilette, 1.7 oz", brand: "Sample Brand", category: "fragrance", condition: "new-open-box",
    priceCents: 4200, retailCents: null, quantity: 1,
    specs: [{ label: "Size", value: "1.7 oz / 50 ml" }, { label: "Concentration", value: "Eau de toilette" }, { label: "Fill level", value: "Full" }],
    description: "Placeholder listing. Open-box items work well with a clear photo of the bottle and fill level.",
    conditionNotes: "Box opened for photos. Bottle unused.", images: ["/art/bottle-round.svg"], ebayUrl: null,
  },
  {
    slug: "sample-gift-set", sample: true, active: true, featured: false, addedOn: "2026-11-18",
    name: "Sample Cologne Gift Set", brand: "Sample Brand", category: "fragrance", condition: "new-sealed",
    priceCents: 7800, retailCents: null, quantity: 0,
    specs: [{ label: "Includes", value: "Spray, travel spray, aftershave balm" }],
    description: "Placeholder listing that shows how a sold-out item looks.",
    conditionNotes: null, images: ["/art/bottle-square.svg"], ebayUrl: null,
  },
  {
    slug: "sample-stand-mixer", sample: true, active: true, featured: true, addedOn: "2026-11-23",
    name: "Sample 5-Quart Stand Mixer", brand: "Sample Brand", category: "appliances", condition: "new-open-box",
    priceCents: 18900, retailCents: null, quantity: 1,
    specs: [{ label: "Model", value: "SM-500" }, { label: "Bowl", value: "5 qt stainless" }, { label: "In the box", value: "Bowl, whisk, dough hook, beater" }],
    description: "Placeholder listing. For appliances, list the model number and everything that's in the box.",
    conditionNotes: "Opened and tested once. All attachments included.", images: ["/art/mixer.svg"], ebayUrl: null,
  },
  {
    slug: "sample-air-fryer", sample: true, active: true, featured: true, addedOn: "2026-11-20",
    name: "Sample 6-Quart Air Fryer", brand: "Sample Brand", category: "appliances", condition: "used-like-new",
    priceCents: 5900, retailCents: null, quantity: 2,
    specs: [{ label: "Model", value: "AF-6" }, { label: "Capacity", value: "6 qt" }, { label: "Power", value: "1700 W" }],
    description: "Placeholder listing. Say how it was tested and cleaned.",
    conditionNotes: "Light marks on the basket.", images: ["/art/air-fryer.svg"], ebayUrl: null,
  },
  {
    slug: "sample-coffee-maker", sample: true, active: true, featured: false, addedOn: "2026-11-15",
    name: "Sample 12-Cup Coffee Maker", brand: "Sample Brand", category: "appliances", condition: "used-good",
    priceCents: 2500, retailCents: null, quantity: 1,
    specs: [{ label: "Model", value: "CM-12" }, { label: "Capacity", value: "12 cups" }],
    description: "Placeholder listing.",
    conditionNotes: "Works. Scuffs on the side panel.", images: ["/art/coffee-maker.svg"], ebayUrl: null,
  },
];

export const activeProducts = () =>
  products.filter((p) => p.active).sort((a, b) => b.addedOn.localeCompare(a.addedOn));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug && p.active);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const inCategory = (slug: CategorySlug) => activeProducts().filter((p) => p.category === slug);

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100).replace(/\.00$/, "");
