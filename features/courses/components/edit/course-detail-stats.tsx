import {
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import { formatNumber } from "@/lib/number.util"
import { cn } from "@/lib/utils"

type CourseDetailStatsProps = {
  lessonCount: number
  publishedLessonCount: number
  durationText: string
  resourceCount: number
}

export function CourseDetailStats({
  lessonCount,
  publishedLessonCount,
  durationText,
  resourceCount,
}: CourseDetailStatsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        icon={BookOpenCheck}
        label="Bài học"
        value={formatNumber(lessonCount)}
        helper="Trong khóa học"
      />
      <MetricCard
        icon={CheckCircle2}
        label="Đã mở"
        value={formatNumber(publishedLessonCount)}
        helper="Học viên có thể học"
        tone="success"
      />
      <MetricCard
        icon={Clock3}
        label="Thời lượng"
        value={durationText}
        helper="Theo cấu hình hiện tại"
        tone="warning"
      />
      <MetricCard
        icon={Sparkles}
        label="Học liệu"
        value={formatNumber(resourceCount)}
        helper="Tài nguyên đính kèm"
        tone="info"
      />
    </section>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = "default",
}: {
  icon: LucideIcon
  label: string
  value: string
  helper: string
  tone?: "default" | "info" | "success" | "warning"
}) {
  return (
    <div className="rounded border border-border/80 bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </div>
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded ring-1",
            getMetricToneClassName(tone)
          )}
        >
          <Icon className="size-4" />
        </span>
      </div>
    </div>
  )
}

function getMetricToneClassName(
  tone: "default" | "info" | "success" | "warning"
) {
  if (tone === "info") {
    return "bg-secondary/10 text-secondary ring-secondary/15"
  }

  if (tone === "success") {
    return "bg-success/10 text-success ring-success/15"
  }

  if (tone === "warning") {
    return "bg-tertiary/10 text-tertiary ring-tertiary/15"
  }

  return "bg-primary/10 text-primary ring-primary/15"
}
