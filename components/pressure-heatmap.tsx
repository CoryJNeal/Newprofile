function Foot({
  id,
  label,
  invert = false,
}: {
  id: string
  label: string
  invert?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 120 280"
        className="h-64 w-[7.5rem]"
        role="img"
        aria-label={`${label} plantar pressure`}
      >
        <defs>
          <radialGradient id={`${id}-heel`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id={`${id}-ball`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id={`${id}-arch`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <path
          d="M60 12c22 0 38 18 40 48 2 26-6 40-10 62-3 18-2 32 6 48 8 16 10 32 4 52-8 28-28 46-40 46s-32-18-40-46c-6-20-4-36 4-52 8-16 9-30 6-48-4-22-12-36-10-62C22 30 38 12 60 12z"
          fill="#e4e4e7"
          stroke="#a1a1aa"
          strokeWidth="1.5"
          transform={invert ? "translate(120,0) scale(-1,1)" : undefined}
        />
        <ellipse cx={invert ? 56 : 64} cy="52" rx="22" ry="26" fill={`url(#${id}-ball)`} />
        <ellipse cx={invert ? 48 : 72} cy="46" rx="10" ry="12" fill="#b91c1c" opacity="0.55" />
        <ellipse cx={invert ? 70 : 50} cy="130" rx="14" ry="28" fill={`url(#${id}-arch)`} />
        <ellipse cx="60" cy="220" rx="24" ry="22" fill={`url(#${id}-heel)`} />
      </svg>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

export function PressureHeatmap() {
  return (
    <div className="rounded-xl border bg-zinc-50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-medium">Plantar pressure</h3>
          <p className="text-sm text-muted-foreground">
            Last scan June 18, 2026. Red is peak load.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="size-2.5 rounded-full bg-sky-400" /> Low
          <span className="size-2.5 rounded-full bg-amber-500" /> Moderate
          <span className="size-2.5 rounded-full bg-red-600" /> Peak
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-8">
        <Foot id="left" label="Left — 278 mm · EE · low arch" />
        <Foot id="right" label="Right — 276 mm · E · low arch" invert />
      </div>
    </div>
  )
}
