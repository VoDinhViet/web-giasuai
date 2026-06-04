"use client"

import Link from "next/link"
import type { Route } from "next"
import type { LucideIcon } from "lucide-react"
import {
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  UserPlus,
  UserX,
  Users,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { updateClassEnrollmentStatus } from "../../actions/update-class-enrollment-status"
import type {
  ClassDetail,
  ClassEnrollment,
  ClassEnrollmentStatus,
} from "../../types"

type ClassEnrollmentsPageProps = {
  classDetail: ClassDetail
  enrollments: ClassEnrollment[]
}

export function ClassEnrollmentsPage({
  classDetail,
  enrollments,
}: ClassEnrollmentsPageProps) {
  const [requests, setRequests] = React.useState(enrollments)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const pendingCount = requests.filter(
    (request) => request.status === "PENDING"
  ).length
  const approvedCount = requests.filter(
    (request) => request.status === "ACTIVE"
  ).length
  const rejectedCount = requests.filter(
    (request) => request.status === "REJECTED"
  ).length
  const availableSeats = Math.max(
    classDetail.maxStudents - classDetail.studentCount,
    0
  )

  async function updateRequestStatus(
    enrollmentId: string,
    status: ClassEnrollmentStatus
  ) {
    setSubmitError(null)

    const result = await updateClassEnrollmentStatus({
      classCode: classDetail.code,
      enrollmentId,
      status,
    })

    if (!result.success || !result.data) {
      setSubmitError(result.message ?? "Không thể cập nhật yêu cầu ghi danh.")
      return
    }

    const updatedEnrollment = result.data

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === enrollmentId ? updatedEnrollment : request
      )
    )
  }

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                  {classDetail.code}
                </span>
                <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                  Còn {availableSeats} chỗ
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold text-foreground">
                Phê duyệt học viên vào lớp
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Kiểm tra yêu cầu tham gia lớp {classDetail.name}, duyệt hoặc từ
                chối trước khi học viên vào lớp.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href={`/manage/classes/${classDetail.code}` as Route}>
                  Về chi tiết lớp
                </Link>
              </Button>
              <Button type="button">
                <Mail className="size-4" />
                Mời học viên
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Đang chờ"
            value={pendingCount.toString()}
            helper="Cần xử lý"
            icon={Clock3}
          />
          <SummaryCard
            label="Đã duyệt"
            value={approvedCount.toString()}
            helper="Trong đợt này"
            icon={UserCheck}
          />
          <SummaryCard
            label="Từ chối"
            value={rejectedCount.toString()}
            helper="Không đủ điều kiện"
            icon={UserX}
          />
          <SummaryCard
            label="Sĩ số"
            value={`${classDetail.studentCount}/${classDetail.maxStudents}`}
            helper="Hiện tại"
            icon={Users}
          />
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={UserPlus}
            title="Yêu cầu tham gia"
            description="Duyệt nhanh học viên gửi mã lớp hoặc xác nhận lời mời."
          />
          {submitError ? (
            <p className="mt-4 rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {submitError}
            </p>
          ) : null}
          <div className="mt-5 grid gap-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded border border-border/70 bg-background p-4"
              >
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge status={request.status} />
                      <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                        {request.source === "CODE" ? "Mã lớp" : "Lời mời"}
                      </span>
                      <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                        {request.studentCode}
                      </span>
                    </div>
                    <h2 className="mt-3 text-base font-semibold text-foreground">
                      {request.studentName}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {request.email}
                    </p>
                    <p className="mt-3 rounded border border-border/70 bg-card px-3 py-3 text-sm leading-6 text-foreground">
                      {request.note ?? "Không có ghi chú."}
                    </p>
                    <p className="mt-2 text-xs font-medium text-muted-foreground">
                      Gửi lúc {request.requestedAt}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={request.status === "ACTIVE"}
                      onClick={() => updateRequestStatus(request.id, "ACTIVE")}
                    >
                      <CheckCircle2 className="size-4" />
                      Duyệt
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={request.status === "REJECTED"}
                      onClick={() =>
                        updateRequestStatus(request.id, "REJECTED")
                      }
                    >
                      <UserX className="size-4" />
                      Từ chối
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <MessageSquare className="size-4" />
                      Nhắn tin
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
            icon={ShieldCheck}
            title="Điều kiện duyệt"
            description="Checklist trước khi cho học viên vào lớp."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox
              title="Còn chỗ trống"
              value={`${availableSeats} chỗ có thể nhận thêm.`}
            />
            <InfoBox
              title="Không trùng lịch"
              value={classDetail.schedule ?? "Chưa lên lịch"}
            />
            <InfoBox
              title="Đúng mục tiêu"
              value="Ghi chú học viên phù hợp nội dung lớp."
            />
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={MessageSquare}
            title="Mẫu phản hồi"
            description="Nội dung gửi nhanh cho học viên."
          />
          <Textarea
            className="mt-4 min-h-32"
            defaultValue="Chào em, yêu cầu tham gia lớp đã được ghi nhận. Giáo viên sẽ kiểm tra lịch học và xác nhận trong thời gian sớm nhất."
          />
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={Users}
            title="Thông tin lớp"
            description="Tóm tắt để duyệt đúng ngữ cảnh."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="Tên lớp" value={classDetail.name} />
            <InfoBox
              title="Giáo viên"
              value={classDetail.teacherName ?? "Chưa phân công"}
            />
            <InfoBox
              title="Phòng học"
              value={classDetail.room ?? "Chưa có phòng"}
            />
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
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: ClassEnrollmentStatus }) {
  const statusMap = {
    PENDING: {
      label: "Đang chờ",
      className:
        "bg-tertiary-container text-on-tertiary-container ring-tertiary/20",
    },
    ACTIVE: {
      label: "Đã duyệt",
      className: "bg-success-container text-success ring-success/20",
    },
    REJECTED: {
      label: "Từ chối",
      className: "bg-destructive/10 text-destructive ring-destructive/20",
    },
    COMPLETED: {
      label: "Hoàn thành",
      className: "bg-muted text-muted-foreground ring-border",
    },
    DROPPED: {
      label: "Đã rời lớp",
      className: "bg-destructive/10 text-destructive ring-destructive/20",
    },
  } satisfies Record<
    ClassEnrollmentStatus,
    { label: string; className: string }
  >

  return (
    <span
      className={`rounded px-2.5 py-1 text-xs font-semibold ring-1 ${statusMap[status].className}`}
    >
      {statusMap[status].label}
    </span>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded border border-border/70 bg-background px-3 py-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 font-medium text-muted-foreground">
        {value}
      </p>
    </div>
  )
}
