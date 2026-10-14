import { notFound } from "next/navigation"
import { ShopListing } from "@/components/shop-listing"
import { eligibility, money, type Department } from "@/lib/mock-data"
import {
  categoryLabel,
  departmentLabel,
  filterByList,
  isDepartment,
  isShopCategory,
  listLabel,
  productsInDepartment,
  subsidyProducts,
  type ShopCategory,
} from "@/lib/shop"

function listDescription(
  department: Department,
  category: ShopCategory,
  label: string
) {
  const who = departmentLabel[department]
  if (category === "footwear") {
    return `${who} footwear with the ${label} safety requirement.`
  }
  if (category === "apparel") {
    return `${who} ${label.toLowerCase()} in the apparel catalog.`
  }
  if (label === "Safety glasses" || label === "Goggles") {
    return `${who} ${label.toLowerCase()}.`
  }
  return `${who} eyewear in the ${label} list.`
}

export default async function ShopScopePage({
  params,
  searchParams,
}: {
  params: Promise<{ scope: string; category: string }>
  searchParams: Promise<{ list?: string | string[] }>
}) {
  const { scope, category } = await params
  const { list: rawList } = await searchParams
  if (!isShopCategory(category)) notFound()
  const list = typeof rawList === "string" ? rawList : undefined
  const info = eligibility[category]
  const name = categoryLabel[category]

  if (scope === "subsidy") {
    if (list) notFound()
    const amount = info.kind === "subsidy" ? money(info.subsidyAmount) : null
    return (
      <ShopListing
        eyebrow="Under subsidy"
        title={
          amount ? `${name} under ${amount}` : `${name} on your allotment`
        }
        description={
          amount
            ? `Styles priced at or under your ${amount} ${name.toLowerCase()} subsidy.`
            : `These styles draw from your apparel allotment: ${info.subsidyLabel}.`
        }
        badge={info.subsidyLabel}
        category={category}
        products={subsidyProducts(category)}
        showDepartment
        showAllotment={info.kind === "allotment"}
      />
    )
  }

  if (!isDepartment(scope)) notFound()
  const label = list ? listLabel(category, list) : null
  if (list && !label) notFound()
  const matched = filterByList(
    productsInDepartment(scope, category),
    category,
    list
  )
  if (!matched) notFound()
  const who = departmentLabel[scope]

  return (
    <ShopListing
      eyebrow={`${who} · ${name}`}
      title={label ?? `${who} ${name.toLowerCase()}`}
      description={
        label
          ? listDescription(scope, category, label)
          : `All ${name.toLowerCase()} in the ${who.toLowerCase()} catalog.`
      }
      note={
        info.kind === "subsidy"
          ? `Your ${name.toLowerCase()} subsidy is ${money(info.subsidyAmount)}.`
          : `Your apparel allotment is ${info.subsidyLabel}.`
      }
      category={category}
      products={matched}
    />
  )
}
