import { CatalogSwitcher } from "@/components/catalog-switcher"
import { EligibilityPanel } from "@/components/eligibility-panel"
import { ModuleActions } from "@/components/module-actions"
import { OrderList } from "@/components/order-list"
import { FaceScanPanel } from "@/components/scan-metrics"
import { ordersFor } from "@/lib/mock-data"

export default function EyewearPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
          Eyewear
        </p>
        <h1 className="text-2xl font-medium tracking-tight">
          Safety eyewear program
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Face scan data drives frame recommendations. Your role requires ANSI
          Z87.1. Rx inserts are covered under the eyewear subsidy.
        </p>
      </div>
      <EligibilityPanel category="eyewear" />
      <ModuleActions category="eyewear" />
      <FaceScanPanel />
      <OrderList orders={ordersFor("eyewear")} />
      <CatalogSwitcher current="eyewear" />
    </div>
  )
}
