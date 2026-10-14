import {
  CART_ITEMS_KEY,
  CART_KEY,
  SESSION_KEY,
  cartCountFromLines,
  mergeCartLines,
  parseCartLines,
  type SessionRecord,
} from "@/lib/session"
import type { CartLine } from "@/lib/mock-data"

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

export function subscribeSession(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getSessionSnapshot() {
  if (typeof window === "undefined") return ""
  return window.localStorage.getItem(SESSION_KEY) ?? ""
}

export function getCartSnapshot() {
  if (typeof window === "undefined") return "[]"
  return window.localStorage.getItem(CART_ITEMS_KEY) ?? "[]"
}

export function persistSession(record: SessionRecord) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(record))
  emit()
}

export function persistSignOut() {
  window.localStorage.removeItem(SESSION_KEY)
  emit()
}

export function persistCartLines(incoming: CartLine[]) {
  const current = parseCartLines(window.localStorage.getItem(CART_ITEMS_KEY))
  const next = mergeCartLines(current, incoming)
  window.localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(next))
  window.localStorage.setItem(CART_KEY, String(cartCountFromLines(next)))
  emit()
}

export function persistCartIncrement() {
  persistCartLines([
    {
      key: `item-${Date.now()}`,
      name: "Program item",
      styleNumber: "SKU",
      size: "—",
      qty: 1,
      price: 0,
    },
  ])
}

export function persistClearCart() {
  window.localStorage.setItem(CART_ITEMS_KEY, "[]")
  window.localStorage.setItem(CART_KEY, "0")
  emit()
}

export function parseSession(raw: string): SessionRecord | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as SessionRecord
    if (!parsed?.name || !parsed?.id) return null
    return parsed
  } catch {
    return null
  }
}
