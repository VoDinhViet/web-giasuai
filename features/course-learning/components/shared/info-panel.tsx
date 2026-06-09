import type { LucideIcon } from "lucide-react"

interface InfoPanelProps {
  icon: LucideIcon
  title: string
  value: string
}

export function InfoPanel({
  icon: Icon,
  title,
  value,
}: InfoPanelProps) {
  return (
    <div className="flex gap-3 rounded border border-border/70 bg-background p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
