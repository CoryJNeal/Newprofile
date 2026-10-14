"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { useSession } from "@/components/session-provider"

function useIsClient() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { session } = useSession()
  const router = useRouter()
  const isClient = useIsClient()

  React.useEffect(() => {
    if (isClient && !session) {
      router.replace("/")
    }
  }, [isClient, session, router])

  if (!isClient || !session) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Loading program…
      </div>
    )
  }

  return <>{children}</>
}
