import Link from "next/link"
import type { Route } from "next"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  BarChart3,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileQuestion,
  GraduationCap,
  LifeBuoy,
  PackageCheck,
  Route as RouteIcon,
  Send,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { classes } from "@/features/classes/constants/class-data"
import { courses } from "@/features/courses/constants/course-data"
import { students } from "@/features/students/constants/student-data"

type DashboardCardTone =
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "violet"

const kpiCards = [
  {
    label: "Lớp đang chạy",
    value: "18",
    helper: "+12% so với tuần trước",
    icon: GraduationCap,
    tone: "info",
  },
  {
    label: "Học viên rủi ro",
    value: "5",
    helper: "+2 so với hôm qua",
    icon: AlertTriangle,
    tone: "danger",
  },
  {
    label: "Lộ trình đã sinh",
    value: "12",
    helper: "Trong 3 ngày tới",
    icon: RouteIcon,
    tone: "warning",
  },
  {
    label: "AI requests",
    value: "25K",
    helper: "+8 so với hôm qua",
    icon: Bot,
    tone: "success",
  },
  {
    label: "Ticket chờ",
    value: "5",
    helper: "+1 so với hôm qua",
    icon: Ticket,
    tone: "violet",
  },
  {
    label: "Quota gần hạn",
    value: "7",
    helper: "+2 so với hôm qua",
    icon: Zap,
    tone: "danger",
  },
] satisfies {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: DashboardCardTone
}[]

const alertCards = [
  {
    label: "Học viên cần hỗ trợ",
    value: "5",
    helper: "Xem chi tiết",
    icon: AlertTriangle,
    tone: "danger",
    href: "/manage/weaknesses",
  },
  {
    label: "Lớp sắp khai giảng",
    value: "12",
    helper: "Xem chi tiết",
    icon: GraduationCap,
    tone: "warning",
    href: "/manage/classes",
  },
  {
    label: "Ticket quá hạn",
    value: "3",
    helper: "Xem chi tiết",
    icon: LifeBuoy,
    tone: "warning",
    href: "/manage/tickets",
  },
  {
    label: "AI quota cần xử lý",
    value: "7",
    helper: "Xem chi tiết",
    icon: CircleDollarSign,
    tone: "danger",
    href: "/manage/ai-usage",
  },
  {
    label: "Placement test mới",
    value: "8",
    helper: "Trong 3 ngày tới",
    icon: FileQuestion,
    tone: "info",
    href: "/manage/placement-tests",
  },
] satisfies {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: DashboardCardTone
  href: string
}[]

const lateStudents = [
  {
    code: "HV-004",
    name: "Phạm Ngọc Linh",
    className: "B2B Sales A01",
    issue: "Điểm danh thấp",
    status: "Nguy cơ",
  },
  {
    code: "HV-003",
    name: "Trần Hoàng Phúc",
    className: "B2B Sales A01",
    issue: "Tiến độ chậm",
    status: "Theo dõi",
  },
  {
    code: "HV-031",
    name: "Võ Thanh Tùng",
    className: "Onboarding U01",
    issue: "Cần ôn nền",
    status: "Theo dõi",
  },
]

const missingResources = [
  { code: "AI-CTX-01", name: "Context bài học", missing: "25", unit: "job" },
  { code: "QUIZ-MATH", name: "Câu hỏi mini-test", missing: "180", unit: "câu" },
  { code: "PATH-TPL", name: "Template lộ trình", missing: "12", unit: "mẫu" },
  { code: "EMAIL-INV", name: "Email mời lớp", missing: "30", unit: "lượt" },
]

const supportRows = [
  {
    code: "TIC-001",
    source: "Dashboard học viên",
    type: "Lớp chưa hiện",
    date: "03/06/2026",
    status: "Mở",
  },
  {
    code: "TIC-002",
    source: "AI Tutor",
    type: "Sai ngữ cảnh",
    date: "02/06/2026",
    status: "Chờ",
  },
  {
    code: "TIC-003",
    source: "AI quota",
    type: "Xin tăng quota",
    date: "02/06/2026",
    status: "Mở",
  },
]

const quickActions = [
  {
    label: "Tạo lớp",
    helper: "Mở danh sách lớp học",
    href: "/manage/classes",
    icon: GraduationCap,
    tone: "info",
  },
  {
    label: "Tạo test",
    helper: "Tạo bài kiểm tra đầu vào",
    href: "/manage/placement-tests",
    icon: FileQuestion,
    tone: "warning",
  },
  {
    label: "Tạo ticket",
    helper: "Ghi nhận yêu cầu hỗ trợ",
    href: "/manage/tickets",
    icon: LifeBuoy,
    tone: "danger",
  },
  {
    label: "Sinh lộ trình",
    helper: "Tạo kế hoạch học theo mục tiêu",
    href: "/manage/learning-paths",
    icon: RouteIcon,
    tone: "violet",
  },
  {
    label: "AI Tutor",
    helper: "Chat theo ngữ cảnh bài học",
    href: "/manage/ai-assistant",
    icon: Bot,
    tone: "success",
  },
  {
    label: "AI quota",
    helper: "Theo dõi chi phí và hạn mức",
    href: "/manage/ai-usage",
    icon: CircleDollarSign,
    tone: "primary",
  },
] satisfies {
  label: string
  helper: string
  href: string
  icon: LucideIcon
  tone: DashboardCardTone
}[]

