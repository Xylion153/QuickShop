# Open decisions (owner)

Known so far (2026-11-25): shop name **Quick Shop**; ships from **Florida**; currently sells on eBay at https://www.ebay.com/str/cristobalshop (set as `site.ebayStoreUrl`; the eBay store is also
named QUICKSHOP). Page 1 of that store (46 appliance parts) is imported into `src/data/ebay-parts.ts`.

## Needed before the site goes public
1. **What the site should lead with.** His eBay store is almost all appliance *replacement parts* (page 1 had no
   cologne and no whole appliances), but the home page headline says "Cologne. Appliances." Confirm whether he's
   starting to sell fragrance and whole appliances, or whether the site should lead with parts.
2. **Real fragrance/appliance listings and photos** to replace the six sample items in `src/data/catalog.ts`.
3. **The rest of his eBay listings.** Only store page 1 (48 listings) could be read; the store shows about 10 pages.
   Not imported from page 1: a hair-brush set and Nike sneakers (no matching category). Condition, stock and photos
   for the parts come from eBay; prices were copied on 2026-11-25 and can drift.
4. **Each item's eBay listing link** (`ebayUrl`) if it's listed there too.
5. **How buyers reach him**: email and/or phone for texts (`supportEmail`, `supportPhone`).
6. **Shipping**: where he ships to, processing time, and the shipping policy wording.
7. **Returns policy** wording (fragrance and used appliances often differ; his call).
8. **Fragrance sourcing statement** (`policies.authenticity`): how he gets and checks fragrances, in his words.
   The template never claims authenticity on its own.
9. **Privacy policy and terms** wording.
10. **Domain** (then set `site.url`) and a logo, if he wants one beyond the placeholder bolt.

## Before adding online checkout (later)
- **Sales tax**: Florida is the home state, so Florida sales tax (state rate plus the delivery county's surtax) will
  apply to Florida orders. The scoops repo already has a Florida county surtax table (`src/data/tax/florida-surtax.ts`)
  and tax code that can be ported. Confirm registration with the Florida Department of Revenue first.
- **Selling the same item on eBay and here**: stock isn't synced, so a one-off item could sell twice. Decide how to
  handle that (mark it sold in both places right away, or list one-offs in one place only).
- Payment provider (the scoops store uses Square), order emails, and an admin page for orders.
