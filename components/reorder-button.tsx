"use client"

import { toast } from "sonner"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"

export function ReorderButton({ label = "Added to cart for reorder" }: { label?: string }) {
  const { addToCart } = useSession()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => {
        addToCart()
        toast.success("Added to cart for reorder")
      }
    }>
      {label}
    </Button>
  )
}

export function AddToCartButton({
  label,
  disabled,
  disabledHint,
}: {
  label: string
  disabled?: boolean
  disabledHint?: string
}) {
  const { addToCart } = useSession()

  return (
    <div className="space-y-1">
      <Button
        type="button"
        size="sm"
        disabled={disabled}
        onClick={() => {
          addToCart()
          toast.success(label)
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
