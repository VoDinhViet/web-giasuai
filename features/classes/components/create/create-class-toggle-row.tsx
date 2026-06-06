import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type CreateClassToggleRowProps = {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CreateClassToggleRow({
  title,
  description,
  checked,
  onChange,
}: CreateClassToggleRowProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      className={cn(
        "flex w-full items-start justify-between gap-4 rounded border px-4 py-3 text-left transition-colors",
        checked
          ? "border-primary/35 bg-primary/5 text-foreground"
          : "border-border/70 bg-background text-foreground hover:bg-muted/30"
      )}
      onClick={() => onChange(!checked)}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded border",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-transparent"
        )}
      >
        <Check className="size-3.5" />
      </span>
    </button>
  )
}
