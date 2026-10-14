"use client"

import * as React from "react"
import { employee } from "@/lib/mock-data"
import {
  getCartSnapshot,
  getSessionSnapshot,
  parseSession,
  persistCartIncrement,
  persistSession,
  persistSignOut,
  subscribeSession,
} from "@/lib/session-store"
import type { SessionRecord } from "@/lib/session"

type SessionContextValue = {
  session: SessionRecord | null
  cartCount: number
  signIn: (record: SessionRecord) => void
  signOut: () => void
  addToCart: () => void
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
    () => "2"
  )
  const session = parseSession(raw)
  const cartCount = Number(cartRaw)

  const value = React.useMemo<SessionContextValue>(
    () => ({
      session,
      cartCount: Number.isFinite(cartCount) ? cartCount : 2,
      signIn: persistSession,
      signOut: persistSignOut,
      addToCart: persistCartIncrement,
    }),
    [session, cartCount]
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
