import type { ColumnDef } from "@tanstack/react-table"
import type { Route } from "next"
import Link from "next/link"
import { BookOpenCheck, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/date.util"
import { formatNumber } from "@/lib/number.util"
import { cn } from "@/lib/utils"
import type { CourseListItem, CourseStatus } from "../../types"

export function createCoursesTableColumns(): ColumnDef<CourseListItem>[] {
  return [
    {
      accessorKey: "code",
      header: "Mã khóa",
      cell: ({ row }) => (
        <span className="block max-w-28 truncate text-sm text-foreground">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Khóa học",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="max-w-72 truncate text-sm leading-5 font-semibold text-foreground">
            {row.original.name}
          </p>
          <p className="text-[10px] leading-4 text-muted-foreground">
            {formatNumber(row.original.lessonCount)} bài học
          </p>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Danh mục",
      cell: ({ row }) => (
        <span className="inline-flex max-w-36 truncate rounded bg-tertiary/10 px-2.5 py-1 text-xs font-semibold text-tertiary ring-1 ring-tertiary/15">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "authorName",
      header: "Người biên soạn",
      cell: ({ row }) => (
        <span className="block max-w-48 truncate text-sm text-muted-foreground">
          {row.original.authorName ?? "Chưa phân công"}
        </span>
      ),
    },
    {
      accessorKey: "learnerCount",
      header: () => <span className="block text-right">Học viên</span>,
      cell: ({ row }) => (
        <span className="block text-right text-sm font-semibold text-foreground">
          {formatNumber(row.original.learnerCount)}
        </span>
      ),
    },
    {
      accessorKey: "durationMinutes",
      header: "Thời lượng",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDuration(row.original.durationMinutes)}
        </span>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Khai giảng",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.startDate, "Chưa lên lịch")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => <CourseStatusBadge status={row.original.status} />,
    },
    {
      id: "courseActions",
      header: () => <span className="block text-right">Thao tác</span>,
      cell: ({ row }) => {
        const course = row.original

        return (
          <div className="flex justify-end gap-1 text-muted-foreground">
            <Button type="button" variant="outline" size="sm" asChild>
              <Link href={`/manage/courses/${course.code}/lessons` as Route}>
                <BookOpenCheck className="size-3.5" />
                Biên soạn
              </Link>
            </Button>
            <Button type="button" variant="ghost" size="icon-sm">
              <MoreHorizontal className="size-3.5" />
            </Button>
          </div>
        )
      },
    },
  ]
}

function CourseStatusBadge({ status }: { status: CourseStatus }) {
  const statusMap = {
    PUBLISHED: {
      label: "Đang mở",
      className: "bg-primary/10 text-primary ring-primary/20",
    },
    DRAFT: {
      label: "Bản nháp",
      className: "bg-muted text-muted-foreground ring-border",
    },
    ARCHIVED: {
      label: "Lưu trữ",
      className: "bg-destructive/10 text-destructive ring-destructive/20",
    },
  } satisfies Record<CourseStatus, { label: string; className: string }>

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

function formatDuration(durationMinutes: number) {
  const durationHours = Math.round(durationMinutes / 60)

  return `${formatNumber(durationHours)} giờ`
}
