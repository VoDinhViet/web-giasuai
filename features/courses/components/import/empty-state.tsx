import { FileSpreadsheet } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function CourseImportEmptyState() {
  return (
    <Empty className="min-h-64 rounded border border-dashed border-border/80 bg-muted/20 py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileSpreadsheet className="size-5" />
        </EmptyMedia>
        <EmptyTitle>Chưa có dữ liệu xem trước</EmptyTitle>
        <EmptyDescription>
          Tải file mẫu, điền dữ liệu rồi chọn hoặc kéo thả file Excel để xem cây
          khóa học trước khi tạo.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
