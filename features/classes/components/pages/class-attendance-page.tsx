"use client"

import * as React from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Save,
  Search,
  UserCheck,
  UserX,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { saveClassAttendance } from "../../actions/save-class-attendance"
import type {
  ClassAttendance,
  ClassAttendanceRecord,
  ClassAttendanceStatus,
  ClassDetail,
} from "../../types"

type ClassAttendancePageProps = {
  classDetail: ClassDetail
  attendance: ClassAttendance
}

const attendanceStatusMeta = {
  PRESENT: {
    label: "Có mặt",
    icon: CheckCircle2,
    className: "bg-success-container/80 text-success ring-success/20",
  },
  LATE: {
    label: "Đi muộn",
    icon: Clock3,
    className: "bg-primary/10 text-primary ring-primary/20",
  },
  ABSENT: {
    label: "Vắng",
    icon: UserX,
    className: "bg-destructive/10 text-destructive ring-destructive/20",
  },
} satisfies Record<
  ClassAttendanceStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
>

export function ClassAttendancePage({
  classDetail,
  attendance,
}: ClassAttendancePageProps) {
  const session = attendance.session
  const [records, setRecords] = React.useState<ClassAttendanceRecord[]>(
    attendance.records
  )
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const presentCount = records.filter(
    (record) => record.status === "PRESENT"
  ).length
  const lateCount = records.filter((record) => record.status === "LATE").length
  const absentCount = records.filter(
    (record) => record.status === "ABSENT"
  ).length

  function updateRecordStatus(
    studentId: string,
    status: ClassAttendanceStatus
  ) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.studentId === studentId ? { ...record, status } : record
      )
    )
  }

  function updateRecordNote(studentId: string, note: string) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.studentId === studentId ? { ...record, note } : record
      )
    )
  }

  async function handleSaveAttendance() {
    setSubmitError(null)

    const result = await saveClassAttendance({
      classCode: classDetail.code,
      sessionCode: session.code,
      records: records.map((record) => ({
        studentId: record.studentId,
        status: record.status,
        note: record.note ?? undefined,
      })),
    })

    if (!result.success || !result.data) {
      setSubmitError(result.message ?? "Không thể lưu điểm danh.")
      return
    }

    setRecords(result.data.records)
  }

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
                {session.code}
              </span>
            </div>
            <h1 className="mt-3 text-2xl leading-8 font-bold text-foreground lg:text-3xl lg:leading-10">
              Điểm danh buổi học
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              {session.title} · {session.sessionDate} · {session.timeRange} ·{" "}
              {session.room ?? "Chưa có phòng"}
            </p>
          </div>

          <Button type="button" onClick={handleSaveAttendance}>
            <Save className="size-4" />
            Lưu điểm danh
          </Button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Sĩ số"
          value={records.length.toString()}
          helper="Trong lớp hiện tại"
          icon={UserCheck}
        />
        <MetricCard
          label="Có mặt"
          value={presentCount.toString()}
          helper="Đã xác nhận"
          icon={CheckCircle2}
        />
        <MetricCard
          label="Đi muộn"
          value={lateCount.toString()}
          helper="Cần ghi chú"
          icon={Clock3}
        />
        <MetricCard
          label="Vắng"
          value={absentCount.toString()}
          helper="Cần theo dõi"
          icon={AlertTriangle}
        />
      </section>

      {submitError ? (
        <p className="rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {submitError}
        </p>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="min-w-0 overflow-hidden rounded-(--radius) border border-border/80 bg-card shadow-xs">
          <div className="flex flex-col gap-3 border-b border-border/70 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg leading-7 font-semibold text-foreground">
                Danh sách điểm danh
              </h2>
              <p className="text-sm text-muted-foreground">
                Chọn trạng thái từng học viên và thêm ghi chú nếu cần.
              </p>
            </div>
            <div className="relative min-w-0 sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Tìm học viên"
                placeholder="Tìm mã, tên học viên"
                className="pl-8"
              />
            </div>
          </div>

          <Table className="min-w-240">
            <TableHeader className="bg-muted/20">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="h-11 w-28 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Mã HV
                </TableHead>
                <TableHead className="h-11 w-64 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Học viên
                </TableHead>
                <TableHead className="h-11 w-36 border-r border-border/60 px-3 text-right text-xs font-bold text-foreground">
                  Điểm danh TB
                </TableHead>
                <TableHead className="h-11 w-72 border-r border-border/60 px-3 text-xs font-bold text-foreground">
                  Trạng thái buổi học
                </TableHead>
                <TableHead className="h-11 w-72 px-3 text-xs font-bold text-foreground">
                  Ghi chú
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => {
                return (
                  <TableRow
                    key={record.studentId}
                    className="h-14 border-border/45 hover:bg-primary/5"
                  >
                    <TableCell className="border-r border-border/50 px-3 py-2 font-medium text-foreground">
                      {record.studentCode}
                    </TableCell>
                    <TableCell className="border-r border-border/50 px-3 py-2">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">
                          {record.fullName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="border-r border-border/50 px-3 py-2 text-right font-medium text-foreground">
                      {record.attendanceRate}%
                    </TableCell>
                    <TableCell className="border-r border-border/50 px-3 py-2">
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(attendanceStatusMeta).map(
                          ([status, meta]) => {
                            const typedStatus = status as ClassAttendanceStatus
                            const Icon = meta.icon
                            const isSelected = record?.status === typedStatus

                            return (
                              <Button
                                key={status}
                                type="button"
                                size="sm"
                                variant={isSelected ? "default" : "outline"}
                                className={cn(
                                  "h-8 gap-1.5 px-2.5 text-xs",
                                  isSelected ? "" : "bg-background"
                                )}
                                onClick={() =>
                                  updateRecordStatus(
                                    record.studentId,
                                    typedStatus
                                  )
                                }
                              >
                                <Icon className="size-3.5" />
                                {meta.label}
                              </Button>
                            )
                          }
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <Input
                        value={record?.note ?? ""}
                        placeholder="Nhập ghi chú"
                        onChange={(event) =>
                          updateRecordNote(record.studentId, event.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </section>

        <aside className="space-y-5">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={UserCheck}
              title="Tổng kết buổi học"
              description="Kiểm tra nhanh trước khi lưu."
            />
            <dl className="mt-4 grid gap-3 text-sm">
              <InfoRow label="Lớp" value={classDetail.name} />
              <InfoRow label="Buổi học" value={session.title} />
              <InfoRow
                label="Khóa học"
                value={session.courseName ?? "Chưa gắn khóa học"}
              />
              <InfoRow
                label="Giáo viên"
                value={session.teacherName ?? "Chưa phân công"}
              />
              <InfoRow label="Phòng" value={session.room ?? "Chưa có phòng"} />
            </dl>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={AlertTriangle}
              title="Cần chú ý"
              description="Học viên vắng hoặc đi muộn."
            />
            <div className="mt-4 grid gap-3">
              {records
                .filter((record) => record.status !== "PRESENT")
                .map((record) => {
                  return (
                    <div
                      key={record.studentId}
                      className="rounded border border-border/70 bg-background p-3"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {record.fullName}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {attendanceStatusMeta[record.status].label}
                        {record.note ? ` · ${record.note}` : ""}
                      </p>
                    </div>
                  )
                })}
            </div>
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
  icon: typeof UserCheck
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
  icon: typeof UserCheck
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
