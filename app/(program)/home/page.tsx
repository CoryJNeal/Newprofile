import { ModuleCard } from "@/components/module-card"
import { Badge } from "@/components/ui/badge"
import {
  categories,
  employee,
  lastOrderFor,
  type CategoryId,
} from "@/lib/mock-data"

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
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          This is your PPE program home — not the open catalog. Eligibility,
          subsidy, and approved styles are assigned to your role at Plant 4.
          Scan when you need a new fit. Shop only gear that meets the site
          requirements below.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {employee.roleRequirements.map((req) => (
            <Badge key={req} variant="outline">
              {req}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium">Last placed order by category</h2>
        <div className="mt-3 divide-y rounded-xl border bg-background">
          {moduleOrder.map((id) => {
            const last = lastOrderFor(id)
            const meta = categories.find((c) => c.id === id)
            if (!last || !meta) return null
            return (
              <div
                key={id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
              >
                <span className="font-medium">{meta.label}</span>
                <span className="text-muted-foreground">
                  {last.items[0]?.name} · {last.placedOn} · {last.id}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {moduleOrder.map((id) => (
          <ModuleCard key={id} category={id} />
        ))}
      </section>
    </div>
  )
}
