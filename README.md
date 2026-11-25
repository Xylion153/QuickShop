# Quick Shop

Storefront template for Quick Shop: cologne, fragrance and home appliances, resold and shipped from Florida.
Built from the same stack as the scoops store (Next.js 16 App Router, Tailwind CSS v4, TypeScript), cut down to the
storefront only: no cart, checkout, payments, admin or database yet.

    npm install
    npm run dev      # http://localhost:3000
    npm run lint && npm run typecheck && npm test && npm run build

## What's in it
- Home: hero, category tiles, featured items, "how buying works", newest items
- `/shop` and `/collections/fragrance`, `/collections/appliances`, `/collections/appliance-parts`: product grids with
  search by name or part number (sold-out items sink to the bottom)
- `/products/[slug]`: photo(s), condition + stock, details table, seller notes, sticky buy bar on phones
- `/contact`: email / text / eBay buttons; `?item=<slug>` pre-fills the message with the item
- `/conditions`: condition guide, generated from the same labels the listings use
- Shipping, returns, privacy and terms pages: show the owner's wording, or a "To fill in" box until it exists

Until online checkout exists, each product page shows **Buy on eBay** (when the item has `ebayUrl`) or
**Ask to buy this item** (goes to Contact).

## Making it his
1. `src/data/site.ts`: eBay store link, email/phone, socials, shipping details, policy wording. Anything left
   `null` is hidden, or shown as a dashed orange **To fill in** box in `npm run dev` (customers see a neutral
   "we're finishing this page" line instead).
2. `src/data/catalog.ts`: replace the six **sample** listings with real items. The appliance parts are real listings
   from his eBay store, kept in `src/data/ebay-parts.ts`. Put photos in `public/products/`.
   `LAUNCH=1 npm test` fails while any sample listing is still active.
3. Colors live at the top of `src/app/globals.css`; the logo is `src/components/Logo.tsx` + `src/app/icon.svg`.

Open questions for the owner are in `OPEN_DECISIONS.md`.
