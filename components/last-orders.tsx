"use client"

import { ReorderButton } from "@/components/reorder-button"
import {
  categories,
  lastOrderFor,
  type CategoryId,
} from "@/lib/mock-data"

const moduleOrder: CategoryId[] = [
  "eyewear",
  "footwear",
  "apparel",
  "uniforms",
]

export function LastOrders() {
  return (
    <section>
      <h2 className="text-sm font-medium">Last placed orders</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Select a last placed order to add those items to your cart.
      </p>
      <div className="mt-3 divide-y rounded-xl border bg-background">
        {moduleOrder.map((id) => {
          const last = lastOrderFor(id)
          const meta = categories.find((c) => c.id === id)
          if (!last || !meta) return null
          const summary = last.items
            .map((item) => `${item.qty}× ${item.name}`)
            .join(", ")
          return (
            <div
              key={id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="font-medium">{meta.label}</p>
                <p className="text-muted-foreground">
                  {summary} · {last.placedOn} · {last.id}
                </p>
              </div>
              <ReorderButton order={last} label="Add last order to cart" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
