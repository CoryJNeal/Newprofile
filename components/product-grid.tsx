"use client"

import * as React from "react"
import { AddToCartButton } from "@/components/reorder-button"
import { Badge } from "@/components/ui/badge"
import {
  catalogFilters,
  eligibility,
  money,
  productsFor,
  type CategoryId,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function ProductArt({ category }: { category: CategoryId }) {
  const tone: Record<CategoryId, string> = {
    eyewear: "bg-sky-100",
    footwear: "bg-amber-100",
    apparel: "bg-teal-100",
    uniforms: "bg-zinc-200",
  }
  return <div className={cn("h-36 w-full rounded-md", tone[category])} />
}

export function ProductGrid({ category }: { category: CategoryId }) {
  const filters = catalogFilters[category]
  const [active, setActive] = React.useState<string | null>(null)
  const eligible = eligibility[category].eligible
  const all = productsFor(category)
  const items = active
    ? all.filter((p) => p.requirements.includes(active))
    : all

  const cta =
    eligible && category !== "uniforms"
      ? `Use ${eligibility[category].subsidyLabel}`
      : "Add to cart"

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium",
            active === null
              ? "border-primary bg-primary text-primary-foreground"
              : "text-muted-foreground"
          )}
        >
          All
        </button>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter === active ? null : filter)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              active === filter
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <article
            key={product.id}
            className="flex flex-col rounded-xl border bg-background p-3"
          >
            <ProductArt category={category} />
            <div className="mt-3 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-snug">{product.name}</h3>
                {product.recommended ? (
                  <Badge variant="secondary">Scan match</Badge>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.styleNumber}
                {product.notes ? ` · ${product.notes}` : ""}
              </p>
              <p className="mt-1 text-sm font-medium">{money(product.price)}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {product.requirements.map((req) => (
                  <Badge key={req} variant="outline">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <AddToCartButton
                label={cta}
                disabledHint={
                  !eligible && category !== "uniforms"
                    ? `Subsidy available ${eligibility[category].nextEligibleDate}. You can still add at full price.`
                    : undefined
                }
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
