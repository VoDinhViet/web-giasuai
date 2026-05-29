import { Table, Plus } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type EmptyTableProps = {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyTable({
  title = "Không có dữ liệu",
  description = "Không tìm thấy bản ghi nào trong hệ thống lúc này. Hãy thử bộ lọc khác hoặc tạo mới để bắt đầu.",
  actionLabel,
  onAction,
  icon = <Table className="size-5" />,
}: EmptyTableProps) {
  return (
    <Empty className="py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {icon}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {actionLabel && onAction && (
        <EmptyContent className="mt-4">
          <Button onClick={onAction} className="gap-2">
            <Plus className="size-4" />
            {actionLabel}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
