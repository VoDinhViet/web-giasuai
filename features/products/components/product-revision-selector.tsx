"use client"

import { useTransition } from "react"
import { parseAsString, useQueryState } from "nuqs"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { ProductRevision } from "../types"

type ProductRevisionSelectorProps = {
  currentRevisionId: string | null
  revisions: ProductRevision[]
  selectedRevisionId: string | null
}

export function ProductRevisionSelector({
  currentRevisionId,
  revisions,
  selectedRevisionId,
}: ProductRevisionSelectorProps) {
  const [isPending, startTransition] = useTransition()
  const [revisionId, setRevisionId] = useQueryState(
    "revisionId",
    parseAsString.withOptions({
      history: "replace",
      shallow: false,
      startTransition,
    })
  )
  const activeRevisionId = revisionId ?? selectedRevisionId

  if (revisions.length === 0 || !activeRevisionId) {
    return null
  }

  return (
    <div
      className="flex flex-col gap-3 rounded-(--radius) border border-border bg-card px-5 py-4 shadow-xs sm:flex-row sm:items-center sm:justify-between"
      aria-busy={isPending}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">
          Revision đang xem
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Chọn revision để chuyển BOM - Routing theo đúng phiên bản sản xuất.
        </p>
      </div>
      <Select
        value={activeRevisionId}
        disabled={isPending}
        onValueChange={(nextRevisionId) => setRevisionId(nextRevisionId)}
      >
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="Chọn revision" />
        </SelectTrigger>
        <SelectContent>
          {revisions.map((revision) => {
            const isCurrentRevision = revision.id === currentRevisionId

            return (
              <SelectItem key={revision.id} value={revision.id}>
                <span className="flex items-center gap-2">
                  <span>{revision.revisionNo}</span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[10px] leading-4 font-semibold uppercase",
                      isCurrentRevision
                        ? "bg-primary-fixed text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCurrentRevision ? "Hiện tại" : "Lưu trữ"}
                  </span>
                </span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
