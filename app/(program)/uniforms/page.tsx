import { CatalogSwitcher } from "@/components/catalog-switcher"
import { EligibilityPanel } from "@/components/eligibility-panel"
import { ModuleActions } from "@/components/module-actions"
import { OrderList } from "@/components/order-list"
import { UniformRack } from "@/components/uniform-rack"
import { ordersFor } from "@/lib/mock-data"

export default function UniformsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
          Uniforms
        </p>
        <h1 className="text-2xl font-medium tracking-tight">
          Plant 4 uniform program
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          These are approved Uniform Desk styles placed on customer 482910 /
          location 01427. Print jobs and PiD codes are locked. No scan is
          required — order from remaining allotment.
        </p>
      </div>
      <EligibilityPanel category="uniforms" />
      <ModuleActions category="uniforms" />
      <UniformRack />
      <OrderList orders={ordersFor("uniforms")} />
      <CatalogSwitcher current="uniforms" />
    </div>
  )
}
