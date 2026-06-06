import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SectionTitle } from "./section-title"

export function ReviewMetric({
  icon,
  label,
  value,
  helper,
  tone,
}: {
  icon: LucideIcon
  label: string
  value: string
  helper: string
  tone: "default" | "success" | "warning" | "danger"
}) {
  return (
    <Card size="sm" data-tone={tone}>
      <CardHeader>
        <SectionTitle icon={icon} title={label} />
      </CardHeader>
      <CardContent>
        <CardTitle>{value}</CardTitle>
        <CardDescription>{helper}</CardDescription>
      </CardContent>
    </Card>
  )
}
