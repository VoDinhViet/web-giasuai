import { CalendarDays } from "lucide-react"

import type { ClassSession } from "../../types"

const FAKE_SESSIONS: ClassSession[] = [
  {
    id: "session-1",
    code: "SES001",
    title: "Buổi 1: Giới thiệu tổng quan & Thiết lập môi trường",
    courseId: null,
    courseName: null,
    instructorId: null,
    instructorName: null,
    sessionDate: "08/06/2026",
    startTime: "19:00",
    endTime: "21:00",
    timeRange: "19:00 - 21:00",
    room: "Phòng Zoom A (Trực tuyến)",
    status: "SCHEDULED",
  },
  {
    id: "session-2",
    code: "SES002",
    title: "Buổi 2: Các khái niệm cơ bản & Thực hành Lab 1",
    courseId: null,
    courseName: null,
    instructorId: null,
    instructorName: null,
    sessionDate: "10/06/2026",
    startTime: "19:00",
    endTime: "21:00",
    timeRange: "19:00 - 21:00",
    room: "Phòng Zoom A (Trực tuyến)",
    status: "SCHEDULED",
  },
]

export function UpcomingSessions() {
  const sessions = FAKE_SESSIONS

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
        {sessions.length > 0 ? (
          sessions.map((session) => (
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
