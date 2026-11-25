// The owner's own fragrance and home listings on eBay (store: cristobalshop), shared by the owner on 2026-11-25.
// Names, sizes, prices and condition are copied from each listing that day; photos are the listing's own photos
// (first four), saved in public/products/. Prices and stock change on eBay: stock isn't copied (null), and the product
// page dates the price. Bulk discounts and eBay's "was" prices aren't copied. No authenticity claims are added here.
import type { Product } from "./catalog";

const CHECKED = "2026-11-25";
const photos = (slug: string) => [1, 2, 3, 4].map((n) => `/products/${slug}-${n}.jpg`);
const base = { condition: null, retailCents: null, quantity: null, conditionNotes: null, priceCheckedOn: CHECKED, active: true, sample: false, addedOn: null } as const;

export const ebayListings: Product[] = [
  {
    ...base, slug: "al-haramain-amber-oud-gold-edition-edp-2-oz", featured: true,
    name: "Al Haramain Amber Oud Gold Edition Eau de Parfum, 2.0 oz", brand: "Al Haramain", category: "fragrance",
    listedCondition: "New with box", priceCents: 5400,
    specs: [{ label: "Size", value: "2.0 fl oz" }, { label: "Concentration", value: "Eau de parfum" }, { label: "Scent", value: "Oud" }, { label: "Formulation", value: "Spray" }],
    description: "Amber Oud Gold Edition by Al Haramain, a 2.0 oz eau de parfum spray, new in its box.",
    images: photos("al-haramain-amber-oud-gold-edition-edp-2-oz"), ebayUrl: "https://www.ebay.com/itm/305906922952",
  },
  {
    ...base, slug: "perry-ellis-360-for-men-edt-3-4-oz", featured: true,
    name: "Perry Ellis 360 for Men Eau de Toilette, 3.4 oz", brand: "Perry Ellis", category: "fragrance",
    listedCondition: "New with box", priceCents: 3150,
    specs: [{ label: "Size", value: "3.4 fl oz" }, { label: "Concentration", value: "Eau de toilette" }, { label: "Formulation", value: "Spray" }],
    description: "360 for Men by Perry Ellis, a 3.4 oz eau de toilette spray, new in its box.",
    images: photos("perry-ellis-360-for-men-edt-3-4-oz"), ebayUrl: "https://www.ebay.com/itm/305906919682",
  },
  {
    ...base, slug: "stetson-spirit-cologne-face-beard-wash-set", featured: true,
    name: "Stetson Spirit Cologne & Face and Beard Wash Set", brand: "Stetson", category: "fragrance",
    listedCondition: "New with box", priceCents: 2700,
    specs: [{ label: "Cologne", value: "1.7 fl oz spray" }, { label: "Face & beard wash", value: "5.0 fl oz" }],
    description: "Stetson Spirit gift set: a 1.7 oz cologne spray and a 5.0 oz face and beard wash, new in the box.",
    images: photos("stetson-spirit-cologne-face-beard-wash-set"), ebayUrl: "https://www.ebay.com/itm/305346930517",
  },
  {
    ...base, slug: "beverly-hills-polo-club-sexy-5-piece-gift-set", featured: true,
    name: "Beverly Hills Polo Club Sexy 5-Piece Gift Set for Men", brand: "Beverly Hills Polo Club", category: "fragrance",
    listedCondition: "New with box", priceCents: 2610,
    specs: [{ label: "Includes", value: "Eau de toilette, body spray, after shave balm, hair & body wash, spray deodorant" }, { label: "Formulation", value: "Spray" }],
    description: "Five-piece men's gift set from Beverly Hills Polo Club's Sexy line, new in the box.",
    images: photos("beverly-hills-polo-club-sexy-5-piece-gift-set"), ebayUrl: "https://www.ebay.com/itm/305990071883",
  },
  {
    ...base, slug: "beverly-hills-polo-club-travel-cologne-set-4-pack", featured: false,
    name: "Beverly Hills Polo Club Men's Travel Cologne Set, 4 × 0.33 oz", brand: "Beverly Hills Polo Club", category: "fragrance",
    listedCondition: "New with box", priceCents: 1709,
    specs: [{ label: "Size", value: "4 travel sprays, 0.33 fl oz each" }, { label: "Scent", value: "Citrus, floral" }],
    description: "Four Beverly Hills Polo Club travel-size cologne sprays in a gift box, new.",
    images: photos("beverly-hills-polo-club-travel-cologne-set-4-pack"), ebayUrl: "https://www.ebay.com/itm/306873216995",
  },
  {
    ...base, slug: "luminarc-rika-11-5-oz-glasses-set-of-4", featured: false,
    name: "Luminarc Rika 11.5 oz Glasses, Set of 4", brand: "Luminarc", category: "home-kitchen",
    listedCondition: "New", priceCents: 2250,
    specs: [{ label: "Set", value: "4 glasses" }, { label: "Capacity", value: "11.5 oz each" }, { label: "Material", value: "Clear glass" }, { label: "Care", value: "Dishwasher safe" }],
    description: "Four clear Luminarc Rika drinking glasses, 11.5 oz each, new in the box.",
    images: photos("luminarc-rika-11-5-oz-glasses-set-of-4"), ebayUrl: "https://www.ebay.com/itm/305191752685",
  },
];
