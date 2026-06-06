import type { LucideIcon } from "lucide-react"

import { CardTitle } from "@/components/ui/card"

export function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon
  title: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 shrink-0" />
      <CardTitle>{title}</CardTitle>
    </div>
  )
}
