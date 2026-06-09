import type { LucideIcon } from "lucide-react"

import { CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type LessonEditorPanelTitleProps = {
  icon: LucideIcon
  title: string
  description: string
  iconClassName?: string
}

export function LessonEditorPanelTitle({
  icon: Icon,
  title,
  description,
  iconClassName,
}: LessonEditorPanelTitleProps) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded border",
          iconClassName ?? "border-primary/15 bg-primary/5 text-primary"
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
      </div>
    </div>
  )
}
