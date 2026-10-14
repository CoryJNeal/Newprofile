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
  type Product,
} from "@/lib/mock-data"
import { departmentLabel } from "@/lib/shop"
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

function departmentText(product: Product) {
  const departments = product.departments
  if (!departments?.length) return null
  if (departments.length === 1) return departmentLabel[departments[0]]
  return "Men's and women's"
}

export function ProductGrid({
  category,
  recommendedOnly = false,
  products,
  showDepartment = false,
  showAllotment = false,
}: {
  category: CategoryId
  recommendedOnly?: boolean
  products?: Product[]
  showDepartment?: boolean
  showAllotment?: boolean
}) {
  const filters = catalogFilters[category]
  const [active, setActive] = React.useState<string | null>(null)
  const info = eligibility[category]
  const eligible = info.eligible
  const source = products ?? productsFor(category)
  const all = source.filter((p) => (recommendedOnly ? p.recommended : true))
  const items = active
    ? all.filter((p) => p.requirements.includes(active))
    : all

  const cta =
    eligible && info.kind === "subsidy"
      ? `Use ${info.subsidyLabel.replace(" remaining", "")}`
      : "Add to cart"

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        {products ? (
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "style" : "styles"}
          </p>
        ) : null}
      </div>
      {items.length === 0 ? (
        <p className="rounded-xl border bg-background px-4 py-8 text-center text-sm text-muted-foreground">
          {recommendedOnly
            ? "No recommended styles in this view. Open the full catalog to browse every approved option."
            : "No styles match this list."}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <article
            key={product.id}
            id={product.id}
            className="flex scroll-mt-24 flex-col rounded-xl border bg-background p-3"
          >
            <ProductArt category={category} />
            <div className="mt-3 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-snug">{product.name}</h3>
                <div className="flex shrink-0 flex-wrap justify-end gap-1">
                  {product.recommended ? (
                    <Badge variant="secondary">Scan match</Badge>
                  ) : null}
                  {showAllotment && product.allotmentLine ? (
                    <Badge variant="secondary">{product.allotmentLine}</Badge>
                  ) : null}
                </div>
              </div>
              {showDepartment && departmentText(product) ? (
                <p className="text-xs text-muted-foreground">
                  {departmentText(product)}
                </p>
              ) : null}
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
                product={product}
                label={cta}
                disabledHint={
                  !eligible && info.kind === "subsidy"
                    ? `Subsidy available ${info.nextEligibleDate}. You can still add at full price.`
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
