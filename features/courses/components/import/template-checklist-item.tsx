import { CheckCircle2 } from "lucide-react"

export function TemplateChecklistItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded border border-border/70 bg-background p-3">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
