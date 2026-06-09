import { Eye, FileQuestion, Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LessonEditorPanelTitle } from "./lesson-editor-panel-title"

const exerciseQuestionNumbers = Array.from(
  { length: 10 },
  (_, questionIndex) => questionIndex + 1
)

export function LessonEditorExerciseTab() {
  return (
    <Card>
      <CardHeader className="border-b border-border/70 bg-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <LessonEditorPanelTitle
            icon={FileQuestion}
            title="Bài tập 10 câu hỏi"
            description="Mỗi bài học có một bài tập cuối bài để kiểm tra mức hiểu bài."
          />
          <Button type="button" size="sm">
            <Settings2 className="size-4" />
            Chỉnh sửa bài tập
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <LessonExercisePanel />
      </CardContent>
    </Card>
  )
}

function LessonExercisePanel() {
  return (
    <div className="grid gap-4 rounded border border-border/80 bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded border border-primary/25 bg-primary/5 text-primary">
            <FileQuestion className="size-4" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                Bài tập cuối bài
              </p>
              <span className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] font-semibold text-primary">
                10 câu hỏi
              </span>
              <span className="rounded border border-success/25 bg-success/5 px-2 py-0.5 text-[11px] font-semibold text-success">
                Tự động chấm
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Một bộ câu hỏi duy nhất gắn với bài học này. Học viên hoàn thành
              sau khi học xong lý thuyết và mô phỏng.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm">
            <Eye className="size-4" />
            Xem preview
          </Button>
          <Button type="button" variant="outline" size="sm">
            <Settings2 className="size-4" />
            Cấu hình
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ExerciseSummaryItem label="Số câu" value="10" helper="Cố định" />
        <ExerciseSummaryItem
          label="Điểm tối đa"
          value="10"
          helper="1 điểm/câu"
        />
        <ExerciseSummaryItem label="Điểm đạt" value="7/10" helper="70%" />
      </div>

      <div className="rounded border border-border/80 bg-card">
        <div className="flex flex-col gap-2 border-b border-border/70 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Danh sách câu hỏi
            </p>
            <p className="text-xs text-muted-foreground">
              Quản lý nhanh 10 câu hỏi của bài tập.
            </p>
          </div>
          <span className="w-fit rounded border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            10/10 câu
          </span>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-5">
          {exerciseQuestionNumbers.map((questionNumber) => (
            <div
              key={questionNumber}
              className="flex items-center gap-2 rounded border border-border/70 bg-card p-2"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded border border-primary/20 bg-primary/5 text-xs font-bold text-primary">
                {questionNumber}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  Câu {questionNumber}
                </p>
                <p className="text-[11px] text-muted-foreground">1 điểm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExerciseSummaryItem({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <div className="rounded border border-border/80 bg-card p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg leading-7 font-semibold text-foreground">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{helper}</p>
    </div>
  )
}
