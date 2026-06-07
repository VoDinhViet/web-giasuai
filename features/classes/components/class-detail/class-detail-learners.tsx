"use client"

import { Users } from "lucide-react"
import { useQueryStates } from "nuqs"
import useSWR from "swr"

import type { User } from "@/features/users/types"
import type { PaginatedResponse } from "@/types/api"
import { classDetailSearchParams } from "../../lib/search-params"
import { getClassLearners } from "../../actions/get-class-learners"
import { ClassLearnersTable } from "./class-learners-table"

type ClassDetailLearnersProps = {
  classCode: string
}

export function ClassDetailLearners({
  classCode,
}: ClassDetailLearnersProps) {
  const [params] = useQueryStates(classDetailSearchParams)

  const swrKey = ["class-learners", classCode, params.learnerPage, params.learnerPageSize, params.learnerQ]

  const { data, isLoading, isValidating } = useSWR<PaginatedResponse<User>>(
    swrKey,
    async () => {
      return getClassLearners(classCode, {
        page: params.learnerPage,
        limit: params.learnerPageSize,
        q: params.learnerQ || undefined,
      })
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  )

  const learners = data?.data ?? []
  const pagination = data?.pagination
  const isFetching = isLoading || isValidating

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

      <ClassLearnersTable
        learners={learners}
        pagination={pagination}
        isLoading={isFetching}
      />
    </section>
  )
}
