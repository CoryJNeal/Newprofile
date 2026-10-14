import Link from "next/link"
import { ReorderButton } from "@/components/reorder-button"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  eligibility,
  lastOrderFor,
  type CategoryId,
  getCategory,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ModuleCard({ category }: { category: CategoryId }) {
  const meta = getCategory(category)
  const info = eligibility[category]
  const last = lastOrderFor(category)
  if (!meta) return null

  return (
    <article className="flex flex-col rounded-xl border bg-background p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-medium">{meta.label}</h2>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>
        <Badge variant={info.eligible ? "default" : "destructive"}>
          {info.eligible ? "Eligible" : "Not eligible"}
        </Badge>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">
            {category === "uniforms" ? "Allotment" : "Subsidy"}
          </dt>
          <dd className="font-medium">{info.subsidyLabel}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Next date</dt>
          <dd className="font-medium">{info.nextEligibleDate}</dd>
        </div>
      </dl>
      {last ? (
        <div className="mt-4 rounded-lg bg-zinc-50 p-3">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Last placed order
          </p>
          <p className="mt-1 text-sm font-medium">{last.items[0]?.name}</p>
          <p className="text-xs text-muted-foreground">
            {last.id} · {last.placedOn}
          </p>
          <div className="mt-2">
            <ReorderButton />
          </div>
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={meta.moduleHref}
          className={buttonVariants({ size: "sm" })}
        >
          Open {meta.label.toLowerCase()}
        </Link>
        <Link
          href={meta.catalogHref}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Shop catalog
        </Link>
        {meta.scanHref ? (
          <Link
            href={meta.scanHref}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Start scan
          </Link>
        ) : null}
      </div>
    </article>
  )
}
