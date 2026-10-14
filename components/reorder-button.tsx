"use client"

import { toast } from "sonner"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import {
  cartLinesFromOrder,
  money,
  type CartLine,
  type Order,
  type Product,
} from "@/lib/mock-data"

export function ReorderButton({
  order,
  label = "Add to cart",
}: {
  order: Order
  label?: string
}) {
  const { addLines } = useSession()
  const count = order.items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <Button
      type="button"
      variant="link"
      size="sm"
      className="h-auto px-0"
      onClick={() => {
        addLines(cartLinesFromOrder(order))
        toast.success(
          `Added ${count} item${count === 1 ? "" : "s"} from ${order.id} to cart`
        )
      }}
    >
      {label}
    </Button>
  )
}

export function AddToCartButton({
  product,
  size = "One size",
  label,
  disabled,
  disabledHint,
}: {
  product?: Product
  size?: string
  label: string
  disabled?: boolean
  disabledHint?: string
}) {
  const { addLines, addToCart } = useSession()

  return (
    <div className="space-y-1">
      <Button
        type="button"
        size="sm"
        disabled={disabled}
        onClick={() => {
          if (product) {
            const line: CartLine = {
              key: `${product.id}-${size}`,
              name: product.name,
              styleNumber: product.styleNumber,
              size,
              qty: 1,
              price: product.price,
            }
            addLines([line])
            toast.success(`${product.name} added to cart · ${money(product.price)}`)
          } else {
            addToCart()
            toast.success(label)
          }
        }}
      >
        {label}
      </Button>
      {disabledHint ? (
        <p className="text-xs text-muted-foreground">{disabledHint}</p>
      ) : null}
    </div>
  )
}
