"use client"

import { useState, useTransition } from "react"
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
import { getCourseImportTemplate } from "@/features/courses/actions/get-course-import-template"
import { parseCourseImportFile } from "@/features/courses/actions/parse-course-import-file"
import type { CourseImportPreview } from "@/features/courses/types"

import { SectionTitle } from "./section-title"
import type { CourseImportTemplateFile } from "./types"

function downloadTemplateFile({
  contentBase64,
  contentType,
  filename,
}: CourseImportTemplateFile) {
  const byteCharacters = atob(contentBase64)
  const byteNumbers = Array.from(byteCharacters, (character) =>
    character.charCodeAt(0)
  )
  const blob = new Blob([new Uint8Array(byteNumbers)], { type: contentType })
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement("a")

  anchor.href = objectUrl
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(objectUrl)
}

export function ImportFileCard({
  onPreviewChange,
}: {
  onPreviewChange: (preview: CourseImportPreview) => void
}) {
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [templateErrorMessage, setTemplateErrorMessage] = useState("")
  const [isDownloadingTemplate, startTemplateDownloadTransition] =
    useTransition()
  const [isReadingFile, startReadFileTransition] = useTransition()

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
        handleFileChange(file)
      }
    },
  })

  function handleDownloadTemplate() {
    setTemplateErrorMessage("")

    startTemplateDownloadTransition(async () => {
      const response = await getCourseImportTemplate()

      if (!response.success || !response.data) {
        setTemplateErrorMessage(
          response.message || "Không thể tải file mẫu tạo khóa học."
        )
        return
      }

      downloadTemplateFile(response.data)
    })
  }

  function handleFileChange(file: File) {
    setSelectedFile(file)
    setFileName(file.name)
    setTemplateErrorMessage("")
    readImportFile(file)
  }

  function handleReadFile() {
    setTemplateErrorMessage("")

    if (!selectedFile) {
      setTemplateErrorMessage("Vui lòng chọn file Excel trước khi đọc lại.")
      return
    }

    readImportFile(selectedFile)
  }

  function readImportFile(file: File) {
    startReadFileTransition(async () => {
      const formData = new FormData()
      formData.append("file", file)
      const response = await parseCourseImportFile(formData)

      if (!response.success || !response.data) {
        setTemplateErrorMessage(response.message || "Không thể đọc file Excel.")
        return
      }

      onPreviewChange(response.data)
    })
  }

  return (
    <Card>
      <CardHeader>
        <SectionTitle icon={FileSpreadsheet} title="File Excel tạo khóa học" />
        <CardDescription>
          Chọn file Excel chứa cấu trúc, hệ thống sẽ tự động phân tích và dựng cây khóa học.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_13rem]">
          <div
            {...getRootProps()}
            className={cn(
              "flex cursor-pointer flex-col justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 px-5 py-6 text-center transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isDragActive && "border-primary bg-primary/5"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-lg bg-background text-muted-foreground border border-border shadow-xs">
                <Upload className="size-5" />
              </span>
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-foreground">
                  Chọn file Excel khóa học hoặc kéo thả vào đây
                </span>
                <span className="block text-xs text-muted-foreground">
                  Hỗ trợ định dạng .xlsx
                </span>
              </div>
            </div>
          </div>

          <div className="grid content-start gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isDownloadingTemplate}
              onClick={handleDownloadTemplate}
              className="justify-start"
            >
              <Download className="size-4 mr-2" />
              {isDownloadingTemplate ? "Đang tải..." : "Tải file mẫu"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isReadingFile || !fileName}
              onClick={handleReadFile}
              className="justify-start"
            >
              <Upload className="size-4 mr-2" />
              {isReadingFile ? "Đang đọc..." : "Đọc lại file"}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background border text-sm font-bold text-muted-foreground shadow-2xs">
              {fileName ? "XL" : "--"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">
                {fileName || "Chưa chọn file Excel"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {fileName
                  ? "Tệp đã được đọc để xem trước cấu trúc. Hãy rà soát dữ liệu bên dưới."
                  : "Kéo thả hoặc click chọn file Excel để bắt đầu xem trước."}
              </p>
              {templateErrorMessage ? (
                <p className="mt-2 text-xs font-semibold text-destructive">
                  {templateErrorMessage}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
