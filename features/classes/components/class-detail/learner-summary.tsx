import { GraduationCap } from "lucide-react"

export function LearnerSummary() {
  const studentCount = 32
  const maxStudents = 36

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
        Hiện có <span className="font-semibold text-foreground">{studentCount}</span>/{maxStudents} học viên trong lớp.
      </p>
    </section>
  )
}
