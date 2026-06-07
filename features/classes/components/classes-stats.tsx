import {
  CalendarDays,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react"

import { formatNumber } from "@/lib/number.util"
import { cn } from "@/lib/utils"
import type { ClassStats } from "../actions/get-class-stats"

type ClassesStatsProps = {
  stats: ClassStats
}

type ClassStat = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: ClassStatTone
}

type ClassStatTone = "primary" | "info" | "success"

const classStatToneClassNames: Record<ClassStatTone, string> = {
  primary: "bg-primary/10 text-primary",
  info: "bg-secondary/10 text-secondary",
  success: "bg-success/10 text-success",
}

export function ClassesStats({ stats }: ClassesStatsProps) {
  const classStats: ClassStat[] = [
    {
      label: "Tổng lớp học",
      value: formatNumber(stats.total),
      helper: "Toàn bộ lớp học",
      icon: GraduationCap,
      tone: "primary",
    },
    {
      label: "Học viên",
      value: formatNumber(stats.learners),
      helper: "Đang hoạt động",
      icon: Users,
      tone: "info",
    },
    {
      label: "Sắp mở",
      value: formatNumber(stats.upcoming),
      helper: "Chuẩn bị khai giảng",
      icon: CalendarDays,
      tone: "success",
    },
  ]

  return (
    <section className="grid min-w-0 max-w-full gap-3 md:grid-cols-[repeat(3,minmax(0,1fr))]">
      {classStats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.label}
            className="min-w-0 rounded-lg border border-border/70 bg-card p-4 text-sm text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:border-border sm:p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="pt-0.5 text-xs leading-5 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                {stat.label}
              </h3>
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-md",
                  classStatToneClassNames[stat.tone]
                )}
              >
                <Icon className="size-4.5 stroke-[2.25]" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[1.7rem] leading-8 font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                {stat.helper}
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
