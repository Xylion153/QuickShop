@AGENTS.md

# Quick Shop

Storefront for a reseller of cologne/fragrance and home appliances, shipping from Florida. Template stage:
storefront only (no cart, checkout, payments, admin or database). See `README.md` and `OPEN_DECISIONS.md`.

## Hard rules
- Never invent business details, prices, stock, policies, shipping rates, testimonials or guarantees. Unknown
  values stay `null` in `src/data/site.ts`; the UI hides them or shows a `<Todo>` box. List new unknowns in OPEN_DECISIONS.md.
- Never claim fragrances are authentic/genuine unless the owner's own wording says so (`policies.authenticity`).
- Sample listings (`sample: true`) use generic names, never real brands. `LAUNCH=1 npm test` must pass before going public.
- Verify current docs for Next.js 16 and Tailwind v4 before using an API from memory (`node_modules/next/dist/docs/`).
- Mobile first: check every UI change at 390px wide; tap targets ≥ 44px, inputs 16px.

## Layout
- Data: `src/data/site.ts` (shop settings + policy text), `src/data/catalog.ts` (categories, condition labels, products),
  `src/data/ebay-parts.ts` (real parts copied from the eBay store; condition/stock unknown = null, never guessed).
- Don't carry eBay's "Money Back Guarantee" tag into names: it's an eBay program, not a shop promise.
- Shared UI: `src/components/ProductBits.tsx` (cards, chips, price, `Todo`), `Listing.tsx`, `PolicyPage.tsx`.
- Theme: CSS variables at the top of `src/app/globals.css`; font Archivo (self-hosted, `src/fonts/`).

## Commands
`npm run dev`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
