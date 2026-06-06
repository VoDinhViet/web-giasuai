import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FilePenLine,
  MoreHorizontal,
  Plus,
  Timer,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type {
  Course,
  CourseAssignment,
  CourseAssignmentStatus,
} from "../../constants/course-data"

type CourseAssignmentsPageProps = {
  course: Course
}

export function CourseAssignmentsPage({ course }: CourseAssignmentsPageProps) {
  const totalSubmissions = course.assignments.reduce(
    (total, assignment) => total + assignment.submissionCount,
    0
  )
  const totalGraded = course.assignments.reduce(
    (total, assignment) => total + assignment.gradedCount,
    0
  )
  const gradingCount = course.assignments.filter(
    (assignment) => assignment.status === "grading"
  ).length
  const averageScore = course.assignments.length
    ? (
        course.assignments.reduce(
          (total, assignment) => total + assignment.averageScore,
          0
        ) / course.assignments.length
      ).toFixed(1)
    : "0"

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                {course.courseCode}
              </span>
              <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                {course.courseName}
              </span>
            </div>
            <h1 className="mt-3 text-2xl leading-8 font-bold text-foreground lg:text-3xl lg:leading-10">
              Bài tập & chấm điểm
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Quản lý bài tập, quiz, dự án và tiến độ chấm điểm trong khóa học.
              Màn này giúp giáo viên theo dõi bài nộp và phản hồi học viên.
            </p>
          </div>

          <Button type="button">
            <Plus className="size-4" />
            Thêm bài tập
          </Button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Tổng bài tập"
          value={course.assignments.length.toString()}
          helper="Trong khóa học"
          icon={ClipboardCheck}
        />
        <MetricCard
          label="Bài nộp"
          value={totalSubmissions.toString()}
          helper="Tổng lượt nộp"
          icon={FilePenLine}
        />
        <MetricCard
          label="Đã chấm"
          value={`${totalGraded}/${totalSubmissions}`}
          helper="Tiến độ chấm"
          icon={CheckCircle2}
        />
        <MetricCard
          label="Điểm TB"
          value={averageScore}
          helper="Toàn bộ bài tập"
          icon={BarChart3}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs">
          <div className="border-b border-border/70 p-4">
            <h2 className="text-lg leading-7 font-semibold text-foreground">
              Danh sách bài tập
            </h2>
            <p className="text-sm text-muted-foreground">
              Theo dõi hạn nộp, bài đã nộp và trạng thái chấm điểm.
            </p>
          </div>

          <Table className="min-w-240">
            <TableHeader className="bg-muted/20">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="h-11 w-32 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Mã bài
                </TableHead>
                <TableHead className="h-11 w-72 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Bài tập
                </TableHead>
                <TableHead className="h-11 w-28 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Loại
                </TableHead>
                <TableHead className="h-11 w-32 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Hạn nộp
                </TableHead>
                <TableHead className="h-11 w-32 border-r border-border/60 px-3 text-right text-xs font-bold text-foreground">
                  Bài nộp
                </TableHead>
                <TableHead className="h-11 w-32 border-r border-border/60 px-3 text-right text-xs font-bold text-foreground">
                  Đã chấm
                </TableHead>
                <TableHead className="h-11 w-28 border-r border-border/60 px-3 text-right text-xs font-bold text-foreground">
                  Điểm TB
                </TableHead>
                <TableHead className="h-11 w-32 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Trạng thái
                </TableHead>
                <TableHead className="h-11 w-24 px-3 text-right text-xs font-bold text-foreground">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {course.assignments.map((assignment) => (
                <TableRow
                  key={assignment.assignmentCode}
                  className="h-14 border-border/45 hover:bg-primary/5"
                >
                  <TableCell className="border-r border-border/50 px-3 py-2 font-medium text-foreground">
                    {assignment.assignmentCode}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">
                        {assignment.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Gắn với bài {assignment.lessonCode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-muted-foreground">
                    {assignment.type}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-muted-foreground">
                    {assignment.dueDate}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-right font-medium text-foreground">
                    {assignment.submissionCount}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-right font-medium text-foreground">
                    {assignment.gradedCount}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-right font-medium text-foreground">
                    {assignment.averageScore || "--"}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2">
                    <AssignmentStatusBadge status={assignment.status} />
                  </TableCell>
                  <TableCell className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      <Button type="button" variant="ghost" size="icon-sm">
                        <Eye className="size-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <aside className="space-y-5">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={Timer}
              title="Cần chấm"
              description="Các bài tập còn tồn đọng."
            />
            <div className="mt-4 grid gap-3">
              {course.assignments
                .filter((assignment) => assignment.status === "grading")
                .map((assignment) => (
                  <AssignmentCard
                    key={assignment.assignmentCode}
                    assignment={assignment}
                  />
                ))}
              {gradingCount === 0 ? (
                <p className="rounded border border-dashed border-border/80 p-4 text-sm text-muted-foreground">
                  Không có bài cần chấm.
                </p>
              ) : null}
            </div>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={CheckCircle2}
              title="Quy trình chấm điểm"
              description="Các bước giáo viên cần thực hiện."
            />
            <ul className="mt-4 grid gap-3 text-sm text-foreground">
              <li className="rounded border border-border/70 bg-background px-3 py-3">
                Mở bài tập để xem danh sách bài nộp.
              </li>
              <li className="rounded border border-border/70 bg-background px-3 py-3">
                Nhập điểm và phản hồi cho từng học viên.
              </li>
              <li className="rounded border border-border/70 bg-background px-3 py-3">
                Xuất bản điểm sau khi kiểm tra hoàn tất.
              </li>
            </ul>
          </section>
        </aside>
      </section>
    </div>
  )
}

function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string
  value: string
  helper: string
  icon: typeof ClipboardCheck
}) {
  return (
    <div className="rounded border border-border/80 bg-card p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
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
  icon: typeof ClipboardCheck
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function AssignmentCard({ assignment }: { assignment: CourseAssignment }) {
  return (
    <div className="rounded border border-border/70 bg-background p-3">
      <p className="text-sm font-semibold text-foreground">
        {assignment.title}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {assignment.gradedCount}/{assignment.submissionCount} bài đã chấm · Hạn{" "}
        {assignment.dueDate}
      </p>
    </div>
  )
}

function AssignmentStatusBadge({ status }: { status: CourseAssignmentStatus }) {
  const statusMap = {
    open: {
      label: "Đang nhận bài",
      className: "bg-primary/10 text-primary ring-primary/20",
    },
    grading: {
      label: "Đang chấm",
      className: "bg-primary/10 text-primary ring-primary/20",
    },
    graded: {
      label: "Đã chấm",
      className: "bg-success-container/80 text-success ring-success/20",
    },
    draft: {
      label: "Bản nháp",
      className: "bg-muted text-muted-foreground ring-border",
    },
  } satisfies Record<
    CourseAssignmentStatus,
    { label: string; className: string }
  >

  const statusMeta = statusMap[status]

  return (
    <span
      className={`inline-flex h-7 items-center rounded px-2.5 text-xs font-semibold ring-1 ${statusMeta.className}`}
    >
      {statusMeta.label}
    </span>
  )
}
