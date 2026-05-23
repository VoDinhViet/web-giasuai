import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type PageHeaderBreadcrumb = {
  label: string
}

type PageHeaderProps = {
  title: string
  breadcrumbs?: PageHeaderBreadcrumb[]
  actions?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  breadcrumbs = [],
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              {breadcrumbs.map((breadcrumb, breadcrumbIndex) => {
                const isCurrentPage =
                  breadcrumbIndex === breadcrumbs.length - 1

                return (
                  <li
                    key={`${breadcrumb.label}-${breadcrumbIndex}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={cn(isCurrentPage && "text-foreground")}
                      aria-current={isCurrentPage ? "page" : undefined}
                    >
                      {breadcrumb.label}
                    </span>
                    {!isCurrentPage ? <ChevronRight className="size-4" /> : null}
                  </li>
                )
              })}
            </ol>
          </nav>
        ) : null}
        <h1 className="mt-2 text-2xl font-semibold leading-8 text-foreground">
          {title}
        </h1>
      </div>
      {actions ? (
        <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
      ) : null}
    </header>
  )
}
