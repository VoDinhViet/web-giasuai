"use client"

import { useForm } from "@tanstack/react-form"
import { useState } from "react"
import { FileText, Layers3, Plus, Trash2, Upload } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { updateLessonTheories } from "@/features/lessons/actions/update-lesson-theories"
import type { LessonPart } from "@/features/lessons/types"
import { cn } from "@/lib/utils"
import { LessonEditorPanelTitle } from "./lesson-editor-panel-title"

type TheoryFormValues = {
  files: Array<File | null>
}

type LessonEditorTheoryTabProps = {
  lessonId: string
  parts: LessonPart[]
}

export function LessonEditorTheoryTab({
  lessonId,
  parts,
}: LessonEditorTheoryTabProps) {
  const [partIds, setPartIds] = useState(() =>
    parts.length > 0 ? parts.map((part) => part.id) : [crypto.randomUUID()]
  )
  const defaultValues: TheoryFormValues = {
    files: Array.from({ length: Math.max(parts.length, 1) }, () => null),
  }
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const files = value.files.filter((file): file is File => Boolean(file))

      if (files.length === 0) {
        toast.error("Vui lòng chọn ít nhất một file lý thuyết.")
        return
      }

      try {
        await updateLessonTheories(lessonId, files)
        toast.success(`Đã lưu ${files.length} file lý thuyết.`)
      } catch {
        toast.error("Không thể lưu file lý thuyết.")
      }
    },
  })

  function handleAddPart() {
    setPartIds((currentPartIds) => [...currentPartIds, crypto.randomUUID()])
    form.setFieldValue("files", [...form.state.values.files, null])
  }

  function handleRemovePart(index: number) {
    setPartIds((currentPartIds) =>
      currentPartIds.filter((_, partIndex) => partIndex !== index)
    )
    form.setFieldValue(
      "files",
      form.state.values.files.filter((_, fileIndex) => fileIndex !== index)
    )
  }

  return (
    <Card>
      <CardHeader className="border-b border-border/70 bg-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <LessonEditorPanelTitle
            icon={Layers3}
            title="Nội dung lý thuyết"
            description="Mỗi phần lý thuyết gắn với một file PDF, DOC hoặc DOCX."
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="grid gap-3">
            {partIds.map((partId, index) => {
              const fieldName = `files[${index}]` as `files[${number}]`

              return (
                <form.Field key={partId} name={fieldName}>
                  {(field) => (
                    <ContentBlock
                      index={index + 1}
                      file={field.state.value}
                      onBlur={field.handleBlur}
                      onFileChange={field.handleChange}
                      onRemove={() => handleRemovePart(index)}
                      canRemove={partIds.length > 1}
                    />
                  )}
                </form.Field>
              )
            })}

            <Button
              type="button"
              variant="outline"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-dashed border-border py-6 text-sm font-medium transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              onClick={handleAddPart}
            >
              <Plus className="size-4" />
              Thêm phần lý thuyết mới
            </Button>
          </div>
          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <Button
              type="submit"
              className="shadow-sm transition-all hover:shadow active:scale-[0.98]"
            >
              <Upload className="size-4" />
              Lưu file lý thuyết
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function ContentBlock({
  index,
  file,
  onBlur,
  onFileChange,
  onRemove,
  canRemove,
}: {
  index: number
  file: File | null
  onBlur: () => void
  onFileChange: (file: File | null) => void
  onRemove: () => void
  canRemove: boolean
}) {
  const fileInputId = `theory-part-file-${index}`
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => onFileChange(acceptedFiles[0] ?? null),
  })

  return (
    <div
      className={cn(
        "grid gap-4 rounded-xl border p-4 transition-all duration-200 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
        file
          ? "border-primary/20 bg-primary/5 hover:border-primary/30"
          : "border-dashed border-border/80 bg-muted/5 hover:border-muted-foreground/20"
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-lg border transition-colors duration-200",
            file
              ? "border-primary/25 bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground"
          )}
        >
          <FileText className="size-5" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-foreground">
              Phần {index}
            </p>
            <span className="rounded border border-border bg-background px-2 py-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              PDF / DOC / DOCX
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {file ? (
              <span className="font-medium text-foreground/80">
                {file.name}{" "}
                <span className="text-muted-foreground/60">
                  ({formatFileSize(file.size)})
                </span>
              </span>
            ) : (
              "Chưa chọn file lý thuyết"
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <div
          {...getRootProps({
            className: cn(
              "inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground active:scale-95",
              isDragActive && "border-primary bg-primary/5 text-primary"
            ),
          })}
        >
          <input
            {...getInputProps({
              id: fileInputId,
              onBlur,
            })}
          />
          <span className="inline-flex items-center gap-2">
            <Upload className="size-4" />
            {file ? "Đổi file" : "Chọn file"}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 rounded-lg px-3 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          disabled={!canRemove}
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
          Xóa
        </Button>
      </div>
    </div>
  )
}

function formatFileSize(fileSize: number) {
  if (fileSize < 1024 * 1024) {
    return `${Math.max(1, Math.round(fileSize / 1024))} KB`
  }

  return `${(fileSize / (1024 * 1024)).toFixed(1)} MB`
}
