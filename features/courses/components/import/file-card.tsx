"use client"

import { Download, FileSpreadsheet, Upload } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { SectionTitle } from "./section-title"

export function ImportFileCard({
  fileName,
  isDownloadingTemplate,
  isReadingFile,
  templateErrorMessage,
  onDownloadTemplate,
  onFileChange,
  onReadFile,
}: {
  fileName: string
  isDownloadingTemplate: boolean
  isReadingFile: boolean
  templateErrorMessage: string
  onDownloadTemplate: () => void
  onFileChange: (file: File) => void
  onReadFile: () => void
}) {
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]

      if (file) {
        onFileChange(file)
      }
    },
  })

  return (
    <Card data-tone="violet">
      <CardHeader>
        <SectionTitle icon={FileSpreadsheet} title="File Excel tạo khóa học" />
        <CardDescription>
          Chọn file Excel, kiểm tra dữ liệu xem trước, sửa lỗi rồi mới tạo khóa
          học.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_13rem]">
          <div
            {...getRootProps()}
            className={cn(
              "flex cursor-pointer flex-col justify-center gap-3 rounded border border-dashed border-border/80 bg-background px-5 py-6 transition-colors hover:bg-muted/30 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              isDragActive && "border-primary bg-primary-fixed/40"
            )}
          >
            <input {...getInputProps()} />
            <span className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded bg-muted text-primary ring-1 ring-border">
                <Upload className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-semibold text-foreground">
                  Chọn file Excel khóa học
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  Hỗ trợ .xlsx
                </span>
              </span>
            </span>
          </div>

          <div className="grid content-start gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isDownloadingTemplate}
              onClick={onDownloadTemplate}
            >
              <Download className="size-3.5" />
              {isDownloadingTemplate ? "Đang tải..." : "Tải file mẫu"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isReadingFile}
              onClick={onReadFile}
            >
              <Upload className="size-3.5" />
              {isReadingFile ? "Đang đọc..." : "Đọc lại file"}
            </Button>
          </div>
        </div>

        <div className="mt-4 rounded border border-border/70 bg-background p-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {fileName || "Chưa chọn file Excel"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {fileName
                ? "Đã đọc dữ liệu từ file để xem trước trước khi tạo."
                : "Chọn hoặc kéo thả file .xlsx để bắt đầu xem trước."}
            </p>
            {templateErrorMessage ? (
              <p className="mt-2 text-sm font-medium text-destructive">
                {templateErrorMessage}
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
