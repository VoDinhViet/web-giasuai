import type { ColumnDef } from "@tanstack/react-table"
import type { Route } from "next"
import Link from "next/link"
import { Eye, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/date.util"
import { formatNumber } from "@/lib/number.util"
import { cn } from "@/lib/utils"
import type { ClassListItem, ClassStatus } from "../../types"

export function createClassesTableColumns(): ColumnDef<ClassListItem>[] {
  return [
    {
      accessorKey: "code",
      header: "Mã lớp",
      cell: ({ row }) => (
        <span className="block max-w-28 truncate text-sm font-semibold text-foreground">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Lớp học",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="max-w-64 truncate text-sm leading-5 font-semibold text-foreground">
            {row.original.name}
          </p>
          <p className="max-w-44 truncate text-xs text-muted-foreground">
            {row.original.room ?? "Chưa có phòng học"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "courseName",
      header: "Khóa chính",
      cell: ({ row }) => (
        <span className="block max-w-64 truncate text-sm text-muted-foreground">
          {row.original.courseName ?? "Chưa gắn khóa học"}
        </span>
      ),
    },
    {
      accessorKey: "teacherName",
      header: "Giáo viên",
      cell: ({ row }) => (
        <span className="block max-w-48 truncate text-sm text-muted-foreground">
          {row.original.teacherName ?? "Chưa phân công"}
        </span>
      ),
    },
    {
      accessorKey: "studentCount",
      header: () => <span className="block text-right">Sĩ số</span>,
      cell: ({ row }) => (
        <span className="block text-right text-sm font-semibold text-foreground">
          {formatNumber(row.original.studentCount)}/
          {formatNumber(row.original.maxStudents)}
        </span>
      ),
    },
    {
      accessorKey: "schedule",
      header: "Lịch học",
      cell: ({ row }) => (
        <span className="block max-w-44 truncate text-sm text-muted-foreground">
          {row.original.schedule ?? "Chưa lên lịch"}
        </span>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Thời gian",
      cell: ({ row }) => (
        <span className="block max-w-44 truncate text-sm text-muted-foreground">
          {formatClassDateRange(row.original.startDate, row.original.endDate)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => <ClassStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => {
        const classItem = row.original

        return (
          <div className="flex justify-end gap-1 text-muted-foreground">
            <Button type="button" variant="ghost" size="icon-sm" asChild>
              <Link href={`/manage/classes/${classItem.code}` as Route}>
                <Eye className="size-4" />
              </Link>
            </Button>
            <Button type="button" variant="ghost" size="icon-sm">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        )
      },
    },
  ]
}

function ClassStatusBadge({ status }: { status: ClassStatus }) {
  const statusMap = {
    ACTIVE: {
      label: "Đang học",
      className: "bg-primary/10 text-primary ring-primary/20",
    },
    UPCOMING: {
      label: "Sắp mở",
      className: "bg-success-container/80 text-success ring-success/20",
    },
    COMPLETED: {
      label: "Hoàn thành",
      className: "bg-muted text-muted-foreground ring-border",
    },
    PAUSED: {
      label: "Tạm dừng",
      className: "bg-destructive/10 text-destructive ring-destructive/20",
    },
  } satisfies Record<ClassStatus, { label: string; className: string }>

  const statusMeta = statusMap[status]

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded px-2.5 text-xs font-semibold ring-1",
        statusMeta.className
      )}
    >
      {statusMeta.label}
    </span>
  )
}

function formatClassDateRange(
  startDate: string | null,
  endDate: string | null
) {
  if (!startDate && !endDate) {
    return "Chưa lên lịch"
  }

  if (!endDate) {
    return formatDate(startDate)
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}
