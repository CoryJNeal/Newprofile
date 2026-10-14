import { ProductGrid } from "@/components/product-grid"
import { Badge } from "@/components/ui/badge"
import type { CategoryId, Product } from "@/lib/mock-data"

export function ShopListing({
  eyebrow,
  title,
  description,
  note,
  badge,
  category,
  products,
  showDepartment = false,
  showAllotment = false,
}: {
  eyebrow: string
  title: string
  description: string
  note?: string
  badge?: string
  category: CategoryId
  products: Product[]
  showDepartment?: boolean
  showAllotment?: boolean
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
          {note ? (
            <p className="mt-2 text-sm text-muted-foreground">{note}</p>
          ) : null}
        </div>
        {badge ? <Badge>{badge}</Badge> : null}
      </div>
      <ProductGrid
        category={category}
        products={products}
        showDepartment={showDepartment}
        showAllotment={showAllotment}
      />
    </div>
  )
}
