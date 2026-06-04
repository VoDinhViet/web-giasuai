import { AlertTriangle, BookOpenCheck, CheckCircle2, Users } from "lucide-react"

import type { ClassDetail } from "../../types"

type ClassDetailStatsProps = {
  classDetail: ClassDetail
}

export function ClassDetailStats({ classDetail }: ClassDetailStatsProps) {
  const riskStudentCount = classDetail.students.filter(
    (student) => student.status === "RISK" || student.status === "WARNING"
  ).length
  const averageAttendance = Math.round(
    classDetail.students.reduce(
      (total, student) => total + student.attendanceRate,
      0
    ) / Math.max(classDetail.students.length, 1)
  )
  const averageProgress = Math.round(
    classDetail.students.reduce(
      (total, student) => total + student.progressPercent,
      0
    ) / Math.max(classDetail.students.length, 1)
  )

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <ClassDetailStatsItem
        label="Học viên"
        value={`${classDetail.studentCount}/${classDetail.maxStudents}`}
        helper="Sĩ số hiện tại"
        icon={Users}
      />
      <ClassDetailStatsItem
        label="Điểm danh"
        value={`${averageAttendance}%`}
        helper="Tỷ lệ trung bình"
        icon={CheckCircle2}
      />
      <ClassDetailStatsItem
        label="Tiến độ"
        value={`${averageProgress}%`}
        helper="Theo học viên"
        icon={BookOpenCheck}
      />
      <ClassDetailStatsItem
        label="Cần chú ý"
        value={riskStudentCount.toString()}
        helper="Học viên cần hỗ trợ"
        icon={AlertTriangle}
      />
    </section>
  )
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
