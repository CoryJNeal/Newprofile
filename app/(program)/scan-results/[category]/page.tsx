import Link from "next/link"
import { notFound } from "next/navigation"
import { BodyScanPanel, FaceScanPanel, FootScanPanel } from "@/components/scan-metrics"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getCategory, type CategoryId } from "@/lib/mock-data"

const ids: CategoryId[] = ["eyewear", "footwear", "apparel", "uniforms"]

function isCategory(value: string): value is CategoryId {
  return ids.includes(value as CategoryId)
}

export default async function ScanResultsPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: raw } = await params
  if (!isCategory(raw)) notFound()
  const meta = getCategory(raw)
  if (!meta?.scanResultsHref) notFound()

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
            Scan results
          </p>
          <h1 className="text-2xl font-medium tracking-tight">
            {meta.label} scan
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {raw === "footwear"
              ? "Footwear scanning is complete. Review the plantar pressure heatmap, then open recommended boots matched to this last."
              : `Your ${meta.scanType} scan is on file and is used to size ${meta.label.toLowerCase()} recommendations.`}
          </p>
        </div>
        <Badge variant="secondary">Scan complete</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href={meta.recommendedHref}
          className={buttonVariants({ size: "sm" })}
        >
          See recommended options
        </Link>
        <Link
          href={meta.catalogHref}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Shop full catalog
        </Link>
        {meta.scanHref ? (
          <Link
            href={meta.scanHref}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Rescan
          </Link>
        ) : null}
      </div>
      {raw === "footwear" ? <FootScanPanel /> : null}
      {raw === "eyewear" ? <FaceScanPanel /> : null}
      {raw === "apparel" ? <BodyScanPanel /> : null}
    </div>
  )
}
