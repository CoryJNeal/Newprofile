import { EligibilityStanding } from "@/components/eligibility-standing"
import { LastOrders } from "@/components/last-orders"
import { ModuleCard } from "@/components/module-card"
import { Badge } from "@/components/ui/badge"
import { employee, type CategoryId } from "@/lib/mock-data"

const moduleOrder: CategoryId[] = [
  "eyewear",
  "footwear",
  "apparel",
  "uniforms",
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border bg-background p-5 md:p-6">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
          {employee.employer}
        </p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              {employee.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {employee.jobTitle} · {employee.department} · {employee.site}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            ID {employee.id}
            <span className="mx-2">·</span>
            Customer {employee.customerNumber}
            <span className="mx-2">·</span>
            Loc {employee.locationNumber}
          </div>
        </div>
        <EligibilityStanding />
        <div className="mt-4 flex flex-wrap gap-1.5">
          {employee.roleRequirements.map((req) => (
            <Badge key={req} variant="outline">
              {req}
            </Badge>
          ))}
        </div>
      </section>

      <LastOrders />

      <section>
        <h2 className="text-sm font-medium">Fit and scanning</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {moduleOrder.map((id) => (
            <ModuleCard key={id} category={id} />
          ))}
        </div>
      </section>
    </div>
  )
}
