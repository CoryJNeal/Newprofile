import { footScan } from "@/lib/mock-data"

type Hotspot = { x: number; y: number; intensity: number; radius: number }

const COLS = 18
const ROWS = 42
const MAX_KPA = 300

const LEFT_HOTSPOTS: Hotspot[] = [
  { x: 0.5, y: 0.84, intensity: 285, radius: 0.13 },
  { x: 0.36, y: 0.27, intensity: 268, radius: 0.1 },
  { x: 0.64, y: 0.3, intensity: 198, radius: 0.09 },
  { x: 0.3, y: 0.14, intensity: 210, radius: 0.07 },
  { x: 0.44, y: 0.16, intensity: 165, radius: 0.05 },
  { x: 0.52, y: 0.18, intensity: 120, radius: 0.05 },
  { x: 0.6, y: 0.2, intensity: 95, radius: 0.045 },
  { x: 0.68, y: 0.22, intensity: 78, radius: 0.04 },
  { x: 0.52, y: 0.56, intensity: 38, radius: 0.12 },
]

const RIGHT_HOTSPOTS: Hotspot[] = [
  { x: 0.5, y: 0.84, intensity: 188, radius: 0.13 },
  { x: 0.4, y: 0.28, intensity: 155, radius: 0.1 },
  { x: 0.6, y: 0.3, intensity: 148, radius: 0.09 },
  { x: 0.34, y: 0.15, intensity: 132, radius: 0.07 },
  { x: 0.46, y: 0.16, intensity: 118, radius: 0.05 },
  { x: 0.54, y: 0.18, intensity: 110, radius: 0.05 },
  { x: 0.62, y: 0.2, intensity: 96, radius: 0.045 },
  { x: 0.52, y: 0.56, intensity: 58, radius: 0.12 },
]

function inFoot(nx: number, ny: number) {
  const dx = (nx - 0.5) / 0.34
  const heel = Math.pow((ny - 0.82) / 0.16, 2) + Math.pow(dx, 2)
  const mid = Math.pow((ny - 0.52) / 0.28, 2) + Math.pow(dx / 0.78, 2)
  const ball = Math.pow((ny - 0.26) / 0.2, 2) + Math.pow(dx / 1.05, 2)
  const toes = Math.pow((ny - 0.12) / 0.12, 2) + Math.pow(dx / 0.95, 2)
  return heel <= 1 || mid <= 1 || ball <= 1 || (ny < 0.2 && toes <= 1)
}

function samplePressure(nx: number, ny: number, hotspots: Hotspot[]) {
  if (!inFoot(nx, ny)) return 0
  let value = 18
  for (const spot of hotspots) {
    const dx = (nx - spot.x) / spot.radius
    const dy = (ny - spot.y) / (spot.radius * 1.35)
    const dist = dx * dx + dy * dy
    value += spot.intensity * Math.exp(-dist * 2.15)
  }
  const archDip = Math.exp(-(((nx - 0.38) / 0.12) ** 2 + ((ny - 0.55) / 0.16) ** 2) * 3)
  value -= 70 * archDip
  return Math.max(8, Math.min(MAX_KPA, value))
}

function pressureColor(kpa: number) {
  const t = Math.max(0, Math.min(1, kpa / MAX_KPA))
  if (t < 0.2) return lerpColor("#0f172a", "#1d4ed8", t / 0.2)
  if (t < 0.4) return lerpColor("#1d4ed8", "#22c55e", (t - 0.2) / 0.2)
  if (t < 0.6) return lerpColor("#22c55e", "#eab308", (t - 0.4) / 0.2)
  if (t < 0.8) return lerpColor("#eab308", "#f97316", (t - 0.6) / 0.2)
  return lerpColor("#f97316", "#b91c1c", (t - 0.8) / 0.2)
}

function lerpColor(a: string, b: string, t: number) {
  const pa = hex(a)
  const pb = hex(b)
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t)
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t)
  const bch = Math.round(pa[2] + (pb[2] - pa[2]) * t)
  return `rgb(${r} ${g} ${bch})`
}

