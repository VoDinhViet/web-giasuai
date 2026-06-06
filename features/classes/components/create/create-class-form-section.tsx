import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type CreateClassFormSectionProps = {
  icon: LucideIcon
  title: string
  description?: string
  children: ReactNode
}

export function CreateClassFormSection({
  icon: Icon,
  title,
  description,
  children,
}: CreateClassFormSectionProps) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-row items-start gap-3 border-b border-border/70 p-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          {description ? (
            <CardDescription className="mt-1">{description}</CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  )
}
