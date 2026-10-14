"use client"

import * as React from "react"
import { employee, type CartLine } from "@/lib/mock-data"
import {
  getCartSnapshot,
  getSessionSnapshot,
  parseSession,
  persistCartIncrement,
  persistCartLines,
  persistClearCart,
  persistSession,
  persistSignOut,
  subscribeSession,
} from "@/lib/session-store"
import { cartCountFromLines, parseCartLines } from "@/lib/session"

type SessionContextValue = {
  session: ReturnType<typeof parseSession>
  cartCount: number
  cartLines: CartLine[]
  signIn: (record: { name: string; id: string }) => void
  signOut: () => void
  addToCart: () => void
  addLines: (lines: CartLine[]) => void
  clearCart: () => void
}

const SessionContext = React.createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const raw = React.useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    () => ""
  )
  const cartRaw = React.useSyncExternalStore(
    subscribeSession,
    getCartSnapshot,
    () => "[]"
  )
  const session = parseSession(raw)
  const cartLines = parseCartLines(cartRaw)
  const cartCount = cartCountFromLines(cartLines)

  const value = React.useMemo<SessionContextValue>(
    () => ({
      session,
      cartCount,
      cartLines,
      signIn: persistSession,
      signOut: persistSignOut,
      addToCart: persistCartIncrement,
      addLines: persistCartLines,
      clearCart: persistClearCart,
    }),
    [session, cartCount, cartLines]
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = React.useContext(SessionContext)
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider")
  }
  return ctx
}

export function useEmployee() {
  return employee
}
