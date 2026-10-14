import type { ReactNode } from "react"
import { AuthGate } from "@/components/auth-gate"
import { SiteHeader } from "@/components/site-header"

export default function ProgramLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <div className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
      </div>
    </AuthGate>
  )
}
