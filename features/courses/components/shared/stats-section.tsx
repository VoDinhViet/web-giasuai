import {
  BookOpenCheck,
  CalendarDays,
  Clock3,
  Users,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
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
          <Card
            key={stat.label}
            size="sm"
            className="transition-colors hover:border-primary/25 hover:bg-surface-container-lowest"
          >
            <CardContent className="grid gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="text-sm leading-5">
                    {stat.label}
                  </CardTitle>
                  <p className="mt-2 text-2xl leading-8 font-semibold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded border border-primary/20 bg-primary/10 text-primary ring-2 ring-primary/10">
                  <Icon className="size-4 !text-current" />
                </span>
              </div>
              <CardDescription className="text-xs leading-5">
                {stat.helper}
              </CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}

function formatDurationHours(totalDurationMinutes: number) {
  const durationHours = Math.round(totalDurationMinutes / 60)

  return `${formatNumber(durationHours)}h`
}
