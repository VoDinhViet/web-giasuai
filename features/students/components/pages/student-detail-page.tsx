import Link from "next/link"
import type { Route } from "next"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  Bot,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Mail,
  MessageSquare,
  Phone,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getNameInitials } from "@/lib/string.util"
import type { ClassStudentStatus } from "@/features/classes/constants/class-data"
import type { StudentDetail, StudentWeakness } from "../../constants/student-data"

type StudentDetailPageProps = {
  student: StudentDetail
}

export function StudentDetailPage({ student }: StudentDetailPageProps) {
  const initials = getNameInitials(student.fullName)

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 gap-4">
              <Avatar className="size-20 shrink-0 border-4 border-primary/15 bg-primary/10" size="lg">
                <AvatarFallback className="text-2xl font-bold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                    {student.studentId}
                  </span>
                  <StudentStatusBadge status={student.status} />
                </div>
                <h1 className="mt-3 truncate text-2xl font-bold text-foreground">
                  {student.fullName}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Hồ sơ tiến độ học tập, điểm yếu, khóa học đang tham gia và ghi chú từ giáo viên.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Button type="button" variant="outline">
                <MessageSquare className="size-4" />
                Nhắn học viên
              </Button>
              <Button type="button">
                <Target className="size-4" />
                Giao bài luyện
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Điểm danh"
            value={`${student.attendanceRate}%`}
            helper="Tỷ lệ tham gia buổi học"
            icon={CalendarCheck}
          />
          <SummaryCard
            label="Tiến độ"
            value={`${student.progress}%`}
            helper="Theo khóa học đang học"
            icon={TrendingUp}
          />
          <SummaryCard
            label="Điểm TB"
            value={student.averageScore ? student.averageScore.toString() : "--"}
            helper="Bài tập và kiểm tra"
            icon={CheckCircle2}
          />
          <SummaryCard
            label="AI Practice"
            value={student.aiPracticeCount.toString()}
            helper="Lượt luyện gần đây"
            icon={Bot}
          />
        </section>

        <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={BookOpenCheck}
              title="Khóa học đang theo"
              description="Tiến độ học viên theo từng khóa được gắn vào lớp."
            />
            <div className="mt-4 grid gap-3">
              {student.courses.map((course) => (
                <div key={`${course.classCode}-${course.courseCode}`} className="rounded border border-border/70 bg-background p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">
                        {course.courseName}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {course.className} · {course.completedLessons}/{course.lessonCount} bài
                      </p>
                    </div>
                    <Button type="button" variant="outline" size="sm" asChild>
                      <Link href={`/manage/classes/${course.classCode}` as Route}>
                        Xem lớp
                      </Link>
                    </Button>
                  </div>
                  <ProgressBar value={course.progress} className="mt-4" />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={Clock3}
              title="Nhịp học"
              description="Tín hiệu học tập trong tháng."
            />
            <dl className="mt-4 grid gap-3">
              <InfoRow label="Giờ học" value={`${student.learningHours} giờ`} />
              <InfoRow label="Hoạt động cuối" value={student.lastActive} />
              <InfoRow label="Số khóa đang học" value={student.courses.length.toString()} />
            </dl>
          </section>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={AlertTriangle}
            title="Điểm yếu cần theo dõi"
            description="Gợi ý từ dữ liệu tiến độ để giáo viên can thiệp đúng lúc."
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {student.weaknesses.map((weakness) => (
              <WeaknessCard key={weakness.name} weakness={weakness} />
            ))}
          </div>
        </section>
      </div>

      <aside className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={UserRound}
            title="Thông tin liên hệ"
            description="Kênh liên lạc với học viên."
          />
          <dl className="mt-4 grid gap-3">
            <ContactRow icon={Mail} label="Email" value={student.email} />
            <ContactRow icon={Phone} label="Điện thoại" value={student.phone} />
            <ContactRow icon={GraduationCap} label="Vai trò" value="Học viên" />
          </dl>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={MessageSquare}
            title="Ghi chú giáo viên"
            description="Nhận xét nội bộ phục vụ theo dõi."
          />
          <p className="mt-4 rounded border border-border/70 bg-background p-3 text-sm leading-6 text-foreground">
            {student.teacherNote}
          </p>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={CheckCircle2}
            title="Hoạt động gần đây"
            description="Dòng thời gian học tập."
          />
          <div className="mt-4 grid gap-3">
            {student.recentActivities.map((activity) => (
              <div key={activity.title} className="rounded border border-border/70 bg-background px-3 py-3">
                <p className="text-sm font-semibold text-foreground">
                  {activity.title}
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            ))}
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
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-2 text-2xl leading-8 font-semibold text-foreground">
            {value}
          </p>
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
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">
        <span>Tiến độ</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded bg-muted">
        <div className="h-full rounded bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function WeaknessCard({ weakness }: { weakness: StudentWeakness }) {
  const tone = {
    high: "bg-destructive/10 text-destructive ring-destructive/20",
    medium: "bg-tertiary-container text-on-tertiary-container ring-tertiary/20",
    low: "bg-success-container text-success ring-success/20",
  }[weakness.level]

  return (
    <div className="rounded border border-border/70 bg-background p-4">
      <span className={`rounded px-2 py-1 text-xs font-semibold ring-1 ${tone}`}>
        {weakness.level === "high" ? "Ưu tiên cao" : weakness.level === "medium" ? "Cần theo dõi" : "Nâng cao"}
      </span>
      <p className="mt-3 font-semibold text-foreground">{weakness.name}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {weakness.suggestion}
      </p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border/70 bg-background px-3 py-3">
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3 rounded border border-border/70 bg-background p-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
        <dd className="mt-1 break-words text-sm font-medium text-foreground">
          {value}
        </dd>
      </div>
    </div>
  )
}

function StudentStatusBadge({ status }: { status: ClassStudentStatus }) {
  const statusMap = {
    good: {
      label: "Ổn định",
      className: "bg-success-container text-success ring-success/20",
    },
    warning: {
      label: "Cần theo dõi",
      className: "bg-tertiary-container text-on-tertiary-container ring-tertiary/20",
    },
    risk: {
      label: "Nguy cơ cao",
      className: "bg-destructive/10 text-destructive ring-destructive/20",
    },
  } satisfies Record<ClassStudentStatus, { label: string; className: string }>

  return (
    <span className={`rounded px-2.5 py-1 text-xs font-semibold ring-1 ${statusMap[status].className}`}>
      {statusMap[status].label}
    </span>
  )
}
