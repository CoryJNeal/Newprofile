import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  categories,
  eligibility,
  standingLine,
  type CategoryId,
} from "@/lib/mock-data"

const order: CategoryId[] = ["eyewear", "footwear", "apparel", "uniforms"]

export function EligibilityStanding() {
  return (
    <div className="mt-5">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
        Standing eligibility
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {order.map((id) => {
          const meta = categories.find((c) => c.id === id)
          const info = eligibility[id]
          if (!meta) return null
          return (
            <Link
              key={id}
              href={meta.moduleHref}
              className="rounded-lg border bg-zinc-50/80 px-3 py-3 transition-colors hover:border-foreground/20 hover:bg-zinc-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium">{meta.label}</p>
                <Badge variant={info.eligible ? "default" : "destructive"}>
                  {info.eligible ? "Eligible" : "Not eligible"}
                </Badge>
              </div>
              {info.kind === "allotment" && info.allotment ? (
                <ul className="mt-2 space-y-0.5 text-sm text-muted-foreground">
                  {info.allotment.map((line) => (
                    <li key={line.label}>
                      {line.remaining} of {line.allowed} {line.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  {standingLine(id)}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Next cycle {info.nextEligibleDate}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
