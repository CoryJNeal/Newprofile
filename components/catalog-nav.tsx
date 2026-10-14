"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { catalogMenus, type CatalogColumn, type CatalogLink } from "@/lib/shop"
import { cn } from "@/lib/utils"

function isCurrent(href: string, pathname: string, list: string | null) {
  const url = new URL(href, "https://catalog.local")
  if (url.hash) return false
  if (url.pathname !== pathname) return false
  return (url.searchParams.get("list") ?? null) === list
}

function CatalogAnchor({
  link,
  pathname,
  list,
  onNavigate,
  prominent = false,
}: {
  link: CatalogLink
  pathname: string
  list: string | null
  onNavigate: () => void
  prominent?: boolean
}) {
  const active = isCurrent(link.href, pathname, list)
  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group flex items-baseline justify-between gap-4 rounded-sm py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        (prominent || active) && "font-medium",
        active
          ? "text-foreground"
          : prominent
            ? "text-foreground hover:underline"
            : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span className={cn(!prominent && !active && "group-hover:underline")}>
        {link.label}
      </span>
      {link.meta ? (
        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
          {link.meta}
        </span>
      ) : null}
    </Link>
  )
}

function ColumnBody({
  column,
  pathname,
  list,
  onNavigate,
}: {
  column: CatalogColumn
  pathname: string
  list: string | null
  onNavigate: () => void
}) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-foreground uppercase">
        {column.title}
      </p>
      {column.subtitle ? (
        <p className="mt-1 text-xs text-muted-foreground">{column.subtitle}</p>
      ) : null}
      {column.shopAll ? (
        <div className="mt-3 border-b pb-2">
          <CatalogAnchor
            link={column.shopAll}
            pathname={pathname}
            list={list}
            onNavigate={onNavigate}
            prominent
          />
        </div>
      ) : null}
      {column.links ? (
        <ul className="mt-2">
          {column.links.map((link) => (
            <li key={link.href}>
              <CatalogAnchor
                link={link}
                pathname={pathname}
                list={list}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      ) : null}
      {column.groups?.map((group) => (
        <div key={group.label} className="mt-4">
          <p className="text-xs font-semibold text-foreground">{group.label}</p>
          <ul className="mt-1">
            {group.links.map((link) => (
              <li key={link.href}>
                <CatalogAnchor
                  link={link}
                  pathname={pathname}
                  list={list}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function CatalogMenuButtons({
  open,
  onOpen,
}: {
  open: string | null
  onOpen: (id: string) => void
}) {
  const pathname = usePathname()

  return (
    <>
      {catalogMenus.map((menu) => {
        const active =
          pathname === menu.match || pathname.startsWith(`${menu.match}/`)
        const expanded = open === menu.id
        return (
          <button
            key={menu.id}
            type="button"
            aria-expanded={expanded}
            aria-controls="catalog-panel"
            onMouseEnter={() => onOpen(menu.id)}
            onClick={() => onOpen(menu.id)}
            onKeyDown={(event) => {
              if (
                event.key !== "Enter" &&
                event.key !== " " &&
                event.key !== "ArrowDown"
              ) {
                return
              }
              event.preventDefault()
              onOpen(menu.id)
              requestAnimationFrame(() => {
                document.querySelector<HTMLElement>("#catalog-panel a")?.focus()
              })
            }}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium whitespace-nowrap",
              expanded || active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {menu.label}
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform",
                expanded && "rotate-180"
              )}
            />
          </button>
        )
      })}
    </>
  )
}

export function CatalogMenuPanel({
  menuId,
  onNavigate,
}: {
  menuId: string | null
  onNavigate: () => void
}) {
  const pathname = usePathname()
  const list = useSearchParams().get("list")
  const menu = catalogMenus.find((item) => item.id === menuId)
  if (!menu) return null

  return (
    <div
      id="catalog-panel"
      className="absolute inset-x-0 top-full z-50 hidden border-t bg-background shadow-lg lg:block"
    >
      <div className="mx-auto grid max-h-[min(34rem,calc(100vh-4.5rem))] max-w-6xl grid-cols-3 gap-x-8 overflow-y-auto overscroll-contain px-8 py-8">
        {menu.columns.map((column, index) => (
          <div
            key={column.title}
            className={cn(index > 0 && "border-l border-border pl-8")}
          >
            <ColumnBody
              column={column}
              pathname={pathname}
              list={list}
              onNavigate={onNavigate}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MobileCatalogNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname()
  const list = useSearchParams().get("list")

  return (
    <div className="flex flex-col">
      {catalogMenus.map((menu) => (
        <details key={menu.id} className="group/menu border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-sm font-medium [&::-webkit-details-marker]:hidden">
            {menu.label}
            <ChevronDown className="size-4 text-muted-foreground transition-transform group-open/menu:rotate-180" />
          </summary>
          <div className="space-y-5 px-3 pb-4">
            {menu.columns.map((column) => (
              <ColumnBody
                key={column.title}
                column={column}
                pathname={pathname}
                list={list}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
