import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type ProfileTimelineRow = {
  time: string
  title: string
}

type ProfileTimelinePanelProps = {
  icon: LucideIcon
  rows: ProfileTimelineRow[]
  title: string
}

export function ProfileTimelinePanel({
  icon: Icon,
  rows,
  title,
}: ProfileTimelinePanelProps) {
  return (
    <Card data-tone="success">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="size-4 shrink-0" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          {rows.map((row) => (
            <div
              key={row.title}
              className="relative grid gap-1 py-3 pl-7 not-last:border-b not-last:border-border/70"
            >
              <span className="absolute top-4 left-1 grid size-4 place-items-center rounded-full bg-success/15 ring-1 ring-success/30">
                <span className="size-1.5 rounded-full bg-success" />
              </span>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{row.title}</CardTitle>
              </div>
              <CardDescription>{row.time}</CardDescription>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
