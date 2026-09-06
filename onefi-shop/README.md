# 1Fi Shop

A Vite + React recreation of the "Shop today, pay later using mutual funds" screen, with a
three-way tab switcher — **Top Brands**, **Nearby Stores**, and **1Fi Marketplace**.

Top Brands and Nearby Stores are intentionally empty (placeholder empty states) — wire up
real data by replacing the content in `src/App.jsx`. **1Fi Marketplace** is fully built out:
a browsable phone catalog with EMI plans, a product detail page, an EMI calculator, and a
plan-confirmation flow.

## Live demo

Run it locally in one line:

```bash
npm install && npm run dev
```

Then open the printed local URL (usually http://localhost:5173) and switch to the
**1Fi Marketplace** tab to try the full flow: filter/search/sort the grid, open a phone,
change its color/storage, pick an EMI plan, and confirm it.

### Deploying a shareable link

The app is a static Vite build with no backend, so any static host works. Two quick options:

**Vercel**
```bash
npm install -g vercel
npm run build
vercel deploy --prebuilt dist
```

**Netlify**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --dir dist --prod
```

Either command prints a live URL you can share once it finishes.

## Build for production

```bash
npm run build
npm run preview
```

## The 1Fi Marketplace tab

This tab simulates a small EMI-first phone store, entirely with mock data and illustrative
math (no backend, no real credit offer).

**Browse and filter**
- Product grid of 8 phones across Apple, Samsung, Google, OnePlus, Xiaomi and Nothing
- Filter chips by brand and by category (Smartphones / Foldable Phones), with live counts
- Sort by Newest, Price (low–high / high–low), or Rating
- The shared search bar filters by product name or brand

**Product detail**
- Color and storage pickers that re-price the product live
- A grid of EMI plans (3–18 months) generated from a shared pricing model — no-cost plans,
  interest-bearing plans, and tags like "Most popular" / "Best cashback" / "Lower monthly"
- A live plan summary (monthly instalment, final instalment, interest, fee, total payable)
- "Proceed with selected plan" opens a confirmation modal with a reference code, full cost
  breakdown, and a copy-to-clipboard button

**EMI calculator**
- A standalone slider + preset amounts that recomputes the same plan table for any order
  value, independent of a specific product

**FAQ**
- An accordion answering common questions about no-cost EMI, rounding, cashback, and what
  happens when a plan is confirmed

All EMI math (interest, processing fee, cashback, and the rounding on the final instalment)
runs through one shared helper (`src/utils/emi.js`), so numbers stay consistent between the
product cards, the product detail page, and the standalone calculator.

## Project structure

```
src/
  data/
    products.js               # Mock phone catalog + brand/category filter list
  utils/
    emi.js                     # Shared EMI plan math (interest, fee, cashback, rounding)
  components/
    HeroBanner.jsx             # Top gradient banner with the EMI pitch
    TabSwitcher.jsx             # Top Brands / Nearby Stores / 1Fi Marketplace pill tabs
    SearchBar.jsx                # Controlled search input, wired to the active tab
    EmptyState.jsx               # Reusable "nothing here yet" card
    BottomNav.jsx                # Home / Shop / EMI Dues / Limit / Profile bar
    marketplace/
      PhoneGlyph.jsx             # Illustrated dual-phone graphic, colored per variant
      FilterChips.jsx             # Horizontal scrollable brand/category chips
      SortSelect.jsx               # Sort-by dropdown
      ProductCard.jsx               # Grid card: price, rating, EMI-from, cashback, stock
      MarketplaceList.jsx            # Combines search/filter/sort + grid + info sections
      HowItWorks.jsx                  # Four-step explainer section
      EmiCalculator.jsx                # Standalone order-value EMI calculator
      Faq.jsx                           # FAQ accordion
      ProductDetail.jsx                 # Full product page: variants, EMI plans, summary
      EmiPlanCard.jsx                    # Single selectable EMI plan tile
      PlanConfirmedModal.jsx              # Confirmation modal with reference + breakdown
  App.jsx                        # Tab state, product selection, and screen routing
  index.css                       # Design tokens (color, type) and all styling
  main.jsx                         # React root
```

## Notes for extending this

- **Real product photos**: swap `PhoneGlyph` for `<img>` tags once you have real assets —
  it's used in exactly two places (`ProductCard` and `ProductDetail`).
- **Real EMI rules**: the tenure/interest/fee/cashback rules live at the top of
  `src/utils/emi.js` as a single `TENURE_RULES` array — edit the numbers there rather than
  in the components.
- **Real backend**: `ProductDetail`'s `handleProceed` currently just generates a fake
  reference code client-side. Replace it with an API call before treating this as anything
  more than a demo.
