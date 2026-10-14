import Link from "next/link"
import { categories, type CategoryId } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function CatalogSwitcher({
  current,
  className,
}: {
  current?: CategoryId
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.catalogHref}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium",
            current === category.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:text-foreground"
          )}
        >
          {category.label} catalog
        </Link>
      ))}
    </div>
  )
}
