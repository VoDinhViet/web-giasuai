import { BrainCircuit, Eye, Upload, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LessonEditorPanelTitle } from "./lesson-editor-panel-title"

type Tone = "default" | "info" | "success" | "warning"

export function LessonEditorSimulationTab() {
  return (
    <Card>
      <CardHeader className="border-b border-border/70 bg-card">
        <LessonEditorPanelTitle
          icon={BrainCircuit}
          title="Mô phỏng tương tác"
          description="Upload file HTML/ZIP, SCORM, H5P hoặc package mô phỏng tương tác."
          iconClassName="border-success/25 bg-success/5 text-success"
        />
      </CardHeader>
      <CardContent className="grid gap-4">
        <SimulationUploadBlock
          icon={BrainCircuit}
          title="File mô phỏng tương tác"
          helper="Upload HTML/ZIP, SCORM, H5P hoặc package mô phỏng tương tác."
          inputId="interactive-simulation-file"
          accept=".html,.htm,.zip,.h5p,.scorm,application/zip,application/x-zip-compressed,text/html"
          buttonLabel="Tải file lên"
          tone="success"
        />
      </CardContent>
    </Card>
  )
}

function SimulationUploadBlock({
  icon: Icon,
  title,
  helper,
  inputId,
  accept,
  buttonLabel,
  tone,
}: {
  icon: LucideIcon
  title: string
  helper: string
  inputId: string
  accept: string
  buttonLabel: string
  tone: Tone
}) {
  return (
    <div className="grid gap-4 rounded border border-border bg-card p-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid content-start gap-4">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded border",
              tone === "info" &&
                "border-secondary/25 bg-secondary/5 text-secondary",
              tone === "success" &&
                "border-success/25 bg-success/5 text-success",
              tone === "warning" &&
                "border-tertiary/25 bg-tertiary/5 text-tertiary",
              tone === "default" &&
                "border-primary/25 bg-primary/5 text-primary"
            )}
          >
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {helper}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {["HTML", "ZIP", "SCORM", "H5P"].map((format) => (
            <span
              key={format}
              className="rounded border border-border bg-muted/30 px-2 py-1 text-xs font-semibold text-muted-foreground"
            >
              {format}
            </span>
          ))}
        </div>

        <div className="rounded border border-dashed border-border p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Chọn package mô phỏng
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Có thể upload nhiều file nếu package cần tài nguyên đi kèm.
              </p>
            </div>
            <input
              id={inputId}
              type="file"
              accept={accept}
              multiple
              className="sr-only"
            />
            <Button variant="outline" size="sm" className="w-fit" asChild>
              <label htmlFor={inputId}>
                <Upload className="size-4" />
                {buttonLabel}
              </label>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid min-h-56 content-center justify-items-center gap-3 rounded border border-border bg-muted/20 p-4 text-center">
        <span className="grid size-11 place-items-center rounded border border-border bg-card text-muted-foreground">
          <Eye className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Preview mô phỏng
          </p>
          <p className="mt-1 max-w-60 text-xs leading-5 text-muted-foreground">
            Sau khi upload, có thể xem thử mô phỏng trước khi lưu bài học.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" disabled>
          <Eye className="size-4" />
          Xem preview
        </Button>
      </div>
    </div>
  )
}
