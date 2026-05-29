import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageTitleBarProps = {
  title: string
  actions?: ReactNode
  className?: string
}

export function PageTitleBar({
  title,
  actions,
  className,
}: PageTitleBarProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <h1 className="text-2xl font-semibold leading-8 text-foreground">
        {title}
      </h1>
      {actions ? (
        <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
      ) : null}
    </header>
  )
}
