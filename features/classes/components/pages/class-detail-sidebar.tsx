import { AlertTriangle, CalendarDays, GraduationCap } from "lucide-react"

import type { ClassDetail, ClassStudent } from "../../types"
import { ClassDetailSectionHeader } from "./class-detail-section-header"

type ClassDetailSidebarProps = {
  classDetail: ClassDetail
}

export function ClassDetailSidebar({ classDetail }: ClassDetailSidebarProps) {
  const riskStudents = classDetail.students.filter(isRiskStudent)

  return (
    <aside className="space-y-5">
      <ClassInfoSection classDetail={classDetail} />
      <UpcomingSessionsSection classDetail={classDetail} />
      <RiskStudentsSection riskStudents={riskStudents} />
    </aside>
  )
}

function ClassInfoSection({ classDetail }: { classDetail: ClassDetail }) {
  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <ClassDetailSectionHeader
        icon={GraduationCap}
        title="Thông tin lớp"
        description="Cấu hình vận hành lớp học."
      />
      <dl className="mt-4 grid gap-3 text-sm">
        <InfoRow
          label="Khóa chính"
          value={classDetail.courseName ?? "Chưa gắn khóa học"}
        />
        <InfoRow
          label="Giáo viên"
          value={classDetail.teacherName ?? "Chưa phân công"}
        />
        <InfoRow
          label="Lịch học"
          value={classDetail.schedule ?? "Chưa lên lịch"}
        />
        <InfoRow
          label="Phòng học"
          value={classDetail.room ?? "Chưa có phòng"}
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
      <ClassDetailSectionHeader
        icon={CalendarDays}
        title="Buổi học sắp tới"
        description="Lịch cần giáo viên theo dõi."
      />
      <div className="mt-4 grid gap-3">
        {classDetail.sessions.length > 0 ? (
          classDetail.sessions.map((session) => (
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

function RiskStudentsSection({
  riskStudents,
}: {
  riskStudents: ClassStudent[]
}) {
  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <ClassDetailSectionHeader
        icon={AlertTriangle}
        title="Cần hỗ trợ"
        description="Học viên có dấu hiệu chậm tiến độ."
      />
      <div className="mt-4 grid gap-3">
        {riskStudents.length > 0 ? (
          riskStudents.map((student) => (
            <div
              key={student.studentCode}
              className="rounded border border-border/70 bg-background p-3"
            >
              <p className="text-sm font-semibold text-foreground">
                {student.fullName}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Điểm danh {student.attendanceRate}% · Tiến độ{" "}
                {student.progressPercent}%
              </p>
            </div>
          ))
        ) : (
          <p className="rounded border border-dashed border-border/80 p-4 text-sm text-muted-foreground">
            Chưa có học viên cần cảnh báo.
          </p>
        )}
      </div>
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

function isRiskStudent(student: ClassStudent) {
  return student.status === "RISK" || student.status === "WARNING"
}
