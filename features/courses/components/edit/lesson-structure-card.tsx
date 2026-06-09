import { FileQuestion, Layers3, PlaySquare } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const lessonComposerBlueprint = [
  { label: "Lý thuyết", value: "Nhiều part", icon: Layers3 },
  { label: "Mô phỏng", value: "1 mô phỏng", icon: PlaySquare },
  { label: "Bài tập", value: "10 câu hỏi", icon: FileQuestion },
]

export function LessonStructureCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cấu trúc mỗi bài</CardTitle>
        <CardDescription>
          Khi bấm biên soạn bài học, màn hình tiếp theo chia nội dung theo 3
          phần.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {lessonComposerBlueprint.map((section) => {
          const Icon = section.icon

          return (
            <div
              key={section.label}
              className="flex items-center gap-3 rounded border border-border/70 bg-background p-3"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {section.label}
                </p>
                <p className="text-xs text-muted-foreground">{section.value}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
