import { AlertTriangle, CheckCircle2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ImportSaveSummaryCard({
  hasImportData,
  invalidRowCount,
  isSaving,
  saveMessage,
  onSave,
}: {
  hasImportData: boolean
  invalidRowCount: number
  isSaving: boolean
  saveMessage: string
  onSave: () => void
}) {
  const canSave = hasImportData && invalidRowCount === 0

  return (
    <Card
      data-tone={!hasImportData || invalidRowCount > 0 ? "danger" : "success"}
    >
      <CardContent>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            {!hasImportData || invalidRowCount > 0 ? (
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            ) : (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            )}
            <div>
              <p className="font-semibold text-foreground">
                {!hasImportData
                  ? "Chưa có dữ liệu để lưu"
                  : invalidRowCount > 0
                    ? "Cần sửa lỗi trước khi lưu"
                    : "Dữ liệu đã sẵn sàng để lưu"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {!hasImportData
                  ? "Chọn file Excel để hệ thống đọc dữ liệu và hiển thị cây xem trước."
                  : invalidRowCount > 0
                    ? "Cập nhật file Excel rồi bấm Đọc lại file để xem lại."
                    : "Sau khi lưu, giáo viên có thể vào Biên soạn để rà soát nội dung."}
              </p>
              {saveMessage ? (
                <p className="mt-2 text-sm font-medium text-foreground">
                  {saveMessage}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline">
              Hủy
            </Button>
            <Button
              type="button"
              disabled={!canSave || isSaving}
              onClick={onSave}
            >
              <Save className="size-3.5" />
              {isSaving ? "Đang tạo..." : "Tạo khóa học"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
