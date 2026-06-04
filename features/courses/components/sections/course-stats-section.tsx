import {
  BookOpenCheck,
  CalendarDays,
  Clock3,
  Users,
  type LucideIcon,
} from "lucide-react"

import { formatNumber } from "@/lib/number.util"
import type { CourseStats } from "../../actions/get-course-stats"

type CourseStatsSectionProps = {
  stats: CourseStats
}

type CourseStatViewModel = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}

export function CourseStatsSection({ stats }: CourseStatsSectionProps) {
  const courseStats: CourseStatViewModel[] = [
    {
      label: "Tổng khóa học",
      value: formatNumber(stats.total),
      helper: `${formatNumber(stats.published)} khóa đang mở`,
      icon: BookOpenCheck,
    },
    {
      label: "Học viên đăng ký",
      value: formatNumber(stats.enrolledLearners),
      helper: "Tổng lượt ghi danh khóa học",
      icon: Users,
    },
    {
      label: "Giờ đào tạo",
      value: formatDurationHours(stats.totalDurationMinutes),
      helper: "Theo thời lượng khóa học",
      icon: Clock3,
    },
    {
      label: "Lịch khai giảng",
      value: formatNumber(stats.upcomingStartCount),
      helper: "Trong 30 ngày tới",
      icon: CalendarDays,
    },
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {courseStats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.label}
            className="rounded border border-border/80 bg-card p-4 shadow-xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl leading-8 font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {stat.helper}
            </p>
          </div>
        )
      })}
    </section>
  )
}

function formatDurationHours(totalDurationMinutes: number) {
  const durationHours = Math.round(totalDurationMinutes / 60)

  return `${formatNumber(durationHours)}h`
}
