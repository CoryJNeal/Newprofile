"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEMO_ID, DEMO_USER, employee, isDemoEmployee } from "@/lib/mock-data"

export function LoginForm() {
  const router = useRouter()
  const { session, signIn } = useSession()
  const [user, setUser] = React.useState("")
  const [id, setId] = React.useState("")
  const [userError, setUserError] = React.useState("")
  const [idError, setIdError] = React.useState("")
  const [formError, setFormError] = React.useState("")

  React.useEffect(() => {
    if (session) {
      router.replace("/home")
    }
  }, [session, router])

  function fillDemo() {
    setUser(DEMO_USER)
    setId(DEMO_ID)
    setUserError("")
    setIdError("")
    setFormError("")
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextUserError = user.trim() ? "" : "Enter your user name."
    const nextIdError = id.trim() ? "" : "Enter your employee ID #."
    setUserError(nextUserError)
    setIdError(nextIdError)
    setFormError("")
    if (nextUserError || nextIdError) return

    if (!isDemoEmployee(user, id)) {
      setFormError("Employee not found. Check the user name and ID #.")
      return
    }

    signIn({ name: employee.name, id: employee.id })
    router.push("/home")
  }

  if (session) {
    return (
      <div className="text-sm text-muted-foreground">Opening program…</div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="user">User</Label>
        <Input
          id="user"
          name="user"
          autoComplete="username"
          value={user}
          onChange={(e) => {
            setUser(e.target.value)
            setUserError("")
            setFormError("")
          }}
          aria-invalid={Boolean(userError)}
          placeholder="First and last name"
        />
        {userError ? (
          <p className="text-xs text-destructive">{userError}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="employee-id">ID #</Label>
        <Input
          id="employee-id"
          name="employee-id"
          inputMode="numeric"
          autoComplete="off"
          value={id}
          onChange={(e) => {
            setId(e.target.value)
            setIdError("")
            setFormError("")
          }}
          aria-invalid={Boolean(idError)}
          placeholder="Employee ID"
        />
        {idError ? <p className="text-xs text-destructive">{idError}</p> : null}
      </div>
      {formError ? (
        <p className="text-sm text-destructive">{formError}</p>
      ) : null}
      <Button type="submit" className="w-full" size="lg">
        Sign in to your program
      </Button>
      <div className="rounded-lg border bg-muted/40 px-3 py-3 text-sm">
        <p className="font-medium text-foreground">Demo employee</p>
        <p className="mt-1 text-muted-foreground">
          User <span className="font-medium text-foreground">{DEMO_USER}</span>
          {" · "}
          ID # <span className="font-medium text-foreground">{DEMO_ID}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={fillDemo}
        >
          Use demo employee
        </Button>
      </div>
    </form>
  )
}
