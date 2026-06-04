"use client"

import type { LucideIcon } from "lucide-react"
import {
  Award,
  BookOpenCheck,
  Brain,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileQuestion,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Question = {
  id: string
  title: string
  skill: string
  options: string[]
}

const questions: Question[] = [
  {
    id: "q1",
    title: "Khi xét chiều biến thiên của hàm số, bước nào cần làm trước?",
    skill: "Đạo hàm",
    options: ["Tính đạo hàm", "Vẽ đồ thị", "Tìm tiệm cận", "Tính diện tích"],
  },
  {
    id: "q2",
    title: "Nếu đạo hàm dương trên một khoảng thì hàm số có xu hướng gì?",
    skill: "Khảo sát hàm số",
    options: ["Đồng biến", "Nghịch biến", "Không xác định", "Luôn bằng 0"],
  },
  {
    id: "q3",
    title: "Mini-test đầu vào nên dùng để xác định gì?",
    skill: "Phân loại năng lực",
    options: ["Năng lực hiện tại", "Tên lớp", "Mã học viên", "Số điện thoại"],
  },
]

const testCards = [
  { title: "Toán 12 - Nền tảng", duration: "25 phút", questions: "20 câu", level: "Trung bình" },
  { title: "Tư duy logic", duration: "20 phút", questions: "15 câu", level: "Cơ bản" },
  { title: "Ôn đề nhanh", duration: "30 phút", questions: "25 câu", level: "Nâng cao" },
]

const history = [
  { title: "Toán 12 - Nền tảng", score: "72%", result: "Trung bình khá", time: "02/06/2026" },
  { title: "Tư duy logic", score: "81%", result: "Khá", time: "28/05/2026" },
  { title: "Ôn đề nhanh", score: "64%", result: "Cần luyện thêm", time: "20/05/2026" },
]

export function PlacementTestsPage() {
  const [answers, setAnswers] = React.useState<Record<string, string>>({
    q1: "Tính đạo hàm",
    q2: "Đồng biến",
  })
  const [hasResult, setHasResult] = React.useState(true)
  const answeredCount = Object.keys(answers).length
  const score = Math.round((answeredCount / questions.length) * 86)

  function updateAnswer(questionId: string, option: string) {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [questionId]: option }))
  }

  function handleSubmit() {
    setHasResult(true)
  }

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="overflow-hidden rounded border border-border/80 bg-card shadow-xs">
          <div className="bg-primary px-5 py-6 text-primary-foreground sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <span className="inline-flex h-7 items-center rounded bg-primary-foreground/15 px-2.5 text-xs font-semibold ring-1 ring-primary-foreground/25">
                  Placement Test
                </span>
                <h1 className="mt-3 text-2xl font-bold">
                  Kiểm tra năng lực đầu vào
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-primary-foreground/80">
                  Làm bài test ngắn để phân loại năng lực và đề xuất lộ trình phù hợp.
                </p>
              </div>
              <Button type="button" className="w-fit bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={handleSubmit}>
                <ClipboardCheck className="size-4" />
                Chấm điểm
              </Button>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Bài test" value="3" helper="Có thể làm" icon={FileQuestion} />
            <SummaryCard label="Đã trả lời" value={`${answeredCount}/${questions.length}`} helper="Trong bài hiện tại" icon={CheckCircle2} />
            <SummaryCard label="Thời gian" value="25p" helper="Dự kiến" icon={Clock3} />
            <SummaryCard label="Kết quả" value={hasResult ? `${score}%` : "--"} helper="Điểm tạm tính" icon={Award} />
          </div>
        </section>

        <section className="grid items-start gap-5 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={BookOpenCheck}
              title="Chọn bài test"
              description="Mỗi bài test phục vụ mục tiêu phân loại khác nhau."
            />
            <div className="mt-4 grid gap-3">
              {testCards.map((testCard, index) => (
                <button
                  key={testCard.title}
                  type="button"
                  className={`rounded border p-4 text-left transition-colors ${index === 0 ? "border-primary/40 bg-primary/5" : "border-border/70 bg-background hover:border-primary/30"}`}
                >
                  <p className="text-sm font-semibold text-foreground">{testCard.title}</p>
                  <p className="mt-2 text-xs leading-5 font-medium text-muted-foreground">
                    {testCard.duration} · {testCard.questions} · {testCard.level}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={FileQuestion}
              title="Bài test hiện tại"
              description="Trả lời nhanh để hệ thống phân loại năng lực."
            />
            <div className="mt-5 grid gap-4">
              {questions.map((question, index) => (
                <div key={question.id} className="rounded border border-border/70 bg-background p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Câu {index + 1} · {question.skill}
                      </span>
                      <h2 className="mt-2 text-base font-semibold text-foreground">
                        {question.title}
                      </h2>
                    </div>
                    {answers[question.id] ? (
                      <span className="w-fit rounded bg-success-container px-2.5 py-1 text-xs font-semibold text-success ring-1 ring-success/20">
                        Đã chọn
                      </span>
                    ) : null}
                  </div>
                  <RadioGroup
                    className="mt-4"
                    value={answers[question.id]}
                    onValueChange={(value) => updateAnswer(question.id, value)}
                  >
                    {question.options.map((option) => (
                      <label key={option} className="flex cursor-pointer items-center gap-3 rounded border border-border/70 bg-card px-3 py-3 text-sm font-medium text-foreground hover:border-primary/30">
                        <RadioGroupItem value={option} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </section>
        </section>

        {hasResult ? (
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={Brain}
              title="Kết quả phân loại"
              description="AI dùng kết quả test để đề xuất cấp độ và lộ trình học."
            />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <ResultBox title="Cấp độ" value="Trung bình khá" helper="Phù hợp lớp nền tảng nâng cao" />
              <ResultBox title="Điểm mạnh" value="Nắm khái niệm" helper="Có thể học bài ứng dụng" />
              <ResultBox title="Cần cải thiện" value="Tốc độ phản xạ" helper="Nên luyện mini-test ngắn" />
            </div>
          </section>
        ) : null}
      </div>

      <aside className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={Target}
            title="Lộ trình gợi ý"
            description="Sinh từ kết quả bài test."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="Tuần 1" value="Ôn đạo hàm và xét dấu." />
            <InfoBox title="Tuần 2" value="Luyện khảo sát hàm số." />
            <InfoBox title="Tuần 3" value="Mini-test tổng hợp và sửa lỗi." />
          </div>
          <Button type="button" className="mt-4 w-full">
            <Sparkles className="size-4" />
            Tạo lộ trình AI
          </Button>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={CalendarDays}
            title="Lịch sử test"
            description="Các lần kiểm tra gần đây."
          />
          <div className="mt-4 grid gap-3">
            {history.map((historyItem) => (
              <InfoBox
                key={`${historyItem.title}-${historyItem.time}`}
                title={historyItem.title}
                value={`${historyItem.score} · ${historyItem.result} · ${historyItem.time}`}
              />
            ))}
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={GraduationCap}
            title="Quy tắc phân loại"
            description="Mốc điểm tham khảo."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="80% trở lên" value="Khá/Giỏi, vào lộ trình nâng cao." />
            <InfoBox title="60% - 79%" value="Trung bình khá, củng cố theo điểm yếu." />
            <InfoBox title="Dưới 60%" value="Cần học lại nền tảng trước." />
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

function ResultBox({ title, value, helper }: { title: string; value: string; helper: string }) {
  return (
    <div className="rounded border border-border/70 bg-background p-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase">{title}</p>
      <p className="mt-2 text-lg font-bold text-foreground">{value}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{helper}</p>
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
