import { CatalogSwitcher } from "@/components/catalog-switcher"
import { EligibilityPanel } from "@/components/eligibility-panel"
import { ModuleActions } from "@/components/module-actions"
import { OrderList } from "@/components/order-list"
import { BodyScanPanel } from "@/components/scan-metrics"
import { ordersFor } from "@/lib/mock-data"

export default function ApparelPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
          Apparel
        </p>
        <h1 className="text-2xl font-medium tracking-tight">
          FR and hi-vis apparel
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Body scan sizes your FR layers. Subsidy is not open until December 15,
          2026 — you can still scan and browse the catalog.
        </p>
      </div>
      <EligibilityPanel category="apparel" />
      <ModuleActions category="apparel" />
      <BodyScanPanel />
      <OrderList orders={ordersFor("apparel")} />
      <CatalogSwitcher current="apparel" />
    </div>
  )
}
