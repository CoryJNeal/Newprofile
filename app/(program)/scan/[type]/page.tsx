import { notFound } from "next/navigation"
import { ScanCapture } from "@/components/scan-capture"
import type { ScanType } from "@/lib/mock-data"

const scans: Record<
  ScanType,
  { title: string; backHref: string; body: string; steps: string[] }
> = {
  face: {
    title: "Face scanner",
    backHref: "/eyewear",
    body: "Hold the device at eye level. The scan captures pupillary distance, face width, and temple length for Z87.1 frame fit.",
    steps: [
      "Remove glasses and hats",
      "Look straight at the camera",
      "Turn slowly left, then right",
    ],
  },
  foot: {
    title: "Foot scanner",
    backHref: "/footwear",
    body: "Stand evenly on the scan plate. The mock captures length, width, arch, and plantar pressure for safety-boot last matching.",
    steps: [
      "Remove socks and insoles",
      "Stand with equal weight on both feet",
      "Hold still for the pressure pass",
    ],
  },
  body: {
    title: "Body scanner",
    backHref: "/apparel",
    body: "Stand in the frame in a base layer. The scan estimates chest, waist, inseam, and sleeve for FR and hi-vis sizing.",
    steps: [
      "Wear a fitted shirt",
      "Stand with arms slightly out",
      "Hold the pose until the ring completes",
    ],
  },
}

function isScanType(value: string): value is ScanType {
  return value === "face" || value === "foot" || value === "body"
}

export default async function ScanPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  if (!isScanType(type)) notFound()
  const scan = scans[type]

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
          Scanner mock
        </p>
        <h1 className="text-2xl font-medium tracking-tight">{scan.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{scan.body}</p>
      </div>
      <ScanCapture backHref={scan.backHref} steps={scan.steps} />
    </div>
  )
}
