"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"

export function ScanCapture({
  backHref,
  steps,
}: {
  backHref: string
  steps: string[]
}) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl border bg-zinc-950 aspect-[4/5] sm:aspect-[4/3]">
        <div className="absolute inset-6 rounded-lg border border-dashed border-white/40" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-teal-400/70" />
        <p className="absolute inset-x-0 bottom-6 text-center text-xs text-white/70">
          Camera preview is not connected in this prototype
        </p>
      </div>
      <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="lg"
          onClick={() =>
            toast.message("Scanner would launch on a device with a camera")
          }
        >
          Begin scan
        </Button>
        <Link href={backHref} className={buttonVariants({ variant: "outline", size: "lg" })}>
          Back
        </Link>
      </div>
    </div>
  )
}
