"use client"

import Link from "next/link"
import type { Route } from "next"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  BookOpenCheck,
  Bot,
  CheckCircle2,
  Filter,
  GraduationCap,
  Target,
  TrendingDown,
  Users,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { students, type StudentWeakness } from "@/features/students/constants/student-data"

type WeaknessLevel = StudentWeakness["level"] | "all"

const levelOptions: { label: string; value: WeaknessLevel }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Ưu tiên cao", value: "high" },
  { label: "Cần theo dõi", value: "medium" },
  { label: "Nâng cao", value: "low" },
]

const weaknessRecords = students.flatMap((student) =>
  student.weaknesses.map((weakness) => ({
    ...weakness,
    studentId: student.studentId,
    studentName: student.fullName,
    attendanceRate: student.attendanceRate,
    progress: student.progress,
    averageScore: student.averageScore,
    courseName: student.courses[0]?.courseName ?? "Chưa có khóa học",
    className: student.courses[0]?.className ?? "Chưa có lớp",
  }))
)

export function WeaknessesPage() {
  const [selectedLevel, setSelectedLevel] = React.useState<WeaknessLevel>("all")
  const filteredRecords = weaknessRecords.filter((record) =>
    selectedLevel === "all" ? true : record.level === selectedLevel
  )
  const highCount = weaknessRecords.filter((record) => record.level === "high").length
  const mediumCount = weaknessRecords.filter((record) => record.level === "medium").length
  const affectedStudentCount = new Set(weaknessRecords.map((record) => record.studentId)).size

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                  Tracking điểm yếu
                </span>
                <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                  {weaknessRecords.length} tín hiệu
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold text-foreground">
                Theo dõi lỗ hổng kiến thức
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Gom các điểm yếu theo học viên, mức ưu tiên và gợi ý can thiệp để giáo viên xử lý sớm.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Button type="button" variant="outline">
                <Bot className="size-4" />
                Sinh bài luyện AI
              </Button>
              <Button type="button">
                <Target className="size-4" />
                Tạo kế hoạch ôn
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Học viên ảnh hưởng" value={affectedStudentCount.toString()} helper="Có ít nhất 1 điểm yếu" icon={Users} />
          <SummaryCard label="Ưu tiên cao" value={highCount.toString()} helper="Cần can thiệp sớm" icon={AlertTriangle} />
          <SummaryCard label="Cần theo dõi" value={mediumCount.toString()} helper="Theo dõi 7 ngày" icon={TrendingDown} />
          <SummaryCard label="Tín hiệu AI" value={weaknessRecords.length.toString()} helper="Tổng điểm yếu ghi nhận" icon={Bot} />
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SectionHeader
              icon={Filter}
              title="Bộ lọc mức độ"
              description="Lọc nhanh để ưu tiên học viên cần hỗ trợ trước."
            />
            <div className="flex flex-wrap gap-2">
              {levelOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={selectedLevel === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {filteredRecords.map((record) => (
              <div key={`${record.studentId}-${record.name}`} className="rounded border border-border/70 bg-background p-4">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <LevelBadge level={record.level} />
                      <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                        {record.courseName}
                      </span>
                    </div>
                    <h2 className="mt-3 text-base font-semibold text-foreground">
                      {record.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {record.suggestion}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
                      <span>{record.studentName}</span>
                      <span>{record.className}</span>
                      <span>Tiến độ {record.progress}%</span>
                      <span>Điểm danh {record.attendanceRate}%</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <Link href={`/manage/students/${record.studentId}` as Route}>
                        Chi tiết
                      </Link>
                    </Button>
                    <Button type="button" size="sm">
                      Giao bài
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={CheckCircle2}
            title="Quy trình xử lý"
            description="Gợi ý thao tác cho giáo viên."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="1. Chọn nhóm ưu tiên" value="Lọc `Ưu tiên cao` để xử lý trước." />
            <InfoBox title="2. Kiểm tra chi tiết" value="Mở hồ sơ học viên để xem tiến độ và lịch sử." />
            <InfoBox title="3. Giao bài can thiệp" value="Tạo bài luyện ngắn theo đúng điểm yếu." />
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={GraduationCap}
            title="Nhóm lớp cần chú ý"
            description="Các lớp đang có tín hiệu yếu."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="B2B Sales A01" value="4 tín hiệu, 2 ưu tiên cao" />
            <InfoBox title="Onboarding U01" value="2 tín hiệu cần theo dõi" />
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={BookOpenCheck}
            title="Học liệu gợi ý"
            description="Dùng để xử lý nhanh lỗ hổng."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="Bài nền tảng 15 phút" value="Dành cho học viên mất gốc." />
            <InfoBox title="Mini-test phản xạ" value="Đo tốc độ xử lý cuối tuần." />
            <InfoBox title="Bộ câu nâng cao" value="Dành cho nhóm ổn định." />
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
    <div className="rounded border border-border/80 bg-card p-4 shadow-xs">
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

function LevelBadge({ level }: { level: StudentWeakness["level"] }) {
  const levelMap = {
    high: {
      label: "Ưu tiên cao",
      className: "bg-destructive/10 text-destructive ring-destructive/20",
    },
    medium: {
      label: "Cần theo dõi",
      className: "bg-tertiary-container text-on-tertiary-container ring-tertiary/20",
    },
    low: {
      label: "Nâng cao",
      className: "bg-success-container text-success ring-success/20",
    },
  } satisfies Record<StudentWeakness["level"], { label: string; className: string }>

  return (
    <span className={`rounded px-2.5 py-1 text-xs font-semibold ring-1 ${levelMap[level].className}`}>
      {levelMap[level].label}
    </span>
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
