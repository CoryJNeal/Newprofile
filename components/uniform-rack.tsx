import { uniforms } from "@/lib/mock-data"

function ViewBox({ label }: { label: string }) {
  return (
    <div className="flex h-20 flex-1 items-center justify-center rounded-md border border-dashed bg-zinc-50 text-[11px] text-muted-foreground">
      {label}
    </div>
  )
}

export function UniformRack() {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="font-medium">Available uniforms</h3>
        <p className="text-sm text-muted-foreground">
          Approved program styles from Uniform Desk. Decoration is locked to
          Plant 4 print jobs.
        </p>
      </div>
      <ul className="space-y-3">
        {uniforms.map((style) => (
          <li
            key={style.styleNumber}
            className="rounded-xl border bg-background p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium">{style.name}</p>
                <p className="text-sm text-muted-foreground">
                  Style {style.styleNumber} · {style.pidCode}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Print {style.printJobSizes.join(", ")}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {style.decoration}
            </p>
            <div className="mt-3 flex gap-2">
              <ViewBox label="Front" />
              <ViewBox label="Side" />
              <ViewBox label="Back" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
