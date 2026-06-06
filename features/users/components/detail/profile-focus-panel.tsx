import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type ProfileFocusItem = {
  helper: string
  title: string
  value: number
}

type ProfileFocusPanelProps = {
  icon: LucideIcon
  title: string
  values: ProfileFocusItem[]
}

export function ProfileFocusPanel({
  icon: Icon,
  title,
  values,
}: ProfileFocusPanelProps) {
  return (
    <Card data-tone="warning">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="size-4 shrink-0" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>Theo dõi nhanh các điểm cần giữ nhịp.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="grid gap-2 rounded bg-card p-3 ring-1 ring-border/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="grid size-6 shrink-0 place-items-center rounded bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20">
                      {index + 1}
                    </span>
                    <p className="font-medium text-foreground">{value.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {value.helper}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-foreground">
                  {value.value}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded bg-muted">
                <div
                  className="h-full rounded bg-primary"
                  style={{ width: `${value.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
