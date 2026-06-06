import {
  Bell,
  CalendarDays,
  Clock3,
  Monitor,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"
import { DateTime } from "luxon"

import { Separator } from "@/components/ui/separator"
import {
  classJoinPolicyOptions,
  classFormatOptions,
  classStatusOptions,
  classWeekdayOptions,
  type CreateClassInput,
} from "../../schemas/class.schema"
import type { ClassFormOption } from "../../types"

type CreateClassPreviewProps = {
  values: CreateClassInput
  teacherOptions: ClassFormOption[]
}

export function CreateClassPreview({
  values,
  teacherOptions,
}: CreateClassPreviewProps) {
  const statusLabel = getOptionLabel(classStatusOptions, values.status)
  const formatLabel = getOptionLabel(classFormatOptions, values.format)
  const joinPolicyLabel = getOptionLabel(
    classJoinPolicyOptions,
    values.joinPolicy
  )
  const repeatDayLabels = values.repeatDays
    .map((day) => getOptionLabel(classWeekdayOptions, day))
    .join(", ")
  const teacherLabel = values.instructorId
    ? teacherOptions.find(
        (teacherOption) => teacherOption.value === values.instructorId
      )?.label
    : undefined

  return (
    <aside className="xl:sticky xl:top-5 xl:self-start">
      <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Xem trước lớp học
            </p>
            <h2 className="mt-2 truncate text-xl leading-7 font-semibold text-foreground">
              {values.name || "Tên lớp học"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {values.code || "Mã lớp"}
            </p>
          </div>
          <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
            {statusLabel}
          </span>
        </div>

        <Separator className="my-5" />

        <div className="grid gap-4">
          <CreateClassPreviewRow
            icon={UserCheck}
            label="Giáo viên"
            value={teacherLabel ?? "Chưa phân công"}
          />
          <CreateClassPreviewRow
            icon={CalendarDays}
            label="Lịch học"
            value={repeatDayLabels || "Chưa chọn ngày học"}
            helper={formatTimeRange(values.startTime, values.endTime)}
          />
          <CreateClassPreviewRow
            icon={Clock3}
            label="Thời gian khóa"
            value={formatDateInputRange(values.startDate, values.endDate)}
          />
          <CreateClassPreviewRow
            icon={Monitor}
            label="Hình thức"
            value={formatLabel}
            helper={values.meetingUrl || undefined}
          />
          <CreateClassPreviewRow
            icon={Users}
            label="Ghi danh"
            value={`${values.maxStudents} học viên tối đa`}
            helper={joinPolicyLabel}
          />
          <CreateClassPreviewRow
            icon={Bell}
            label="Tự động hóa"
            value={formatAutomationSummary(values)}
          />
        </div>
      </section>
    </aside>
  )
}

type CreateClassPreviewRowProps = {
  icon: LucideIcon
  label: string
  value: string
  helper?: string
}

function CreateClassPreviewRow({
  icon: Icon,
  label,
  value,
  helper,
}: CreateClassPreviewRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium break-words text-foreground">
          {value}
        </p>
        {helper ? (
          <p className="mt-0.5 text-xs leading-5 break-words text-muted-foreground">
            {helper}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function getOptionLabel<TValue extends string>(
  options: Array<{ value: TValue; label: string }>,
  value: TValue
) {
  return options.find((option) => option.value === value)?.label ?? value
}

function formatTimeRange(startTime: string, endTime: string) {
  const startTimeLabel = formatTimeLabel(startTime)
  const endTimeLabel = formatTimeLabel(endTime)

  if (!startTimeLabel && !endTimeLabel) {
    return "Chưa chọn giờ học"
  }

  if (!endTimeLabel) {
    return startTimeLabel
  }

  if (!startTimeLabel) {
    return endTimeLabel
  }

  return `${startTimeLabel} - ${endTimeLabel}`
}

function formatTimeLabel(time: string) {
  if (!time) {
    return ""
  }

  const parsedTime = ["HH:mm", "HH:mm:ss"]
    .map((timeFormat) => DateTime.fromFormat(time, timeFormat))
    .find((dateTime) => dateTime.isValid)

  return parsedTime?.toFormat("HH:mm") ?? time
}

function formatDateInputRange(startDate: string, endDate: string) {
  const startDateLabel = formatDateInputLabel(startDate)
  const endDateLabel = formatDateInputLabel(endDate)

  if (!startDateLabel && !endDateLabel) {
    return "Chưa chọn ngày bắt đầu"
  }

  if (!endDateLabel) {
    return startDateLabel
  }

  if (!startDateLabel) {
    return endDateLabel
  }

  return `${startDateLabel} - ${endDateLabel}`
}

function formatDateInputLabel(date: string) {
  if (!date) {
    return ""
  }

  const parsedDate = DateTime.fromFormat(date, "yyyy-MM-dd", {
    locale: "vi-VN",
  })

  return parsedDate.isValid ? parsedDate.toFormat("dd/MM/yyyy") : date
}

function formatAutomationSummary(values: CreateClassInput) {
  const enabledAutomations = [
    values.waitlistEnabled ? "Danh sách chờ" : undefined,
    values.reminderEnabled ? "Nhắc lịch" : undefined,
    values.autoCreateSessions ? "Sinh buổi học" : undefined,
  ].filter(Boolean)

  return enabledAutomations.length > 0
    ? enabledAutomations.join(", ")
    : "Chưa bật tự động hóa"
}
