# PPE Program Home

Employee landing for a B2B PPE store. After sign-in, Jordan Hale lands on a program hub that shows **standing eligibility**, last placed orders, scanning, scan results, and recommended options for eyewear, footwear, apparel, and uniforms.

This is a browser-only mock. There is no real authentication, scanner hardware, or checkout.

## What you can do

1. **Employee sign-in** — User + ID #. Demo employee: `Jordan Hale` / `104829`.
2. **Program Home** — standing eligibility (not a page explainer), last placed orders that add to cart, and category cards.
3. **Last placed orders** — click **Add last order to cart** to drop that order into the cart drawer.
4. **See recommended options** — scan-matched styles for that category.
5. **See scan results** — footwear includes a plantar pressure heatmap from a completed foot scan.
6. **Apparel allotment** — 2 FR pants, 1 FR jacket, and 3 FR shirts this cycle (not a dollar subsidy).

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43129](http://127.0.0.1:43129).

Sign in with:

- User: `Jordan Hale`
- ID #: `104829`

Or click **Use demo employee**, then **Sign in to your program**.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.
