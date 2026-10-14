import { Badge } from "@/components/ui/badge"
import {
  eligibility,
  employee,
  money,
  type CategoryId,
} from "@/lib/mock-data"

export function EligibilityPanel({ category }: { category: CategoryId }) {
  const info = eligibility[category]
  const isAllotment = info.kind === "allotment"

  return (
    <section className="rounded-xl border bg-background p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {employee.jobTitle} · {employee.site}
          </p>
          <h2 className="mt-1 text-lg font-medium">Program eligibility</h2>
        </div>
        <Badge variant={info.eligible ? "default" : "destructive"}>
          {info.eligible ? "Eligible" : "Not eligible"}
        </Badge>
      </div>
      {isAllotment && info.allotment ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {info.allotment.map((line) => (
            <li key={line.label} className="rounded-lg bg-zinc-50 px-3 py-2">
              <p className="text-xs text-muted-foreground">{line.label}</p>
              <p className="text-sm font-medium">
                {line.remaining} of {line.allowed} remaining
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Subsidy</dt>
            <dd className="text-sm font-medium">{money(info.subsidyAmount)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">
              {info.eligible ? "Next eligibility date" : "Eligible again"}
            </dt>
            <dd className="text-sm font-medium">{info.nextEligibleDate}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Account</dt>
            <dd className="text-sm font-medium">
              Customer {employee.customerNumber} · Loc {employee.locationNumber}
            </dd>
          </div>
        </dl>
      )}
      {isAllotment ? (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">Next eligibility date</dt>
            <dd className="text-sm font-medium">{info.nextEligibleDate}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Account</dt>
            <dd className="text-sm font-medium">
              Customer {employee.customerNumber} · Loc {employee.locationNumber}
            </dd>
          </div>
        </dl>
      ) : null}
      {!info.eligible ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Your {category} benefit renews on {info.nextEligibleDate}. You can
          still browse the catalog and complete a scan.
        </p>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {employee.roleRequirements.map((req) => (
          <Badge key={req} variant="outline">
            {req}
          </Badge>
        ))}
      </ul>
    </section>
  )
}
