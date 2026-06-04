import Link from "next/link"
import type { Route } from "next"

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  MoreHorizontal,
  Plus,
  UserCheck,
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
import type { ClassDetail, ClassSession, ClassSessionStatus } from "../../types"

type ClassSessionsPageProps = {
  classDetail: ClassDetail
  sessions: ClassSession[]
}

export function ClassSessionsPage({
  classDetail,
  sessions,
}: ClassSessionsPageProps) {
  const completedSessions = sessions.filter(
    (session) => session.status === "COMPLETED"
  ).length
  const scheduledSessions = sessions.filter(
    (session) => session.status === "SCHEDULED"
  ).length
  const nextSession = sessions.find((session) => session.status === "SCHEDULED")

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                {classDetail.code}
              </span>
              <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                {classDetail.name}
              </span>
            </div>
            <h1 className="mt-3 text-2xl leading-8 font-bold text-foreground lg:text-3xl lg:leading-10">
              Quản lý buổi học
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Giáo viên quản lý lịch từng buổi, nội dung học, phòng học và trạng
              thái điểm danh trước khi chuyển sang màn điểm danh chi tiết.
            </p>
          </div>

          <Button type="button">
            <Plus className="size-4" />
            Thêm buổi học
          </Button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Tổng buổi"
          value={sessions.length.toString()}
          helper="Trong lớp hiện tại"
          icon={CalendarDays}
        />
        <MetricCard
          label="Đã hoàn thành"
          value={completedSessions.toString()}
          helper="Có dữ liệu điểm danh"
          icon={CheckCircle2}
        />
        <MetricCard
          label="Sắp diễn ra"
          value={scheduledSessions.toString()}
          helper="Cần chuẩn bị"
          icon={Clock3}
        />
        <MetricCard
          label="Sĩ số"
          value={`${classDetail.studentCount}/${classDetail.maxStudents}`}
          helper="Theo lớp học"
          icon={UserCheck}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs">
          <div className="border-b border-border/70 p-4">
            <h2 className="text-lg leading-7 font-semibold text-foreground">
              Danh sách buổi học
            </h2>
            <p className="text-sm text-muted-foreground">
              Theo dõi từng buổi để mở điểm danh hoặc cập nhật nội dung học.
            </p>
          </div>

          <Table className="min-w-230">
            <TableHeader className="bg-muted/20">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="h-11 w-28 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Mã buổi
                </TableHead>
                <TableHead className="h-11 w-64 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Nội dung
                </TableHead>
                <TableHead className="h-11 w-56 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Khóa học
                </TableHead>
                <TableHead className="h-11 w-36 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Ngày giờ
                </TableHead>
                <TableHead className="h-11 w-36 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Phòng
                </TableHead>
                <TableHead className="h-11 w-32 border-r border-border/60 px-3 text-right text-xs font-bold text-foreground">
                  Điểm danh
                </TableHead>
                <TableHead className="h-11 w-32 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Trạng thái
                </TableHead>
                <TableHead className="h-11 w-28 px-3 text-right text-xs font-bold text-foreground">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow
                  key={session.code}
                  className="h-14 border-border/45 hover:bg-primary/5"
                >
                  <TableCell className="border-r border-border/50 px-3 py-2 font-medium text-foreground">
                    {session.code}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">
                        {session.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.teacherName ?? "Chưa phân công"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-muted-foreground">
                    {session.courseName ?? "Chưa gắn khóa học"}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-muted-foreground">
                    {session.sessionDate} · {session.timeRange}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-muted-foreground">
                    {session.room ?? "Chưa có phòng"}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2 text-right font-medium text-foreground">
                    {session.attendanceCount}/{classDetail.studentCount}
                  </TableCell>
                  <TableCell className="border-r border-border/50 px-3 py-2">
                    <SessionStatusBadge status={session.status} />
                  </TableCell>
                  <TableCell className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        asChild
                      >
                        <Link
                          href={
                            `/manage/classes/${classDetail.code}/sessions/${session.code}/attendance` as Route
                          }
                        >
                          <UserCheck className="size-4" />
                        </Link>
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
              icon={Clock3}
              title="Buổi gần nhất"
              description="Buổi học giáo viên cần chuẩn bị."
            />
            {nextSession ? (
              <SessionCard session={nextSession} />
            ) : (
              <p className="mt-4 rounded border border-dashed border-border/80 p-4 text-sm text-muted-foreground">
                Chưa có buổi học sắp tới.
              </p>
            )}
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={MapPin}
              title="Thông tin lớp"
              description="Ngữ cảnh lịch học."
            />
            <dl className="mt-4 grid gap-3 text-sm">
              <InfoRow label="Lớp" value={classDetail.name} />
              <InfoRow
                label="Giáo viên"
                value={classDetail.teacherName ?? "Chưa phân công"}
              />
              <InfoRow
                label="Lịch mặc định"
                value={classDetail.schedule ?? "Chưa lên lịch"}
              />
              <InfoRow
                label="Phòng mặc định"
                value={classDetail.room ?? "Chưa có phòng"}
              />
            </dl>
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
  icon: typeof CalendarDays
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
  icon: typeof CalendarDays
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

function SessionCard({ session }: { session: ClassSession }) {
  return (
    <div className="mt-4 rounded border border-border/70 bg-background p-4">
      <p className="font-semibold text-foreground">{session.title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {session.courseName ?? "Chưa gắn khóa học"}
      </p>
      <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
        <span>
          {session.sessionDate} · {session.timeRange}
        </span>
        <span>{session.room ?? "Chưa có phòng"}</span>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border/70 bg-background px-3 py-3">
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm leading-6 font-medium text-foreground">
        {value}
      </dd>
    </div>
  )
}

function SessionStatusBadge({ status }: { status: ClassSessionStatus }) {
  const statusMap = {
    SCHEDULED: {
      label: "Sắp học",
      className: "bg-primary/10 text-primary ring-primary/20",
    },
    COMPLETED: {
      label: "Đã học",
      className: "bg-success-container/80 text-success ring-success/20",
    },
    CANCELLED: {
      label: "Đã hủy",
      className: "bg-destructive/10 text-destructive ring-destructive/20",
    },
  } satisfies Record<ClassSessionStatus, { label: string; className: string }>

  const statusMeta = statusMap[status]

  return (
    <span
      className={`inline-flex h-7 items-center rounded px-2.5 text-xs font-semibold ring-1 ${statusMeta.className}`}
    >
      {statusMeta.label}
    </span>
  )
}
