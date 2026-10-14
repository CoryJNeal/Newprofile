"use client"

import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { money } from "@/lib/mock-data"

export function CartSheet() {
  const { cartCount, cartLines, clearCart } = useSession()
  const total = cartLines.reduce((sum, line) => sum + line.price * line.qty, 0)

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="relative" />
        }
      >
        <ShoppingCart className="size-3.5" />
        Cart
        <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
          {cartCount}
        </span>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            {cartCount === 0
              ? "Your cart is empty. Add a last placed order or a recommended style."
              : `${cartCount} item${cartCount === 1 ? "" : "s"} ready for checkout.`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">
          {cartLines.length === 0 ? (
            <p className="py-8 text-sm text-muted-foreground">No items yet.</p>
          ) : (
            <ul className="divide-y">
              {cartLines.map((line) => (
                <li key={line.key} className="py-3">
                  <p className="text-sm font-medium">{line.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {line.qty}× {line.styleNumber} · {line.size}
                    {line.price > 0 ? ` · ${money(line.price)}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <SheetFooter>
          {cartLines.length > 0 ? (
            <p className="text-sm font-medium">Total {money(total)}</p>
          ) : null}
          <Button
            type="button"
            disabled={cartLines.length === 0}
            onClick={() =>
              toast.message("Checkout is not connected in this prototype")
            }
          >
            Checkout
          </Button>
          {cartLines.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                clearCart()
                toast.success("Cart cleared")
              }}
            >
              Clear cart
            </Button>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
