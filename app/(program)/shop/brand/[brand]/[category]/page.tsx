import { notFound } from "next/navigation"
import { ShopListing } from "@/components/shop-listing"
import {
  brandNameFromSlug,
  categoryLabel,
  isShopCategory,
  productsForBrand,
} from "@/lib/shop"

export default async function BrandShopPage({
  params,
}: {
  params: Promise<{ brand: string; category: string }>
}) {
  const { brand: brandSlug, category } = await params
  if (!isShopCategory(category)) notFound()
  const brand = brandNameFromSlug(brandSlug, category)
  if (!brand) notFound()
  const name = categoryLabel[category]

  return (
    <ShopListing
      eyebrow={`Brands · ${name}`}
      title={brand}
      description={`${brand} styles in the ${name.toLowerCase()} catalog.`}
      category={category}
      products={productsForBrand(brandSlug, category)}
      showDepartment
    />
  )
}
