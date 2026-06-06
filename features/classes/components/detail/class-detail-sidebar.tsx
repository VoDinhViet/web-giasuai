import { CalendarDays, GraduationCap } from "lucide-react"

import type { ClassDetail } from "../../types"

type ClassDetailSidebarProps = {
  classDetail: ClassDetail
  canViewStudentInsights?: boolean
}

export function ClassDetailSidebar({
  classDetail,
  canViewStudentInsights = true,
}: ClassDetailSidebarProps) {
  return (
    <aside className="space-y-5">
      <ClassInfoSection classDetail={classDetail} />
      <UpcomingSessionsSection classDetail={classDetail} />
      {canViewStudentInsights ? <LearnerSummarySection classDetail={classDetail} /> : null}
    </aside>
  )
}

function ClassInfoSection({ classDetail }: { classDetail: ClassDetail }) {
  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <GraduationCap className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">
            Thông tin lớp
          </h2>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Cấu hình vận hành lớp học.
          </p>
        </div>
      </div>
      <dl className="mt-4 grid gap-3 text-sm">
        <InfoRow label="Giáo viên" value={classDetail.instructor.fullName} />
        <InfoRow
          label="Lịch học"
          value={classDetail.schedule ?? "Chưa lên lịch"}
        />
        <InfoRow
          label="Thời gian"
          value={formatClassDateRange(
            classDetail.startDate,
            classDetail.endDate
          )}
        />
      </dl>
    </section>
  )
}

function UpcomingSessionsSection({
  classDetail,
}: {
  classDetail: ClassDetail
}) {
  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <CalendarDays className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">
            Buổi học sắp tới
          </h2>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Lịch cần giáo viên theo dõi.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {(classDetail.sessions ?? []).length > 0 ? (
          (classDetail.sessions ?? []).map((session) => (
            <div
              key={session.title}
              className="rounded border border-border/70 bg-background p-3"
            >
              <p className="text-sm font-semibold text-foreground">
                {session.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {session.sessionDate} · {session.timeRange}
              </p>
              <p className="text-xs leading-5 text-muted-foreground">
                {session.room ?? "Chưa có phòng"}
              </p>
            </div>
          ))
        ) : (
          <p className="rounded border border-dashed border-border/80 p-4 text-sm text-muted-foreground">
            Chưa có lịch học sắp tới.
          </p>
        )}
      </div>
    </section>
  )
}

function LearnerSummarySection({ classDetail }: { classDetail: ClassDetail }) {
  const studentCount = classDetail.studentCount ?? classDetail.students?.length ?? 0

  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <GraduationCap className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">
            Người học
          </h2>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Sĩ số lớp đang hoạt động.
          </p>
        </div>
      </div>
      <p className="mt-4 rounded border border-border/70 bg-background p-4 text-sm text-muted-foreground">
        Hiện có <span className="font-semibold text-foreground">{studentCount}</span>/{classDetail.maxStudents} học viên trong lớp.
      </p>
    </section>
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

function formatClassDateRange(
  startDate: string | null,
  endDate: string | null
) {
  if (!startDate && !endDate) {
    return "Chưa lên lịch"
  }

  if (!endDate) {
    return startDate ?? "Chưa lên lịch"
  }

  return `${startDate ?? "Chưa rõ"} - ${endDate}`
}
