import type { CartLine } from "@/lib/mock-data"

export const SESSION_KEY = "ppe-program-session"
export const CART_KEY = "ppe-program-cart"
export const CART_ITEMS_KEY = "ppe-program-cart-items"

export type SessionRecord = {
  name: string
  id: string
}

export function readSession(): SessionRecord | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SessionRecord
    if (!parsed?.name || !parsed?.id) return null
    return parsed
  } catch {
    return null
  }
}

export function writeSession(session: SessionRecord) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY)
}

export function parseCartLines(raw: string | null): CartLine[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as CartLine[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line) => line?.name && line?.styleNumber && Number(line.qty) > 0
    )
  } catch {
    return []
  }
}

export function cartCountFromLines(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.qty, 0)
}

export function mergeCartLines(existing: CartLine[], incoming: CartLine[]) {
  const next = [...existing]
  for (const line of incoming) {
    const match = next.find(
      (item) =>
        item.styleNumber === line.styleNumber && item.size === line.size
    )
    if (match) {
      match.qty += line.qty
    } else {
      next.push({ ...line })
    }
  }
  return next
}
