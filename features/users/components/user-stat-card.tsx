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
    <div className="rounded-lg border border-border/70 bg-card p-4 text-sm text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:border-border sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="pt-0.5 text-xs leading-5 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {label}
        </h3>
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-md",
            userStatToneClassNames[tone]
          )}
        >
          <Icon className="size-4.5 stroke-[2.25]" />
        </span>
      </div>
      <div className="mt-4">
        <p className="text-[1.7rem] leading-8 font-semibold tracking-tight text-foreground">
          {value}
        </p>
        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
          {helper}
        </p>
      </div>
    </div>
  )
}
