import {
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react"

import type { Pagination } from "@/types/api"
import type { ClassStats } from "../../actions/get-class-stats"
import type { ClassListItem } from "../../types"
import { ClassesTable } from "../tables/classes-table"

type ClassesPageProps = {
  stats: ClassStats
  classes: ClassListItem[]
  pagination: Pagination
}

type ClassStat = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}

export function ClassesPage({ stats, classes, pagination }: ClassesPageProps) {
  const classStats: ClassStat[] = [
    {
      label: "Tổng lớp học",
      value: stats.totalClasses.toLocaleString("vi-VN"),
      helper: `${stats.activeClassesOnPage.toLocaleString("vi-VN")} lớp đang học trong trang này`,
      icon: GraduationCap,
    },
    {
      label: "Học viên",
      value: stats.studentCountOnPage.toLocaleString("vi-VN"),
      helper: "Theo dữ liệu lớp đang hiển thị",
      icon: Users,
    },
    {
      label: "Sắp mở",
      value: stats.upcomingClassesOnPage.toLocaleString("vi-VN"),
      helper: "Theo dữ liệu lớp đang hiển thị",
      icon: CalendarDays,
    },
    {
      label: "Phân trang",
      value: `${stats.currentPage}/${stats.totalPages || 1}`,
      helper: `${stats.limit.toLocaleString("vi-VN")} lớp mỗi trang`,
      icon: ClipboardList,
    },
  ]

  return (
    <div className="flex w-full flex-col gap-5">
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Quản lý danh sách lớp học trước. Chọn một lớp trong bảng để mở màn quản
        lý chi tiết cho giáo viên theo dõi học viên và khóa học trong lớp.
      </p>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {classStats.map((stat) => {
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

      <ClassesTable classes={classes} pagination={pagination} />
    </div>
  )
}
