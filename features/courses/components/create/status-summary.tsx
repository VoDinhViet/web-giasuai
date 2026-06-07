import { AlertCircle, AlertTriangle } from "lucide-react"
import { useMemo } from "react"

import { formatNumber } from "@/lib/number.util"
import { Badge } from "@/components/ui/badge"
import type { CourseImportPreview } from "@/features/courses/types"

export function ImportStatusSummary({
  importPreview,
}: {
  importPreview: CourseImportPreview
}) {
  const invalidRowCount = useMemo(
    () =>
      importPreview.chapters.filter((row) => row.status === "Lỗi").length +
      importPreview.lessons.filter((row) => row.status === "Lỗi").length,
    [importPreview]
  )
  const warningRowCount = importPreview.courses.filter(
    (row) => row.status === "Cảnh báo"
  ).length

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-500/5 gap-1.5">
        <AlertTriangle className="size-3.5" />
        {formatNumber(warningRowCount)} cảnh báo
      </Badge>
      <Badge variant="destructive" className="gap-1.5">
        <AlertCircle className="size-3.5" />
        {formatNumber(invalidRowCount)} lỗi
      </Badge>
    </div>
  )
}
