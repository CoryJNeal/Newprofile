import {
  CART_KEY,
  SESSION_KEY,
  type SessionRecord,
} from "@/lib/session"

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
  if (typeof window === "undefined") return "2"
  return window.localStorage.getItem(CART_KEY) ?? "2"
}

export function persistSession(record: SessionRecord) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(record))
  emit()
}

export function persistSignOut() {
  window.localStorage.removeItem(SESSION_KEY)
  emit()
}

export function persistCartIncrement() {
  const current = Number(window.localStorage.getItem(CART_KEY) ?? "2")
  const next = Number.isFinite(current) ? current + 1 : 3
  window.localStorage.setItem(CART_KEY, String(next))
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
