"use client"

import { Glasses, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Suspense, useState } from "react"
import {
  CatalogMenuButtons,
  CatalogMenuPanel,
  MobileCatalogNav,
} from "@/components/catalog-nav"
import { CartSheet } from "@/components/cart-sheet"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { session, signOut } = useSession()
  const [open, setOpen] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const homeActive = pathname === "/home"

  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(null)
    setMenuOpen(false)
  }

  function onSignOut() {
    signOut()
    router.replace("/")
  }

  return (
    <header
      className="sticky top-0 z-40 border-b bg-background"
      onMouseLeave={() => setOpen(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(null)
      }}
    >
      <div className="relative">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link href="/home" className="flex shrink-0 items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Glasses className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
                PPE Program
              </span>
              <span className="hidden text-sm font-medium sm:block">
                Northline Energy
              </span>
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto lg:flex">
            <Link
              href="/home"
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm font-medium whitespace-nowrap",
                homeActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              Program Home
            </Link>
            <CatalogMenuButtons open={open} onOpen={setOpen} />
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <CartSheet />
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-[10rem] truncate text-sm text-muted-foreground">
                {session?.name}
              </span>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                Sign out
              </Button>
            </div>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="lg:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Catalogs</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-2 pb-4">
                  <Link
                    href="/home"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Program Home
                  </Link>
                  <Suspense fallback={null}>
                    <MobileCatalogNav onNavigate={() => setMenuOpen(false)} />
                  </Suspense>
                  <div className="mt-4 border-t px-3 pt-4 text-sm">
                    <p className="text-muted-foreground">{session?.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={onSignOut}
                    >
                      Sign out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <Suspense fallback={null}>
          <CatalogMenuPanel menuId={open} onNavigate={() => setOpen(null)} />
        </Suspense>
      </div>
    </header>
  )
}
