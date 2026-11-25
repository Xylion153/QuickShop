# Open decisions (owner)

Known so far (2026-11-25): shop name **Quick Shop**; ships from **Florida**; currently sells on eBay at https://www.ebay.com/str/cristobalshop (set as `site.ebayStoreUrl`).

## Needed before the site goes public
1. **Real listings and photos** to replace the six sample items in `src/data/catalog.ts`.
2. **Each item's eBay listing link** (`ebayUrl`) if it's listed there too.
3. **How buyers reach him**: email and/or phone for texts (`supportEmail`, `supportPhone`).
4. **Shipping**: where he ships to, processing time, and the shipping policy wording.
5. **Returns policy** wording (fragrance and used appliances often differ; his call).
6. **Fragrance sourcing statement** (`policies.authenticity`): how he gets and checks fragrances, in his words.
   The template never claims authenticity on its own.
7. **Privacy policy and terms** wording.
8. **Domain** (then set `site.url`) and a logo, if he wants one beyond the placeholder bolt.

## Before adding online checkout (later)
- **Sales tax**: Florida is the home state, so Florida sales tax (state rate plus the delivery county's surtax) will
  apply to Florida orders. The scoops repo already has a Florida county surtax table (`src/data/tax/florida-surtax.ts`)
  and tax code that can be ported. Confirm registration with the Florida Department of Revenue first.
- **Selling the same item on eBay and here**: stock isn't synced, so a one-off item could sell twice. Decide how to
  handle that (mark it sold in both places right away, or list one-offs in one place only).
- Payment provider (the scoops store uses Square), order emails, and an admin page for orders.
