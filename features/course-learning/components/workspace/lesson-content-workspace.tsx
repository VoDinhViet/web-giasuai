import { ClipboardList, PlayCircle, FileQuestion, CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Lesson } from "@/features/lessons/types"
import { cn } from "@/lib/utils"
import { SectionHeader } from "../shared/section-header"

interface LessonContentWorkspaceProps {
  lesson: Lesson
  objective?: string
}

export function LessonContentWorkspace({
  lesson,
  objective,
}: LessonContentWorkspaceProps) {
  const theoryParts = getTheoryParts(lesson, objective)
  const exerciseQuestions = Array.from({ length: 10 }, (_, questionIndex) => ({
    questionNumber: questionIndex + 1,
    status:
      questionIndex < 3
        ? "Đã làm"
        : questionIndex === 3
          ? "Đang làm"
          : "Chưa làm",
  }))

  return (
    <Card>
      <CardHeader>
        <SectionHeader
          icon={ClipboardList}
          title="Nội dung bài học"
          description="Học lý thuyết theo từng phần, chạy mô phỏng, rồi hoàn thành bài tập 10 câu."
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theory" className="w-full gap-4">
          <TabsList
            className="h-auto w-full justify-start overflow-x-auto"
            variant="line"
          >
            <TabsTrigger value="theory">
              <ClipboardList className="size-4" />
              Lý thuyết
            </TabsTrigger>
            <TabsTrigger value="simulation">
              <PlayCircle className="size-4" />
              Mô phỏng
            </TabsTrigger>
            <TabsTrigger value="exercise">
              <FileQuestion className="size-4" />
              Bài tập 10 câu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory" className="grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Lý thuyết
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {theoryParts.length} phần nội dung cần đọc trước khi mô phỏng.
                </p>
              </div>
              <Badge variant="outline">Nhiều phần</Badge>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {theoryParts.map((part) => (
                <div
                  key={part.order}
                  className="rounded border border-border/70 bg-background p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/15">
                      {part.order}
                    </span>
                    <Badge variant={part.order === 1 ? "default" : "secondary"}>
                      {part.status}
                    </Badge>
                  </div>
                  <h4 className="mt-3 text-sm leading-5 font-semibold text-foreground">
                    {part.title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {part.summary}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="simulation"
            className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]"
          >
            <div className="rounded border border-border/70 bg-background p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    Mô phỏng
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Khu vực chạy tình huống tương tác sau khi học xong lý
                    thuyết.
                  </p>
                </div>
                <Badge variant="outline" className="w-fit">
                  Sẵn sàng
                </Badge>
              </div>

              <div className="mt-4 grid min-h-60 place-items-center rounded border border-dashed border-border bg-muted/40">
                <div className="grid place-items-center gap-3 p-6 text-center">
                  <span className="grid size-12 place-items-center rounded bg-primary/10 text-primary ring-1 ring-primary/15">
                    <PlayCircle className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Mô phỏng: {lesson.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Nhúng file mô phỏng hoặc preview tương tác tại đây.
                    </p>
                  </div>
                  <Button type="button" size="sm">
                    <PlayCircle className="size-4" />
                    Chạy mô phỏng
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded border border-border/70 bg-background p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Điều kiện mở bài tập
              </h3>
              <div className="mt-3 grid gap-2">
                {[
                  "Đọc đủ các phần lý thuyết",
                  "Hoàn thành mô phỏng",
                  "Làm bài tập 10 câu",
                ].map((condition, conditionIndex) => (
                  <div
                    key={condition}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2
                      className={cn(
                        "size-4 shrink-0",
                        conditionIndex < 2
                          ? "text-success"
                          : "text-muted-foreground"
                      )}
                    />
                    <span className="text-muted-foreground">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="exercise"
            className="rounded border border-border/70 bg-background p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Bài tập kiểm tra
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  10 câu hỏi, có đáp án và giải thích sau khi nộp bài.
                </p>
              </div>
              <Button type="button" variant="outline" size="sm">
                <FileQuestion className="size-4" />
                Làm bài tập
              </Button>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {exerciseQuestions.map((question) => (
                <div
                  key={question.questionNumber}
                  className="flex items-center justify-between gap-2 rounded border border-border/70 bg-card px-3 py-2"
                >
                  <span className="text-sm font-semibold text-foreground">
                    Câu {question.questionNumber}
                  </span>
                  <Badge
                    variant={
                      question.status === "Đã làm"
                        ? "outline"
                        : question.status === "Đang làm"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {question.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function getTheoryParts(lesson: Lesson, objective?: string) {
  return [
    {
      order: 1,
      title: "Khái niệm chính",
      summary: objective ?? `Nắm mục tiêu và bối cảnh của bài ${lesson.title}.`,
      status: "Đang học",
    },
    {
      order: 2,
      title: "Ví dụ minh họa",
      summary: "Đọc ví dụ mẫu và ghi lại điểm cần chú ý trước khi thực hành.",
      status: "Chưa học",
    },
    {
      order: 3,
      title: "Tổng kết áp dụng",
      summary: "Tóm tắt kiến thức và chuẩn bị dữ liệu cho phần mô phỏng.",
      status: "Chưa học",
    },
  ]
}
