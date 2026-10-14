import { Glasses } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Glasses className="size-4" />
          </span>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
              PPE Program
            </p>
            <p className="text-sm text-muted-foreground">Northline Energy</p>
          </div>
        </div>
        <div className="rounded-xl border bg-background p-6">
          <h1 className="text-xl font-medium">Employee sign-in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your user name and employee ID # to open your PPE
            program — eyewear, footwear, apparel, and uniforms assigned to your
            role and site.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          This is a prototype. No password is stored and nothing is sent to a
          server.
        </p>
      </div>
    </main>
  )
}
