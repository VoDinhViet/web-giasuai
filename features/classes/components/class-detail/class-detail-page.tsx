import type { Class } from "../../types"
import { ClassDetailCourses } from "./class-detail-courses"
import { ClassDetailLearners } from "./class-detail-learners"
import { ClassInfo } from "./class-info"
import { UpcomingSessions } from "./upcoming-sessions"
import { LearnerSummary } from "./learner-summary"
import { ClassDetailStats } from "./class-detail-stats"
import { ClassDetailTitle } from "./class-detail-title"

type ClassDetailPageProps = {
  class: Class
}

export function ClassDetailPage(props: ClassDetailPageProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <ClassDetailTitle class={props.class} />

      <ClassDetailStats class={props.class} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <ClassDetailLearners
            classCode={props.class.code}
          />
          <ClassDetailCourses
            classCode={props.class.code}
          />
        </div>

        <aside className="space-y-5">
          <ClassInfo class={props.class} />
          <UpcomingSessions />
          <LearnerSummary />
        </aside>
      </section>
    </div>
  )
}
