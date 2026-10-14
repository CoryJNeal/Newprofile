import Link from "next/link"
import {
  BodyScanPanel,
  FaceScanPanel,
  FootScanPanel,
} from "@/components/scan-metrics"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getCategory, type CategoryId } from "@/lib/mock-data"

export function ModuleCard({ category }: { category: CategoryId }) {
  const meta = getCategory(category)
  if (!meta) return null

  const scanned = Boolean(meta.scanComplete)
  const canScan = Boolean(meta.scanHref)

  return (
    <article className="flex flex-col rounded-xl border bg-background p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-medium">{meta.label}</h3>
        {canScan ? (
          <Badge variant={scanned ? "secondary" : "outline"}>
            {scanned ? "Scan complete" : "Scan needed"}
          </Badge>
        ) : (
          <Badge variant="outline">No scan required</Badge>
        )}
      </div>

      <div className="mt-4 flex-1">
        {category === "eyewear" && scanned ? (
          <FaceScanPanel compact />
        ) : null}
        {category === "footwear" && scanned ? (
          <FootScanPanel compact />
        ) : null}
        {category === "apparel" && scanned ? (
          <BodyScanPanel compact />
        ) : null}
        {category === "uniforms" ? (
          <p className="text-sm text-muted-foreground">
            Approved Plant 4 styles are locked to print jobs and PiD codes. Fit
            comes from the apparel body scan when you need a size.
          </p>
        ) : null}
        {canScan && !scanned ? (
          <p className="text-sm text-muted-foreground">
            No {meta.scanType} scan is on file yet. Start a scan to size
            recommendations.
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {meta.scanHref && !scanned ? (
          <Link href={meta.scanHref} className={buttonVariants({ size: "sm" })}>
            Start scan
          </Link>
        ) : null}
        {meta.scanHref && scanned ? (
          <Link href={meta.scanHref} className={buttonVariants({ size: "sm" })}>
            Rescan
          </Link>
        ) : null}
        {meta.scanResultsHref && scanned ? (
          <Link
            href={meta.scanResultsHref}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Full scan results
          </Link>
        ) : null}
        {category === "uniforms" ? (
          <Link
            href={meta.moduleHref}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Open uniform program
          </Link>
        ) : null}
      </div>
    </article>
  )
}
