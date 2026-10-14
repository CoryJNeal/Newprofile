# PPE Program Home

Clickable prototype of an employee landing for a B2B PPE store. Instead of dropping a user on the product list, they sign in and land on a program hub for **eyewear**, **footwear**, **apparel**, and **uniforms**.

This is a browser-only mock. There is no real authentication, cart, scanner hardware, or checkout.

## What you can do

1. **Employee sign-in** — User + ID #. Demo employee: `Jordan Hale` / `104829`.
2. **Program Home** — eligibility, subsidy/allotment, last order per category.
3. **Module pages** — face / foot / body scan data, footwear pressure heatmap, uniform styles (style #, PiD, print jobs).
4. **Catalogs** — filtered PLPs with job-requirement chips. Add to cart is a toast only.
5. **Scanner mocks** — static capture screens. The scanner does not run.

Uniforms follow Uniform Desk language: style #, PiD code, print sizes `4x4`, `3x15`, `12x8`, customer/location.

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
