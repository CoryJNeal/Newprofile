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
        {meta.scanHref ? (
          <Link
            href={meta.scanHref}
            className={buttonVariants({ size: "lg" })}
          >
            Start {meta.scanType} scan
          </Link>
        ) : null}
        <Link
          href={meta.catalogHref}
          className={buttonVariants({
            variant: meta.scanHref ? "outline" : "default",
            size: "lg",
          })}
        >
          Shop {meta.label.toLowerCase()} catalog
        </Link>
      </div>
      <CatalogSwitcher current={category} />
    </div>
  )
}
