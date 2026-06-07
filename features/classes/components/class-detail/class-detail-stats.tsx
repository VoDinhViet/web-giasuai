import { BookOpenCheck, CalendarDays, Users } from "lucide-react"

import type { Class } from "../../types"

type ClassDetailStatsProps = {
  class: Class
}

export function ClassDetailStats(props: ClassDetailStatsProps) {
  const studentCount =
    props.class.studentCount ?? props.class.students?.length ?? 0
  const courseCount = props.class.courses?.length ?? 0
  const sessionCount = props.class.sessions?.length ?? 0

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <ClassDetailStatsItem
        label="Sĩ số"
        value={`${studentCount}/${props.class.maxStudents}`}
        helper="Hiện tại"
        icon={Users}
      />
      <ClassDetailStatsItem
        label="Khóa"
        value={courseCount.toString()}
        helper="Đã gán"
        icon={BookOpenCheck}
      />
      <ClassDetailStatsItem
        label="Buổi"
        value={sessionCount.toString()}
        helper="Đã tạo"
        icon={CalendarDays}
      />
      <ClassDetailStatsItem
        label="Tiến độ"
        value={getStatusLabel(props.class.status)}
        helper="Vận hành"
        icon={Users}
      />
    </section>
  )
}

function getStatusLabel(status: Class["status"]) {
  const labels = {
    ACTIVE: "Đang học",
    UPCOMING: "Sắp học",
    COMPLETED: "Hoàn tất",
    PAUSED: "Tạm dừng",
  } satisfies Record<Class["status"], string>

  return labels[status]
}

type ClassDetailStatsItemProps = {
  label: string
  value: string
  helper: string
  icon: typeof Users
}

function ClassDetailStatsItem({
  label,
  value,
  helper,
  icon: Icon,
}: ClassDetailStatsItemProps) {
  return (
    <div className="rounded border border-border/80 bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-2 text-2xl leading-8 font-semibold text-foreground">
            {value}
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{helper}</p>
    </div>
  )
}
