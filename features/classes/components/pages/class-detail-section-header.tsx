import type { LucideIcon } from "lucide-react"

type ClassDetailSectionHeaderProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function ClassDetailSectionHeader({
  icon: Icon,
  title,
  description,
}: ClassDetailSectionHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
