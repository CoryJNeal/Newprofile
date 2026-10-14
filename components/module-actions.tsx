import Link from "next/link"
import { CatalogSwitcher } from "@/components/catalog-switcher"
import { buttonVariants } from "@/components/ui/button"
import { type CategoryId, getCategory } from "@/lib/mock-data"

export function ModuleActions({ category }: { category: CategoryId }) {
  const meta = getCategory(category)
  if (!meta) return null

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Link
          href={meta.recommendedHref}
          className={buttonVariants({ size: "lg" })}
        >
          See recommended options
        </Link>
        {meta.scanResultsHref ? (
          <Link
            href={meta.scanResultsHref}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            See scan results
          </Link>
        ) : null}
        <Link
          href={meta.catalogHref}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
          })}
        >
          Shop full catalog
        </Link>
      </div>
      <CatalogSwitcher current={category} />
    </div>
  )
}
