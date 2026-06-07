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

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
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
  instructorOptions: ClassFormOption[]
}

export function CreateClassPreview({
  values,
  instructorOptions,
}: CreateClassPreviewProps) {
  const labels = getClassPreviewLabels(values, instructorOptions)

  return (
    <aside className="min-w-0 2xl:sticky 2xl:top-5 2xl:self-start">
      <Card className="gap-0 py-0">
        <CardHeader className="p-5">
          <div className="min-w-0">
            <CardDescription className="text-xs font-semibold tracking-[0.08em] uppercase">
              Xem trước lớp học
            </CardDescription>
            <CardTitle className="mt-2 truncate text-xl leading-7">
              {values.name || "Tên lớp học"}
            </CardTitle>
            <CardDescription className="mt-1">Mã lớp tự động</CardDescription>
          </div>
          <CardAction>
            <Badge variant="outline">{labels.status}</Badge>
          </CardAction>
        </CardHeader>

        <Separator className="my-5" />

        <CardContent className="p-5 pt-0">
          <ItemGroup className="gap-3.5">
            <PreviewRow
              icon={UserCheck}
              label="Giáo viên"
              value={labels.instructor || "Chưa phân công"}
            />
            <PreviewRow
              icon={CalendarDays}
              label="Lịch học"
              value={labels.repeatDays || "Chưa chọn ngày học"}
              helper={getPreviewRange(
                [values.startTime, values.endTime],
                "Chưa chọn giờ học",
                (time) =>
                  DateTime.fromFormat(time.slice(0, 5), "HH:mm").toFormat(
                    "HH:mm"
                  )
              )}
            />
            <PreviewRow
              icon={Clock3}
              label="Thời gian khóa"
              value={getPreviewRange(
                [values.startDate, values.endDate],
                "Chưa chọn ngày bắt đầu",
                (date) =>
                  DateTime.fromFormat(date, "yyyy-MM-dd", {
                    locale: "vi-VN",
                  }).toFormat("dd/MM/yyyy")
              )}
            />
            <PreviewRow
              icon={Monitor}
              label="Hình thức"
              value={labels.format}
              helper={values.meetingUrl || undefined}
            />
            <PreviewRow
              icon={Users}
              label="Ghi danh"
              value={`${values.maxStudents} học viên tối đa`}
              helper={labels.joinPolicy}
            />
            <PreviewRow
              icon={Bell}
              label="Tự động hóa"
              value={
                [
                  values.waitlistEnabled ? "Danh sách chờ" : undefined,
                  values.reminderEnabled ? "Nhắc lịch" : undefined,
                  values.autoCreateSessions ? "Sinh buổi học" : undefined,
                ]
                  .filter(Boolean)
                  .join(", ") || "Chưa bật tự động hóa"
              }
            />
          </ItemGroup>
        </CardContent>
      </Card>
    </aside>
  )
}

type PreviewRowProps = {
  icon: LucideIcon
  label: string
  value: string
  helper?: string
}

function PreviewRow({ icon: Icon, label, value, helper }: PreviewRowProps) {
  return (
    <Item variant="outline" size="sm" className="items-start bg-background/50">
      <ItemMedia
        variant="icon"
        className="size-8 rounded bg-muted text-muted-foreground"
      >
        <Icon />
      </ItemMedia>
      <ItemContent className="min-w-0 gap-0.5">
        <ItemDescription className="text-xs font-semibold">
          {label}
        </ItemDescription>
        <ItemTitle className="line-clamp-none break-words">{value}</ItemTitle>
        {helper ? (
          <ItemDescription className="line-clamp-none text-xs break-words">
            {helper}
          </ItemDescription>
        ) : null}
      </ItemContent>
    </Item>
  )
}

function getClassPreviewLabels(
  values: CreateClassInput,
  instructorOptions: ClassFormOption[]
) {
  return {
    status: getOptionLabel(classStatusOptions, values.status),
    format: getOptionLabel(classFormatOptions, values.format),
    joinPolicy: getOptionLabel(classJoinPolicyOptions, values.joinPolicy),
    repeatDays: values.repeatDays
      .map((day) => getOptionLabel(classWeekdayOptions, day))
      .join(", "),
    instructor: getOptionLabel(instructorOptions, values.instructorId),
  }
}

function getOptionLabel<TValue extends string>(
  options: Array<{ value: TValue; label: string }>,
  value?: TValue
) {
  return value
    ? (options.find((option) => option.value === value)?.label ?? value)
    : ""
}

function getPreviewRange(
  values: string[],
  fallback: string,
  formatValue: (value: string) => string
) {
  return values.filter(Boolean).map(formatValue).join(" - ") || fallback
}
