"use client"

import type { ReactNode } from "react"

import {
  AppTopbar,
  type AppTopbarBreadcrumbItem,
} from "@/components/app-topbar"

type PageTitleBarProps = {
  title: string
  actions?: ReactNode
  breadcrumbItems?: AppTopbarBreadcrumbItem[]
  breadcrumbs?: ReactNode
  className?: string
}

export function PageTitleBar({
  title,
  actions,
  breadcrumbItems,
  breadcrumbs,
  className,
}: PageTitleBarProps) {
  return (
    <AppTopbar
      title={title}
      actions={actions}
      breadcrumbItems={breadcrumbItems}
      breadcrumbs={breadcrumbs}
      className={className}
    />
  )
}
