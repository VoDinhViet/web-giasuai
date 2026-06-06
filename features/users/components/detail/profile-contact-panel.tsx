import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ContactTone = "info" | "success" | "violet" | "warning"

export type ProfileContactRow = {
  icon: LucideIcon
  label: string
  tone: ContactTone
  value: string
}

const contactToneClassNames = {
  info: "bg-secondary/10 text-secondary",
  success: "bg-success/10 text-success",
  violet: "bg-primary/10 text-primary",
  warning: "bg-tertiary/10 text-tertiary",
} satisfies Record<ContactTone, string>

type ProfileContactPanelProps = {
  rows: ProfileContactRow[]
}

export function ProfileContactPanel({ rows }: ProfileContactPanelProps) {
  return (
    <Card data-tone="info">
      <CardHeader>
        <CardTitle>Thông tin nhanh</CardTitle>
        <CardDescription>Kênh liên hệ và trạng thái tài khoản.</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3">
          {rows.map(({ icon: Icon, label, value, tone }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-3 rounded bg-card p-3 ring-1 ring-border/70"
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded",
                  contactToneClassNames[tone]
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <dt className="text-xs font-semibold uppercase text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 break-words text-sm font-medium text-foreground">
                  {value || "Chưa cập nhật"}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
