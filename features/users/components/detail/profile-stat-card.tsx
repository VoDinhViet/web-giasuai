import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProfileCardTone =
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "violet"

export type ProfileStatTone = "primary" | "sky" | "orange" | "green"

export type ProfileStatItem = {
  icon: LucideIcon
  label: string
  tone: ProfileStatTone
  value: string
}

const statToneMap = {
  primary: "violet",
  sky: "info",
  orange: "warning",
  green: "success",
} satisfies Record<ProfileStatTone, ProfileCardTone>

export function ProfileStatCard({
  icon: Icon,
  label,
  tone,
  value,
}: ProfileStatItem) {
  return (
    <Card size="sm" data-tone={statToneMap[tone]}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="size-4 shrink-0" />
          <CardTitle>{label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{value}</CardTitle>
      </CardContent>
    </Card>
  )
}
