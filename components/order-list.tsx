import { Badge } from "@/components/ui/badge"
import { ReorderButton } from "@/components/reorder-button"
import { money, orderTotal, type Order } from "@/lib/mock-data"

const statusLabel: Record<Order["status"], string> = {
  delivered: "Delivered",
  in_transit: "In transit",
  processing: "Processing",
}

export function OrderCard({
  order,
  featured = false,
}: {
  order: Order
  featured?: boolean
}) {
  return (
    <article
      className={
        featured
          ? "rounded-xl border border-primary/20 bg-background p-4"
          : "border-b py-4 last:border-b-0 last:pb-0"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {featured ? (
            <p className="text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
              Last placed order
            </p>
          ) : null}
          <p className="font-medium">
            {order.id}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {order.placedOn}
            </span>
          </p>
          <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
            {order.items.map((item) => (
              <li key={`${order.id}-${item.styleNumber}`}>
                {item.qty}× {item.name} · {item.styleNumber} · {item.size} ·{" "}
                {money(item.price)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={order.status === "delivered" ? "secondary" : "outline"}>
            {statusLabel[order.status]}
          </Badge>
          <p className="text-sm font-medium">{money(orderTotal(order))}</p>
          <ReorderButton />
        </div>
      </div>
    </article>
  )
}

export function OrderList({
  orders,
  title = "Past orders",
}: {
  orders: Order[]
  title?: string
}) {
  const [last, ...rest] = orders

  if (!last) {
    return null
  }

  return (
    <section className="space-y-4">
      <OrderCard order={last} featured />
      {rest.length > 0 ? (
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="mt-1">
            {rest.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
