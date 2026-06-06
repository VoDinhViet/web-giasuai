import {
  CalendarDays,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import type { ClassStats } from "../actions/get-class-stats"

type ClassesStatsProps = {
  stats: ClassStats
}

type ClassStat = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}

export function ClassesStats({ stats }: ClassesStatsProps) {
  const classStats: ClassStat[] = [
    {
      label: "Tổng lớp học",
      value: stats.total.toLocaleString("vi-VN"),
      helper: "Toàn bộ lớp học",
      icon: GraduationCap,
    },
    {
      label: "Học viên",
      value: stats.learners.toLocaleString("vi-VN"),
      helper: "Đang hoạt động",
      icon: Users,
    },
    {
      label: "Sắp mở",
      value: stats.upcoming.toLocaleString("vi-VN"),
      helper: "Chuẩn bị khai giảng",
      icon: CalendarDays,
    },
  ]

  return (
    <section className="grid gap-3 md:grid-cols-3">
      {classStats.map((stat) => {
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
                  <CardTitle className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                    {stat.label}
                  </CardTitle>
                  <p className="mt-2 text-2xl leading-8 font-semibold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
              </div>
              <CardDescription>{stat.helper}</CardDescription>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
