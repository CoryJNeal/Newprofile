import { notFound } from "next/navigation"
import { CatalogSwitcher } from "@/components/catalog-switcher"
import { ProductGrid } from "@/components/product-grid"
import { Badge } from "@/components/ui/badge"
import {
  eligibility,
  employee,
  getCategory,
  type CategoryId,
} from "@/lib/mock-data"

const ids: CategoryId[] = ["eyewear", "footwear", "apparel", "uniforms"]

function isCategory(value: string): value is CategoryId {
  return ids.includes(value as CategoryId)
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: raw } = await params
  if (!isCategory(raw)) notFound()
  const meta = getCategory(raw)
  if (!meta) notFound()
  const info = eligibility[raw]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
            Catalog
          </p>
          <h1 className="text-2xl font-medium tracking-tight">
            {meta.label} catalog
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {meta.description} Showing styles that meet {employee.jobTitle}{" "}
            requirements at {employee.site}.
          </p>
        </div>
        <Badge variant={info.eligible ? "default" : "destructive"}>
          {info.eligible ? info.subsidyLabel : `Not eligible until ${info.nextEligibleDate}`}
        </Badge>
      </div>
      <CatalogSwitcher current={raw} />
      <ProductGrid category={raw} />
    </div>
  )
}
