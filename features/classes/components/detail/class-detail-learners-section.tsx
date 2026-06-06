import { Users } from "lucide-react"

import type { Pagination } from "@/types/api"
import type { ClassLearner } from "../../types"
import { ClassLearnersTable } from "./class-learners-table"

type ClassDetailLearnersSectionProps = {
  learners: ClassLearner[]
  pagination?: Pagination
}

export function ClassDetailLearnersSection({
  learners,
  pagination,
}: ClassDetailLearnersSectionProps) {
  return (
    <section className="rounded border border-border/80 bg-card shadow-xs">
      <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
            <Users className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground">
              Giám sát học viên
            </h2>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Theo dõi danh sách người học đang hoạt động trong lớp.
            </p>
          </div>
        </div>
      </div>

      <ClassLearnersTable learners={learners} pagination={pagination} />
    </section>
  )
}
