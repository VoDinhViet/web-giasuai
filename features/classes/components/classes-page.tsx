import type { Pagination } from "@/types/api"
import type { ClassStats } from "../actions/get-class-stats"
import type { Class } from "../types"
import { ClassesStats } from "./classes-stats"
import { ClassesTable } from "./shared/classes-table"

type ClassesPageProps = {
  stats: ClassStats
  classes: Class[]
  pagination: Pagination
}

export function ClassesPage({ stats, classes, pagination }: ClassesPageProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Quản lý danh sách lớp học trước. Chọn một lớp trong bảng để mở màn quản
        lý chi tiết cho giáo viên theo dõi học viên và khóa học trong lớp.
      </p>

      <ClassesStats stats={stats} />
      <ClassesTable classes={classes} pagination={pagination} />
    </div>
  )
}
