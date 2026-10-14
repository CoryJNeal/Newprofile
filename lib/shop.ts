import {
  eligibility,
  money,
  products,
  type Department,
  type Product,
} from "@/lib/mock-data"

export const SHOP_CATEGORIES = ["footwear", "apparel", "eyewear"] as const
export type ShopCategory = (typeof SHOP_CATEGORIES)[number]

export const categoryLabel: Record<ShopCategory, string> = {
  footwear: "Footwear",
  apparel: "Apparel",
  eyewear: "Eyewear",
}

export const departmentLabel: Record<Department, string> = {
  mens: "Men's",
  womens: "Women's",
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const footwearMenu = [
  { label: "Composite toe", slug: "composite-toe" },
  { label: "Steel toe", slug: "steel-toe" },
  { label: "Electrical hazard (EH)", slug: "eh" },
  { label: "ASTM F2413", slug: "astm-f2413" },
] as const

const apparelMenu = (
  ["Shirts", "Pants", "Jackets", "Vests", "Outerwear"] as const
).map((label) => ({ label, slug: slugify(label) }))

const eyewearMenu = [
  { label: "Safety glasses", slug: "safety-glasses", field: "style" },
  { label: "Goggles", slug: "goggles", field: "style" },
  { label: "Rx-capable", slug: "rx-capable", field: "requirement" },
  { label: "Anti-fog", slug: "anti-fog", field: "requirement" },
] as const

export type CatalogLink = {
  href: string
  label: string
  meta?: string
}

export type CatalogGroup = {
  label: string
  links: CatalogLink[]
}

export type CatalogColumn = {
  title: string
  subtitle?: string
  shopAll?: CatalogLink
  links?: CatalogLink[]
  groups?: CatalogGroup[]
}

export type CatalogMenu = {
  id: string
  label: string
  match: string
  columns: CatalogColumn[]
}

export function isShopCategory(value: string): value is ShopCategory {
  return (SHOP_CATEGORIES as readonly string[]).includes(value)
}

export function isDepartment(value: string): value is Department {
  return value === "mens" || value === "womens"
}

export function listLabel(category: ShopCategory, slug: string) {
  const menu =
    category === "footwear"
      ? footwearMenu
      : category === "apparel"
        ? apparelMenu
        : eyewearMenu
  return menu.find((item) => item.slug === slug)?.label ?? null
}

export function productsInDepartment(
  department: Department,
  category: ShopCategory
) {
  return products.filter(
    (product) =>
      product.category === category &&
      product.departments?.includes(department)
  )
}

export function filterByList(
  items: Product[],
  category: ShopCategory,
  list: string | undefined
) {
  if (!list) return items
  if (category === "footwear") {
    if (!footwearMenu.some((item) => item.slug === list)) return null
    return items.filter((product) =>
      product.requirements.some((requirement) => slugify(requirement) === list)
    )
  }
  if (category === "apparel") {
    if (!apparelMenu.some((item) => item.slug === list)) return null
    return items.filter(
      (product) => product.apparelType && slugify(product.apparelType) === list
    )
  }
  const match = eyewearMenu.find((item) => item.slug === list)
  if (!match) return null
  if (match.field === "style") {
    return items.filter(
      (product) => product.eyewearStyle && slugify(product.eyewearStyle) === list
    )
  }
  return items.filter((product) =>
    product.requirements.some((requirement) => slugify(requirement) === list)
  )
}

export function subsidyProducts(category: ShopCategory) {
  const info = eligibility[category]
  const pool = products.filter((product) => product.category === category)
  if (info.kind === "subsidy") {
    return pool
      .filter((product) => product.price <= info.subsidyAmount)
      .sort(byPrice)
  }
  return pool.filter((product) => product.allotmentLine).sort(byPrice)
}

export function brandsFor(category: ShopCategory) {
  const names = new Set<string>()
  for (const product of products) {
    if (product.category === category && product.brand) names.add(product.brand)
  }
  return [...names].sort((a, b) => a.localeCompare(b))
}

export function brandNameFromSlug(slug: string, category: ShopCategory) {
  return brandsFor(category).find((brand) => slugify(brand) === slug)
}

export function productsForBrand(slug: string, category: ShopCategory) {
  return products
    .filter(
      (product) =>
        product.category === category &&
        product.brand != null &&
        slugify(product.brand) === slug
    )
    .sort(byPrice)
}

function byPrice(a: Product, b: Product) {
  return a.price - b.price || a.name.localeCompare(b.name)
}

function departmentHref(
  department: Department,
  category: ShopCategory,
  list?: string
) {
  const base = `/shop/${department}/${category}`
  return list ? `${base}?list=${list}` : base
}

function subsidyHref(category: ShopCategory) {
  return `/shop/subsidy/${category}`
}

function brandHref(brand: string, category: ShopCategory) {
  return `/shop/brand/${slugify(brand)}/${category}`
}

function departmentColumns(department: Department): CatalogColumn[] {
  return [
    {
      title: "Footwear",
      subtitle: "By safety requirement",
      shopAll: {
        href: departmentHref(department, "footwear"),
        label: "Shop all footwear",
      },
      links: footwearMenu.map((item) => ({
        href: departmentHref(department, "footwear", item.slug),
        label: item.label,
      })),
    },
    {
      title: "Apparel",
      subtitle: "By type",
      shopAll: {
        href: departmentHref(department, "apparel"),
        label: "Shop all apparel",
      },
      links: apparelMenu.map((item) => ({
        href: departmentHref(department, "apparel", item.slug),
        label: item.label,
      })),
    },
    {
      title: "Eyewear",
      subtitle: "Choose a list",
      shopAll: {
        href: departmentHref(department, "eyewear"),
        label: "Shop all eyewear",
      },
      links: eyewearMenu.map((item) => ({
        href: departmentHref(department, "eyewear", item.slug),
        label: item.label,
      })),
    },
  ]
}

function subsidyColumns(): CatalogColumn[] {
  return (["footwear", "eyewear", "apparel"] as const).map((category) => {
    const info = eligibility[category]
    const amount =
      info.kind === "subsidy" ? money(info.subsidyAmount) : null
    return {
      title: categoryLabel[category],
      subtitle: amount ? `${amount} remaining` : info.subsidyLabel,
      links: [
        {
          href: subsidyHref(category),
          label: `Shop ${categoryLabel[category].toLowerCase()}`,
        },
      ],
    }
  })
}

function brandColumns(): CatalogColumn[] {
  const order: ShopCategory[] = ["footwear", "eyewear", "apparel"]
  return order.map((category) => ({
    title: categoryLabel[category],
    links: brandsFor(category).map((brand) => ({
      href: brandHref(brand, category),
      label: brand,
    })),
  }))
}

function buildCatalogMenus(): CatalogMenu[] {
  return [
    {
      id: "mens",
      label: "Men's",
      match: "/shop/mens",
      columns: departmentColumns("mens"),
    },
    {
      id: "womens",
      label: "Women's",
      match: "/shop/womens",
      columns: departmentColumns("womens"),
    },
    {
      id: "subsidy",
      label: "Under subsidy",
      match: "/shop/subsidy",
      columns: subsidyColumns(),
    },
    {
      id: "brands",
      label: "Brands",
      match: "/shop/brand",
      columns: brandColumns(),
    },
  ]
}

function productsForMenuHref(href: string) {
  const url = new URL(href, "https://catalog.local")
  const parts = url.pathname.split("/").filter(Boolean)
  const list = url.searchParams.get("list") ?? undefined
  if (parts[0] !== "shop" || !parts[1]) return []

  let matched: Product[] = []
  if (parts[1] === "brand") {
    const brand = parts[2]
    const category = parts[3]
    if (!brand || !category || !isShopCategory(category)) return []
    matched = productsForBrand(brand, category)
  } else {
    const category = parts[2]
    if (!category || !isShopCategory(category)) return []
    if (parts[1] === "subsidy") matched = subsidyProducts(category)
    else if (isDepartment(parts[1])) {
      const filtered = filterByList(
        productsInDepartment(parts[1], category),
        category,
        list
      )
      matched = filtered ?? []
    }
  }

  return matched
}

function assertMenus(menus: CatalogMenu[]) {
  const missing: string[] = []
  for (const menu of menus) {
    for (const column of menu.columns) {
      const links = [
        ...(column.shopAll ? [column.shopAll] : []),
        ...(column.links ?? []),
        ...(column.groups?.flatMap((group) => group.links) ?? []),
      ]
      for (const link of links) {
        if (productsForMenuHref(link.href).length === 0) {
          missing.push(`${menu.label} / ${column.title} / ${link.label}`)
        }
      }
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `Catalog menu links have no styles:\n${missing.join("\n")}`
    )
  }
}

export const catalogMenus = buildCatalogMenus()

assertMenus(catalogMenus)
