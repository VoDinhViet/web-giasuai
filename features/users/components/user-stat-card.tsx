import type { ComponentType } from "react"

import { cn } from "@/lib/utils"

type UserStatTone = "primary" | "info" | "success" | "danger"

const userStatToneClassNames: Record<UserStatTone, string> = {
  primary: "bg-primary/10 text-primary",
  info: "bg-secondary/10 text-secondary",
  success: "bg-success/10 text-success",
  danger: "bg-destructive/10 text-destructive",
}

export type UserStatCardProps = {
  label: string
  value: string
  helper: string
  icon: ComponentType<{ className?: string }>
  tone: UserStatTone
}

export function UserStatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
}: UserStatCardProps) {
  return (
    <div className="rounded border border-border/80 bg-card p-4 text-sm text-card-foreground shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm leading-5 font-semibold text-foreground">
          {label}
        </h3>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded",
            userStatToneClassNames[tone]
          )}
        >
          <Icon className="size-4 stroke-[2.5]" />
        </span>
      </div>
      <div className="mt-3">
        <p className="text-2xl leading-8 font-semibold tracking-tight text-foreground">
          {value}
        </p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {helper}
        </p>
      </div>
    </div>
  )
}
