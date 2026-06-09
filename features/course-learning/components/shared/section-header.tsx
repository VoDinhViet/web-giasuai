import type { LucideIcon } from "lucide-react"
import { CardDescription, CardTitle } from "@/components/ui/card"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  description: string
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex min-w-0 gap-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </div>
  )
}
