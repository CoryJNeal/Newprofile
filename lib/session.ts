export const SESSION_KEY = "ppe-program-session"
export const CART_KEY = "ppe-program-cart"

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

export function readCartCount() {
  if (typeof window === "undefined") return 2
  const raw = window.localStorage.getItem(CART_KEY)
  const n = raw ? Number(raw) : 2
  return Number.isFinite(n) ? n : 2
}

export function writeCartCount(count: number) {
  window.localStorage.setItem(CART_KEY, String(count))
}
