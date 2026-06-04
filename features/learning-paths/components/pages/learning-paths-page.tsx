"use client"

import type { LucideIcon } from "lucide-react"
import {
  Bot,
  CalendarDays,
  Clock3,
  FileText,
  GraduationCap,
  Layers3,
  Route,
  Sparkles,
  Target,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type PathScope = "student" | "class"

const pathSteps = [
  {
    week: "Tuần 1",
    title: "Củng cố nền tảng",
    description: "Ôn kiến thức lõi, làm mini-test và ghi lại lỗi sai chính.",
    tasks: ["3 bài luyện nền", "1 mini-test 15 phút", "Xem lại video trọng tâm"],
    progress: 32,
  },
  {
    week: "Tuần 2",
    title: "Luyện theo điểm yếu",
    description: "Tập trung vào các phần AI phát hiện học viên đang thiếu chắc.",
    tasks: ["5 câu vận dụng", "Sửa lỗi sai cùng AI Tutor", "Báo cáo giáo viên"],
    progress: 0,
  },
  {
    week: "Tuần 3",
    title: "Tăng tốc đề tổng hợp",
    description: "Kết hợp kiến thức, luyện tốc độ và kỹ năng chọn phương án.",
    tasks: ["2 đề ngắn", "Checklist công thức", "Phân tích thời gian làm bài"],
    progress: 0,
  },
]

const generatedPaths = [
  { title: "Lộ trình Toán 12 - Đạo hàm", target: "Cá nhân", time: "3 tuần", status: "Đang chạy" },
  { title: "B2B Sales A01 - Củng cố kỹ năng", target: "Lớp học", time: "4 tuần", status: "Nháp" },
  { title: "Ôn đề theo năng lực", target: "Cá nhân", time: "2 tuần", status: "Hoàn thành" },
]

const aiInputs = [
  { title: "Điểm yếu", value: "Khảo sát hàm số, phản xạ đề" },
  { title: "Mức hiện tại", value: "Trung bình khá" },
  { title: "Thời lượng", value: "45 phút/ngày" },
  { title: "Mục tiêu", value: "Tăng điểm kiểm tra lên 8+" },
]

export function LearningPathsPage() {
  const [scope, setScope] = React.useState<PathScope>("student")
  const [targetName, setTargetName] = React.useState("Lê Minh Khang")
  const [goal, setGoal] = React.useState("Cải thiện phần đạo hàm và khảo sát hàm số trong 3 tuần")
  const [duration, setDuration] = React.useState("3 tuần")
  const [isGenerated, setIsGenerated] = React.useState(true)

  function handleGenerate() {
    setIsGenerated(true)
  }

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="overflow-hidden rounded border border-border/80 bg-card shadow-xs">
          <div className="bg-primary px-5 py-6 text-primary-foreground sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <span className="inline-flex h-7 items-center rounded bg-primary-foreground/15 px-2.5 text-xs font-semibold ring-1 ring-primary-foreground/25">
                  Sinh lộ trình AI
                </span>
                <h1 className="mt-3 text-2xl font-bold">
                  Tạo lộ trình học theo mục tiêu
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-primary-foreground/80">
                  AI tổng hợp điểm yếu, thời lượng học và mục tiêu để đề xuất kế hoạch theo tuần.
                </p>
              </div>
              <Button type="button" className="w-fit bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={handleGenerate}>
                <Sparkles className="size-4" />
                Sinh lộ trình
              </Button>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Lộ trình" value="12" helper="Đã tạo" icon={Route} />
            <SummaryCard label="Đang chạy" value="4" helper="Theo dõi tiến độ" icon={Clock3} />
            <SummaryCard label="Module" value="36" helper="Trong các lộ trình" icon={Layers3} />
            <SummaryCard label="AI saved" value="6h" helper="Thời gian thiết kế" icon={Bot} />
          </div>
        </section>

        <section className="grid items-start gap-5 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={Target}
              title="Cấu hình đầu vào"
              description="Chọn phạm vi và mục tiêu để AI sinh kế hoạch."
            />
            <div className="mt-5 flex rounded border border-border/70 bg-background p-1">
              <Button
                type="button"
                variant={scope === "student" ? "default" : "ghost"}
                className="flex-1"
                onClick={() => {
                  setScope("student")
                  setTargetName("Lê Minh Khang")
                }}
              >
                Cá nhân
              </Button>
              <Button
                type="button"
                variant={scope === "class" ? "default" : "ghost"}
                className="flex-1"
                onClick={() => {
                  setScope("class")
                  setTargetName("B2B Sales A01")
                }}
              >
                Lớp học
              </Button>
            </div>

            <FieldGroup className="mt-5 grid gap-4">
              <Field>
                <FieldLabel htmlFor="targetName">
                  {scope === "student" ? "Học viên" : "Lớp học"}
                </FieldLabel>
                <Input
                  id="targetName"
                  value={targetName}
                  onChange={(event) => setTargetName(event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="duration">Thời lượng</FieldLabel>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="goal">Mục tiêu</FieldLabel>
                <Textarea
                  id="goal"
                  rows={4}
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={Bot}
              title="Lộ trình đề xuất"
              description="Bản preview sau khi AI sinh kế hoạch."
            />
            {isGenerated ? (
              <div className="mt-5 grid gap-4">
                <div className="rounded border border-primary/20 bg-primary/5 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-foreground">
                        {scope === "student" ? "Lộ trình cá nhân" : "Lộ trình lớp"}: {targetName}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {goal} · {duration}
                      </p>
                    </div>
                    <Button type="button" size="sm">
                      Lưu lộ trình
                    </Button>
                  </div>
                </div>

                {pathSteps.map((step, index) => (
                  <div key={step.week} className="rounded border border-border/70 bg-background p-4">
                    <div className="flex gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground">{step.week}</p>
                            <h3 className="mt-1 text-base font-semibold text-foreground">
                              {step.title}
                            </h3>
                          </div>
                          <span className="w-fit rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                            {step.progress}%
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {step.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {step.tasks.map((task) => (
                            <span key={task} className="rounded bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground ring-1 ring-primary/10">
                              {task}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 h-2 overflow-hidden rounded bg-muted">
                          <div className="h-full rounded bg-primary" style={{ width: `${step.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        </section>
      </div>

      <aside className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={FileText}
            title="Dữ liệu AI dùng"
            description="Nguồn đầu vào để tạo lộ trình."
          />
          <div className="mt-4 grid gap-3">
            {aiInputs.map((input) => (
              <InfoBox key={input.title} title={input.title} value={input.value} />
            ))}
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={CalendarDays}
            title="Lộ trình gần đây"
            description="Bản đã sinh để tiếp tục chỉnh."
          />
          <div className="mt-4 grid gap-3">
            {generatedPaths.map((path) => (
              <div key={path.title} className="rounded border border-border/70 bg-background px-3 py-3">
                <p className="text-sm font-semibold text-foreground">{path.title}</p>
                <p className="mt-1 text-xs leading-5 font-medium text-muted-foreground">
                  {path.target} · {path.time} · {path.status}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={GraduationCap}
            title="Nguyên tắc"
            description="Kiểm soát chất lượng lộ trình."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="Có mốc đo" value="Mỗi tuần có mini-test hoặc bài đánh giá." />
            <InfoBox title="Theo điểm yếu" value="Ưu tiên phần học viên đang thiếu chắc." />
            <InfoBox title="Có can thiệp" value="Giáo viên có thể sửa trước khi xuất bản." />
          </div>
        </section>
      </aside>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}) {
  return (
    <div className="rounded border border-border/80 bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{helper}</p>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded border border-border/70 bg-background px-3 py-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 font-medium text-muted-foreground">{value}</p>
    </div>
  )
}
