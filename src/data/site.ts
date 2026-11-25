// Shop settings. NULL means "not provided by the owner yet". Never invent these: anything left null shows a
// clearly marked placeholder (or is hidden) and is listed in OPEN_DECISIONS.md.
export const site = {
  name: "Quick Shop",
  // Short line under the logo and in link previews. Owner may replace it.
  tagline: "Cologne & appliances, resold",
  // Public address once a domain is bought (used for link previews, robots.txt and the sitemap).
  url: "http://localhost:3000",
  // Where the shop ships from (owner, 2026-11-25).
  shipsFrom: "Florida",
  // The owner's current eBay store or seller page. When set, the header, home page and footer link to it.
  ebayStoreUrl: null as string | null,
  supportEmail: null as string | null,
  supportPhone: null as string | null,
  instagramHandle: null as string | null,
  tiktokHandle: null as string | null,
  // Business address shown on the Contact page. Many home sellers leave this null on purpose.
  businessAddress: null as string | null,
  // e.g. "United States only". null = not stated yet.
  shippingDestinations: null as string | null,
  // e.g. "Orders ship within 2 business days." null = not stated yet.
  processingTime: null as string | null,
  // Online checkout isn't built in this template. Product pages offer "Buy on eBay" (when the item has an eBay link)
  // or "Ask about this item" instead of a cart.
  checkoutEnabled: false,
};

// The shop's own policy wording. null = not written yet: the policy page says so instead of showing made-up terms.
// Write these with the owner (and an advisor if they want one). Plain paragraphs; blank lines start new paragraphs.
export const policies = {
  shipping: null as string | null,
  returns: null as string | null,
  // How the shop sources and checks fragrances, in the owner's own words. Never promise authenticity the owner
  // hasn't stated. Shown on fragrance product pages and the About section when set.
  authenticity: null as string | null,
  privacy: null as string | null,
  terms: null as string | null,
};
