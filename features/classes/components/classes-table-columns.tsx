import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Eye, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/date.util"
import { formatNumber } from "@/lib/number.util"
import { cn } from "@/lib/utils"
import type { Class, ClassStatus, ClassWeekday } from "../types"
import { DeleteClassButton } from "./delete-class-button"

export function createClassesTableColumns(): ColumnDef<Class>[] {
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
        </div>
      ),
    },
    {
      accessorKey: "instructor",
      header: "Giáo viên",
      cell: ({ row }) => (
        <span className="block max-w-48 truncate text-sm text-muted-foreground">
          {row.original.instructor.fullName}
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
      accessorKey: "repeatDays",
      header: "Lịch học",
      cell: ({ row }) => <ClassScheduleCell classItem={row.original} />,
    },
    {
      accessorKey: "startDate",
      header: "Thời gian",
      cell: ({ row }) => <ClassDateRangeCell classItem={row.original} />,
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
          <div className="flex min-w-28 justify-end gap-1 text-muted-foreground">
            <Button type="button" variant="ghost" size="icon-sm" asChild>
              <Link href={`/manage/classes/${classItem.code}`}>
                <Eye />
              </Link>
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" asChild>
              <Link href={`/manage/classes/${classItem.code}/edit`}>
                <Pencil />
              </Link>
            </Button>
            <DeleteClassButton
              classCode={classItem.code}
              label=""
              redirectTo={null}
              size="icon-sm"
              variant="ghost"
            />
          </div>
        )
      },
    },
  ]
}

function ClassScheduleCell({ classItem }: { classItem: Class }) {
  const repeatDayLabels = getRepeatDayLabels(classItem)
  const timeRange = formatClassTimeRange(classItem.startTime, classItem.endTime)

  if (!repeatDayLabels && !timeRange) {
    return <span className="text-sm text-muted-foreground">Chưa lên lịch</span>
  }

  return (
    <div className="grid min-w-0 gap-1">
      {repeatDayLabels ? (
        <div className="flex max-w-56 flex-wrap gap-1">
          {repeatDayLabels.map((repeatDayLabel) => (
            <span
              key={repeatDayLabel}
              className="inline-flex h-6 items-center rounded bg-primary/10 px-2 text-xs font-semibold text-primary ring-1 ring-primary/15"
            >
              {repeatDayLabel}
            </span>
          ))}
        </div>
      ) : null}
      {timeRange ? (
        <span className="text-xs text-muted-foreground">{timeRange}</span>
      ) : null}
    </div>
  )
}

function ClassDateRangeCell({ classItem }: { classItem: Class }) {
  if (!classItem.startDate && !classItem.endDate) {
    return <span className="text-sm text-muted-foreground">Chưa chọn ngày</span>
  }

  return (
    <div className="grid min-w-0 gap-1 text-sm">
      <span className="font-medium text-foreground">
        {formatDate(classItem.startDate, "--")}
      </span>
      {classItem.endDate ? (
        <span className="text-xs text-muted-foreground">
          đến {formatDate(classItem.endDate, "--")}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">Chưa chọn ngày kết thúc</span>
      )}
    </div>
  )
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

function getRepeatDayLabels(classItem: Class) {
  return classItem.repeatDays?.map((weekday) => weekdayLabels[weekday]) ?? []
}

function formatClassTimeRange(
  startTime: string | null,
  endTime: string | null
) {
  const startTimeLabel = formatClassTime(startTime)
  const endTimeLabel = formatClassTime(endTime)

  return [startTimeLabel, endTimeLabel].filter(Boolean).join(" - ")
}

function formatClassTime(value: string | null) {
  return value?.slice(0, 5) ?? ""
}

const weekdayLabels = {
  MONDAY: "T2",
  TUESDAY: "T3",
  WEDNESDAY: "T4",
  THURSDAY: "T5",
  FRIDAY: "T6",
  SATURDAY: "T7",
  SUNDAY: "CN",
} satisfies Record<ClassWeekday, string>
