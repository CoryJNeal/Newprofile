"use client"

import { SessionProvider } from "@/components/session-provider"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-center" theme="light" />
    </SessionProvider>
  )
}
