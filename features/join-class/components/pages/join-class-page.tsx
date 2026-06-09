"use client"

import Link from "next/link"
import type { Route } from "next"
import type { LucideIcon } from "lucide-react"
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DoorOpen,
  GraduationCap,
  KeyRound,
  MailPlus,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const invitedClasses = [
  {
    inviteCode: "INV-A01",
    classCode: "CLS-001",
    className: "B2B Sales A01",
    teacherName: "Nguyễn Minh Anh",
    schedule: "Thứ 2, 4 - 19:00",
    seatText: "32/36 học viên",
  },

]

const requestHistory = [
  { className: "Onboarding U01", status: "Đang chờ duyệt", time: "Hôm nay" },
  { className: "Safety Workshop S04", status: "Đã tham gia", time: "25/05/2026" },
  { className: "Kỹ năng bán hàng B2B", status: "Cần bổ sung ghi chú", time: "22/05/2026" },
]

export function JoinClassPage() {
  const [classCode, setClassCode] = React.useState("CLS-001")
  const [note, setNote] = React.useState(
    "Em muốn tham gia lớp để theo kịp lộ trình và nhận bài luyện phù hợp."
  )
  const [previewClassCode, setPreviewClassCode] = React.useState("CLS-001")

  function handlePreview() {
    setPreviewClassCode(classCode.trim().toUpperCase() || "CLS-001")
  }

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="overflow-hidden rounded border border-border/80 bg-card shadow-xs">
          <div className="bg-primary px-5 py-6 text-primary-foreground sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <span className="inline-flex h-7 items-center rounded bg-primary-foreground/15 px-2.5 text-xs font-semibold ring-1 ring-primary-foreground/25">
                  Tham gia lớp
                </span>
                <h1 className="mt-3 text-2xl font-bold">
                  Nhập mã lớp hoặc nhận lời mời
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-primary-foreground/80">
                  Học viên gửi yêu cầu tham gia, giáo viên kiểm tra và phê duyệt trước khi vào lớp.
                </p>
              </div>
              <Button type="button" className="w-fit bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Bell className="size-4" />
                Xem lời mời mới
              </Button>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Lời mời" value="2" helper="Đang chờ phản hồi" icon={MailPlus} />
            <SummaryCard label="Yêu cầu" value="1" helper="Đang chờ duyệt" icon={Clock3} />
            <SummaryCard label="Đã tham gia" value="4" helper="Lớp đang học" icon={CheckCircle2} />
            <SummaryCard label="Mã hợp lệ" value="24h" helper="Thời hạn lời mời" icon={ShieldCheck} />
          </div>
        </section>

        <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={KeyRound}
              title="Nhập mã lớp"
              description="Dùng mã lớp hoặc mã lời mời giáo viên gửi cho bạn."
            />
            <FieldGroup className="mt-5 grid gap-4">
              <Field>
                <FieldLabel htmlFor="classCode">Mã lớp hoặc mã mời</FieldLabel>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="classCode"
                    value={classCode}
                    onChange={(event) => setClassCode(event.target.value)}
                    placeholder="VD: CLS-001 hoặc INV-A01"
                    className="uppercase"
                  />
                  <Button type="button" variant="outline" onClick={handlePreview}>
                    Kiểm tra
                  </Button>
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="note">Ghi chú gửi giáo viên</FieldLabel>
                <Textarea
                  id="note"
                  rows={4}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Lý do muốn tham gia lớp"
                />
              </Field>
            </FieldGroup>

            <div className="mt-5 rounded border border-primary/20 bg-primary/5 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                    {previewClassCode}
                  </span>
                  <h2 className="mt-3 text-base font-semibold text-foreground">
                    Lớp tìm thấy: B2B Sales A01
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Giáo viên Nguyễn Minh Anh · Thứ 2, 4 - 19:00 · 32/36 học viên.
                  </p>
                </div>
                <Button type="button" className="shrink-0">
                  <Send className="size-4" />
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={DoorOpen}
              title="Quy trình"
              description="Luồng tham gia lớp an toàn."
            />
            <div className="mt-4 grid gap-3">
              <InfoBox title="1. Nhập mã" value="Kiểm tra lớp trước khi gửi yêu cầu." />
              <InfoBox title="2. Chờ duyệt" value="Giáo viên xác nhận học viên trong danh sách." />
              <InfoBox title="3. Vào lớp" value="Lớp xuất hiện trong dashboard học viên." />
            </div>
          </section>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={MailPlus}
            title="Lời mời đang chờ"
            description="Các lớp giáo viên đã gửi lời mời cho bạn."
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {invitedClasses.map((classItem) => (
              <div key={classItem.inviteCode} className="rounded border border-border/70 bg-background p-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                    {classItem.inviteCode}
                  </span>
                  <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                    {classItem.classCode}
                  </span>
                </div>
                <h2 className="mt-3 text-base font-semibold text-foreground">
                  {classItem.className}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {classItem.teacherName} · {classItem.schedule} · {classItem.seatText}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" size="sm">
                    Chấp nhận
                  </Button>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <Link href={`/manage/classes/${classItem.classCode}` as Route}>
                      Xem lớp
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={CalendarDays}
            title="Lịch sử yêu cầu"
            description="Theo dõi trạng thái đã gửi."
          />
          <div className="mt-4 grid gap-3">
            {requestHistory.map((request) => (
              <InfoBox
                key={`${request.className}-${request.time}`}
                title={request.className}
                value={`${request.status} · ${request.time}`}
              />
            ))}
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={Sparkles}
            title="Gợi ý"
            description="Để được duyệt nhanh hơn."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="Ghi chú rõ mục tiêu" value="Nêu môn học, lớp mong muốn và thời gian phù hợp." />
            <InfoBox title="Kiểm tra lịch trùng" value="Tránh gửi yêu cầu vào lớp cùng khung giờ." />
            <InfoBox title="Theo dõi thông báo" value="Kết quả duyệt sẽ hiện trong dashboard." />
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={GraduationCap}
            title="Lớp phù hợp"
            description="Gợi ý theo tiến độ hiện tại."
          />
          <div className="mt-4 grid gap-3">
            <InfoBox title="Toán 12 - Đạo hàm" value="Phù hợp mục tiêu ôn tập tuần này." />
            <InfoBox title="Ôn đề theo năng lực" value="Có mini-test đầu vào trước khi học." />
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
