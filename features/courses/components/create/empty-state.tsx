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
    <Empty className="min-h-[280px] rounded-xl border-2 border-dashed border-border/60 bg-muted/5 py-12 px-6 transition-all duration-300 ease-in-out hover:border-muted-foreground/30 hover:bg-muted/10">
      <EmptyHeader className="max-w-md mx-auto text-center space-y-4">
        <EmptyMedia variant="icon" className="mx-auto flex size-12 items-center justify-center rounded-xl bg-background text-muted-foreground shadow-xs border border-border">
          <FileSpreadsheet className="size-5 text-muted-foreground/70" />
        </EmptyMedia>
        <div className="space-y-1.5">
          <EmptyTitle className="text-base font-semibold text-foreground">
            Chưa có dữ liệu xem trước
          </EmptyTitle>
          <EmptyDescription className="text-xs text-muted-foreground/80 leading-relaxed">
            Hãy tải file mẫu, điền thông tin và kéo thả file Excel của bạn vào khung tải lên phía trên để kiểm tra cấu trúc phân cấp trước khi lưu.
          </EmptyDescription>
        </div>
      </EmptyHeader>
    </Empty>
  )
}
