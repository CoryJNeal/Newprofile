import { PressureHeatmap } from "@/components/pressure-heatmap"
import {
  apparelRecommendations,
  bodyScan,
  eyewearRecommendations,
  faceScan,
  footScan,
  footwearRecommendations,
} from "@/lib/mock-data"

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 px-3 py-2">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  )
}

function Recs({
  items,
}: {
  items: { name: string; styleNumber: string; why: string }[]
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.styleNumber} className="text-sm">
          <span className="font-medium">{item.name}</span>
          <span className="text-muted-foreground"> · {item.styleNumber}</span>
          <p className="text-muted-foreground">{item.why}</p>
        </li>
      ))}
    </ul>
  )
}

export function FaceScanPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-4">
      <div>
        {compact ? null : <h3 className="font-medium">Face scan</h3>}
        <p className="text-sm text-muted-foreground">
          Captured {faceScan.scannedOn}
          {compact
            ? ". PD, width, and temple length for Z87.1 frame fit."
            : ". Used to recommend frame size and Rx insert."}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Metric label="Pupillary distance" value={faceScan.pd} />
        <Metric label="Face width" value={faceScan.faceWidth} />
        <Metric label="Temple length" value={faceScan.templeLength} />
        <Metric label="Bridge" value={faceScan.bridge} />
      </dl>
      {compact ? null : (
        <>
          <p className="text-sm text-muted-foreground">{faceScan.notes}</p>
          <div>
            <h4 className="text-sm font-medium">Recommended frames</h4>
            <div className="mt-2">
              <Recs items={eyewearRecommendations} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export function FootScanPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-4">
      <div>
        {compact ? null : <h3 className="font-medium">Foot scan</h3>}
        <p className="text-sm text-muted-foreground">
          Captured {footScan.scannedOn}. Recommended size {footScan.recommendedSize}{" "}
          on a {footScan.recommendedLast.toLowerCase()}.
        </p>
      </div>
      <PressureHeatmap compact={compact} />
      {compact ? null : (
        <>
          <p className="text-sm text-muted-foreground">{footScan.hotspots}</p>
          <div>
            <h4 className="text-sm font-medium">Recommended footwear</h4>
            <div className="mt-2">
              <Recs items={footwearRecommendations} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export function BodyScanPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-4">
      <div>
        {compact ? null : <h3 className="font-medium">Body scan</h3>}
        <p className="text-sm text-muted-foreground">
          Captured {bodyScan.scannedOn}. Shirt {bodyScan.recommendedShirt}, pant{" "}
          {bodyScan.recommendedPant}.
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Metric label="Chest" value={bodyScan.chest} />
        <Metric label="Waist" value={bodyScan.waist} />
        <Metric label="Inseam" value={bodyScan.inseam} />
        <Metric label="Sleeve" value={bodyScan.sleeve} />
      </dl>
      {compact ? null : (
        <>
          <p className="text-sm text-muted-foreground">{bodyScan.notes}</p>
          <div>
            <h4 className="text-sm font-medium">Sizing recommendations</h4>
            <div className="mt-2">
              <Recs items={apparelRecommendations} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}
