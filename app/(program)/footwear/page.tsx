import { CatalogSwitcher } from "@/components/catalog-switcher"
import { EligibilityPanel } from "@/components/eligibility-panel"
import { ModuleActions } from "@/components/module-actions"
import { OrderList } from "@/components/order-list"
import { FootScanPanel } from "@/components/scan-metrics"
import { ordersFor } from "@/lib/mock-data"

export default function FootwearPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
          Footwear
        </p>
        <h1 className="text-2xl font-medium tracking-tight">
          Safety footwear program
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Footwear scanning is complete. Plantar pressure, last, and width are
          on file. Plant 4 requires ASTM F2413 composite-toe, EH-rated boots.
        </p>
      </div>
      <EligibilityPanel category="footwear" />
      <ModuleActions category="footwear" />
      <FootScanPanel />
      <OrderList orders={ordersFor("footwear")} />
      <CatalogSwitcher current="footwear" />
    </div>
  )
}
