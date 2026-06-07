"use client"

import { useTransition } from "react"

import { Card } from "@/components/ui/card"
import type { Pagination } from "@/types/api"
import type { ClassStats } from "../actions/get-class-stats"
import type { Class } from "../types"
import { ClassesStats } from "./classes-stats"
import { ClassesTable } from "./classes-table"
import { ClassesTableFilter } from "./classes-table-filter"

type ClassesPageProps = {
  stats: ClassStats
  classes: Class[]
  pagination: Pagination
}

export function ClassesPage({ stats, classes, pagination }: ClassesPageProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-5">
      <ClassesStats stats={stats} />
      <Card className="min-w-0 max-w-full gap-0 overflow-hidden py-0" aria-busy={isPending}>
        <ClassesTableFilter
          isPending={isPending}
          startTransition={startTransition}
        />
        <ClassesTable
          classes={classes}
          pagination={pagination}
          isPending={isPending}
          startTransition={startTransition}
        />
      </Card>
    </div>
  )
}