function hex(value: string): [number, number, number] {
  const n = value.replace("#", "")
  return [
    parseInt(n.slice(0, 2), 16),
    parseInt(n.slice(2, 4), 16),
    parseInt(n.slice(4, 6), 16),
  ]
}

function FootMap({
  side,
  label,
  hotspots,
}: {
  side: "left" | "right"
  label: string
  hotspots: Hotspot[]
}) {
  const cells: { x: number; y: number; w: number; h: number; fill: string }[] = []
  const invert = side === "right"
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const nx = (col + 0.5) / COLS
      const ny = (row + 0.5) / ROWS
      const mappedX = invert ? 1 - nx : nx
      const kpa = samplePressure(mappedX, ny, hotspots)
      if (kpa <= 0 || !inFoot(mappedX, ny)) continue
      cells.push({
        x: (col / COLS) * 120,
        y: (row / ROWS) * 280,
        w: 120 / COLS + 0.2,
        h: 280 / ROWS + 0.2,
        fill: pressureColor(kpa),
      })
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 120 280"
        className="h-72 w-[8.25rem]"
        role="img"
        aria-label={`${label} plantar pressure heatmap`}
      >
        <rect width="120" height="280" fill="#09090b" rx="8" />
        {cells.map((cell, i) => (
          <rect
            key={`${side}-${i}`}
            x={cell.x}
            y={cell.y}
            width={cell.w}
            height={cell.h}
            fill={cell.fill}
          />
        ))}
        <path
          d="M60 10c22 0 38 16 40 46 2 26-6 40-10 62-3 18-2 32 6 48 8 16 10 32 4 52-8 28-28 48-40 48s-32-20-40-48c-6-20-4-36 4-52 8-16 9-30 6-48-4-22-12-36-10-62C22 26 38 10 60 10z"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.5"
        />
      </svg>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

export function PressureHeatmap() {
  const peaks = footScan.pressurePeaks
  return (
    <div className="rounded-xl border bg-zinc-950 p-4 text-zinc-100">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-white">Plantar pressure heatmap</h3>
          <p className="text-sm text-zinc-400">
            Foot scan {footScan.scannedOn}. Values in {peaks.unit}. Red is peak
            load.
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
          <span className="mr-1">Low</span>
          <span className="h-2.5 w-8 rounded-full bg-linear-to-r from-blue-800 via-lime-500 to-red-700" />
          <span className="ml-1">Peak</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-8">
        <FootMap
          side="left"
          label={`Left · ${footScan.left.length} · ${footScan.left.width} · ${footScan.left.arch.toLowerCase()} arch`}
          hotspots={LEFT_HOTSPOTS}
        />
        <FootMap
          side="right"
          label={`Right · ${footScan.right.length} · ${footScan.right.width} · ${footScan.right.arch.toLowerCase()} arch`}
          hotspots={RIGHT_HOTSPOTS}
        />
      </div>
      <dl className="mt-5 grid gap-2 text-sm sm:grid-cols-4">
        <div className="rounded-md bg-white/5 px-3 py-2">
          <dt className="text-xs text-zinc-400">Left heel</dt>
          <dd className="font-medium text-red-400">{peaks.leftHeelKpa} kPa</dd>
        </div>
        <div className="rounded-md bg-white/5 px-3 py-2">
          <dt className="text-xs text-zinc-400">Left forefoot</dt>
          <dd className="font-medium text-orange-400">
            {peaks.leftForefootKpa} kPa
          </dd>
        </div>
        <div className="rounded-md bg-white/5 px-3 py-2">
          <dt className="text-xs text-zinc-400">Right heel</dt>
          <dd className="font-medium text-amber-300">
            {peaks.rightHeelKpa} kPa
          </dd>
        </div>
        <div className="rounded-md bg-white/5 px-3 py-2">
          <dt className="text-xs text-zinc-400">Right forefoot</dt>
          <dd className="font-medium text-lime-300">
            {peaks.rightForefootKpa} kPa
          </dd>
        </div>
      </dl>
    </div>
  )
}