const dashboardCardToneClassName =
  "[&_[data-tone=default]_svg]:text-primary [&_[data-tone=info]_svg]:text-secondary [&_[data-tone=success]_svg]:text-success [&_[data-tone=warning]_svg]:text-tertiary [&_[data-tone=danger]_svg]:text-destructive [&_[data-tone=violet]_svg]:text-primary [&_[data-tone=primary]]:border-primary [&_[data-tone=primary]]:bg-primary [&_[data-tone=primary]>[data-slot=card-header]_[data-slot=card-description]]:text-primary-foreground/80 [&_[data-tone=primary]>[data-slot=card-header]_[data-slot=card-title]]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-header]_svg]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-content]>[data-slot=card-title]]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-content]>[data-slot=card-description]]:text-primary-foreground/80"

export function ManageDashboardPage() {
  const activeClassCount = classes.filter(
    (classItem) => classItem.status === "active"
  ).length
  const totalStudentCount = classes.reduce(
    (total, classItem) => total + classItem.studentCount,
    0
  )
  const totalCourseLearners = courses.reduce(
    (total, course) => total + course.learnerCount,
    0
  )
  const averageAttendance = Math.round(
    students.reduce((total, student) => total + student.attendanceRate, 0) /
      Math.max(students.length, 1)
  )

  return (
    <div className={`grid gap-5 ${dashboardCardToneClassName}`}>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {kpiCards.map((card) => (
          <KpiCard key={card.label} {...card} />
        ))}
      </section>

      <Card tone="violet">
        <CardHeader>
          <SectionTitle icon={Sparkles} title="Cảnh báo quan trọng" />
          <CardDescription>
            Luồng cần admin kiểm tra sớm trong ngày.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-5">
            {alertCards.map((alert) => (
              <AlertCard key={alert.label} {...alert} />
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr_1fr]">
        <Card tone="success">
          <CardHeader>
            <SectionTitle icon={BarChart3} title="Tiến độ học tập" />
            <CardDescription>Tổng quan toàn hệ thống.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-[12rem_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[12rem_minmax(0,1fr)]">
              <DonutChart value="75" label="job" />
              <LegendList
                rows={[
                  ["Đang học", activeClassCount.toString(), "33%"],
                  ["Chờ duyệt", "4", "5%"],
                  ["Cần hỗ trợ", "3", "4%"],
                  ["Hoàn thành", totalStudentCount.toString(), "62%"],
                  ["Tạm dừng", "2", "3%"],
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <TablePanel
          tone="danger"
          icon={AlertTriangle}
          title="Học viên cần hỗ trợ"
          description="Danh sách học viên có tín hiệu giảm tiến độ hoặc cần giáo viên can thiệp."
          columns={["Mã", "Học viên", "Vấn đề", "Trạng thái"]}
          rows={lateStudents.map((row) => [
            row.code,
            row.name,
            row.issue,
            row.status,
          ])}
        />

        <TablePanel
          tone="warning"
          icon={PackageCheck}
          title="Thiếu dữ liệu vận hành"
          description="Các nhóm dữ liệu còn thiếu để lớp, test và AI chạy ổn định."
          columns={["Mã", "Tên", "Thiếu", "ĐVT"]}
          rows={missingResources.map((row) => [
            row.code,
            row.name,
            row.missing,
            row.unit,
          ])}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr_1fr]">
        <TablePanel
          tone="info"
          icon={LifeBuoy}
          title="Ticket chưa xử lý"
          description="Yêu cầu hỗ trợ mới hoặc đang chờ phản hồi từ bộ phận phụ trách."
          columns={["Ticket", "Nguồn", "Loại", "Trạng thái"]}
          rows={supportRows.map((row) => [
            row.code,
            row.source,
            row.type,
            row.status,
          ])}
        />

        <Card tone="primary">
          <CardHeader>
            <SectionTitle icon={TrendingUp} title="Tỷ lệ đạt QC" />
            <CardDescription>
              Điểm danh, tiến độ và bài hoàn thành.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <ProgressMetric
                label="Điểm danh"
                value={`${averageAttendance}%`}
                helper="Trung bình toàn bộ học viên"
              />
              <ProgressMetric
                label="Hoàn thành module"
                value="76%"
                helper="Theo module đang mở"
              />
              <ProgressMetric
                label="AI Tutor pass"
                value="82%"
                helper="Phiên chat đạt mục tiêu"
              />
              <ProgressMetric
                label="Placement pass"
                value="68%"
                helper="Bài test đạt ngưỡng"
              />
            </div>
          </CardContent>
        </Card>

        <Card tone="violet">
          <CardHeader>
            <SectionTitle icon={Send} title="Thao tác nhanh" />
            <CardDescription>
              Đi nhanh tới nghiệp vụ thường dùng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon

                return (
                  <Card key={action.label} size="sm" tone={action.tone}>
                    <CardHeader>
                      <SectionTitle icon={Icon} title={action.label} />
                      <CardDescription>{action.helper}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button type="button" variant="outline" size="sm" asChild>
                        <Link href={action.href as Route}>Mở</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5">
        <Card tone="info">
          <CardHeader>
            <SectionTitle icon={Users} title="Tổng quan dữ liệu" />
            <CardDescription>Quy mô hệ thống hiện tại.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <KpiCard
                tone="info"
                label="Lớp"
                value={classes.length.toString()}
                helper="Tổng lớp"
                icon={GraduationCap}
              />
              <KpiCard
                tone="primary"
                label="Khóa"
                value={courses.length.toString()}
                helper="Tổng khóa"
                icon={CheckCircle2}
              />
              <KpiCard
                tone="success"
                label="Học viên"
                value={totalStudentCount.toString()}
                helper="Theo lớp"
                icon={Users}
              />
              <KpiCard
                tone="warning"
                label="Đăng ký"
                value={totalCourseLearners.toString()}
                helper="Theo khóa"
                icon={Ticket}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function KpiCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: DashboardCardTone
}) {
  return (
    <Card size="sm" tone={tone}>
      <CardHeader>
        <SectionTitle icon={Icon} title={label} />
      </CardHeader>
      <CardContent>
        <CardTitle>{value}</CardTitle>
        <CardDescription>{helper}</CardDescription>
      </CardContent>
    </Card>
  )
}

function AlertCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
  href,
}: {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: DashboardCardTone
  href: string
}) {
  return (
    <Card size="sm" tone={tone}>
      <CardHeader>
        <SectionTitle icon={Icon} title={`${value} ${label}`} />
        <CardDescription>{helper}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={href as Route}>Xem chi tiết</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function TablePanel({
  tone,
  icon,
  title,
  description,
  columns,
  rows,
}: {
  tone: DashboardCardTone
  icon: LucideIcon
  title: string
  description: string
  columns: string[]
  rows: string[][]
}) {
  return (
    <Card tone={tone}>
      <CardHeader>
        <SectionTitle icon={icon} title={title} />
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.join("-")}>
                {row.map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function DonutChart({ value, label }: { value: string; label: string }) {
  return (
    <div className="grid place-items-center">
      <svg viewBox="0 0 120 120" className="size-40">
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="18"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="var(--chart-1)"
          strokeDasharray="90 270"
          strokeWidth="18"
          transform="rotate(-90 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="var(--chart-2)"
          strokeDasharray="70 290"
          strokeDashoffset="-92"
          strokeWidth="18"
          transform="rotate(-90 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="var(--chart-3)"
          strokeDasharray="55 305"
          strokeDashoffset="-164"
          strokeWidth="18"
          transform="rotate(-90 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="var(--chart-4)"
          strokeDasharray="45 315"
          strokeDashoffset="-220"
          strokeWidth="18"
          transform="rotate(-90 60 60)"
        />
        <text
          x="60"
          y="56"
          textAnchor="middle"
          className="fill-foreground text-xs font-semibold"
        >
          Tổng số
        </text>
        <text
          x="60"
          y="75"
          textAnchor="middle"
          className="fill-foreground text-xl font-bold"
        >
          {value}
        </text>
        <text
          x="60"
          y="91"
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          {label}
        </text>
      </svg>
    </div>
  )
}

function LegendList({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="grid gap-2">
      {rows.map(([label, value, percent]) => (
        <div key={label} className="flex items-center justify-between gap-3">
          <span>{label}</span>
          <span>
            {value} ({percent})
          </span>
        </div>
      ))}
    </div>
  )
}

function ProgressMetric({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <Card size="sm" tone="default">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>
          {value} · {helper}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

function BarList({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="grid gap-3">
      {rows.map(([label, value, helper]) => (
        <Card key={label} size="sm" tone="default">
          <CardHeader>
            <CardTitle>{label}</CardTitle>
            <CardDescription>
              {value} {helper}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon
  title: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon />
      <CardTitle>{title}</CardTitle>
    </div>
  )
}
