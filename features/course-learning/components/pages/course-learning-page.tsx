import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  MessageSquareText,
  Target,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { CourseLearningSidebar } from "../sidebar/course-learning-sidebar"
import type { CourseCurriculum } from "../../types/curriculum"
import { SectionHeader } from "../shared/section-header"
import { InfoPanel } from "../shared/info-panel"
import { LessonContentWorkspace } from "../workspace/lesson-content-workspace"
import { PageTitleBar } from "@/components/page-title-bar"

type CourseLearningPageProps = {
  curriculum: CourseCurriculum
  classId?: string
}

const studyPlan = [
  { title: "Xem bài học đang mở", time: "25 phút", status: "Ưu tiên" },
  { title: "Làm quiz kiểm tra nhanh", time: "10 câu", status: "Cần làm" },
  {
    title: "Ghi chú câu hỏi cho gia sư",
    time: "Trước buổi học",
    status: "Tùy chọn",
  },
]

const lessonNotes = [
  "Tập trung vào ví dụ mẫu trước khi làm bài tập.",
  "Đánh dấu phần chưa hiểu để AI Tutor gợi ý thêm câu luyện.",
  "Hoàn thành bài kiểm tra ngắn để cập nhật tiến độ khóa học.",
]

export function CourseLearningPage({ curriculum, classId }: CourseLearningPageProps) {
  const lessons = curriculum.sections.flatMap(
    (section) => section.lessons || []
  )

  const publishedLessons = lessons.filter(
    (lesson) => lesson.status === "PUBLISHED"
  )
  const currentLesson = publishedLessons[0] ?? lessons[0]

  const nextLessons = lessons.filter(
    (lesson) => lesson.code !== currentLesson?.code
  )

  const completedLessonCount = 1

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
    >
      <CourseLearningSidebar curriculum={curriculum} />

      <SidebarInset className="flex flex-col h-svh overflow-y-auto min-w-0 bg-background">
        <div className="w-full space-y-6 p-6">
          <PageTitleBar
            title={curriculum.name}
            breadcrumbItems={[
              { label: "Lớp học", href: "/manage/classes" },
              { label: curriculum.category },
              { label: curriculum.level },
            ]}
            actions={
              <div className="flex items-center gap-2">
                {classId && (
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/manage/classes/${classId}`}>
                      <ArrowLeft className="size-4" />
                      Quay lại lớp
                    </Link>
                  </Button>
                )}
                <Button type="button" variant="outline" asChild>
                  <Link href="/manage/ai-assistant">
                    <BrainCircuit className="size-4" />
                    Hỏi AI Tutor
                  </Link>
                </Button>
              </div>
            }
          />

          <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <main className="grid min-w-0 gap-5">
              {currentLesson && (
                <LessonContentWorkspace
                  lesson={currentLesson}
                  objective={curriculum.objectives?.[0]?.content}
                />
              )}

              <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  icon={Clock3}
                  label="Thời lượng"
                  value={`${curriculum.durationMinutes} phút`}
                  helper="Tổng thời lượng"
                />
                <MetricCard
                  icon={BookOpenCheck}
                  label="Bài học"
                  value={`${lessons.length}`}
                  helper="Trong khóa học"
                  tone="info"
                />
                <MetricCard
                  icon={CheckCircle2}
                  label="Hoàn thành"
                  value={`${completedLessonCount}`}
                  helper="Bài đã xong"
                  tone="success"
                />
                <MetricCard
                  icon={GraduationCap}
                  label="Gia sư"
                  value={curriculum.author?.fullName || "Chưa phân công"}
                  helper="Phụ trách khóa"
                  tone="warning"
                />
              </section>
            </main>

            <aside className="grid gap-5">
              <Card>
                <CardHeader>
                  <SectionHeader
                    icon={Target}
                    title="Kế hoạch hôm nay"
                    description="Các việc nên hoàn thành trong phiên học này."
                  />
                </CardHeader>
                <CardContent className="grid gap-3">
                  {studyPlan.map((task) => (
                    <InfoPanel
                      key={task.title}
                      icon={CheckCircle2}
                      title={task.title}
                      value={`${task.time} · ${task.status}`}
                    />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <SectionHeader
                    icon={MessageSquareText}
                    title="Ghi chú học tập"
                    description="Gợi ý giúp học viên học đúng nhịp."
                  />
                </CardHeader>
                <CardContent className="grid gap-3">
                  {lessonNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded border border-border/70 bg-background p-3 text-sm leading-6 text-muted-foreground"
                    >
                      {note}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {nextLessons.length > 0 && (
                <Card>
                  <CardHeader>
                    <SectionHeader
                      icon={ChevronRight}
                      title="Bài tiếp theo"
                      description="Chuẩn bị trước nội dung sắp học."
                    />
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {nextLessons.slice(0, 3).map((lesson) => (
                      <InfoPanel
                        key={lesson.id}
                        icon={BookOpenCheck}
                        title={lesson.title}
                        value={`${lesson.type} · ${lesson.durationMinutes} phút`}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}
            </aside>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = "default",
}: {
  icon: LucideIcon
  label: string
  value: string
  helper: string
  tone?: "default" | "info" | "success" | "warning"
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className={cn("size-4", getToneIconClassName(tone))} />
          <CardTitle>{label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl">{value}</CardTitle>
        <CardDescription>{helper}</CardDescription>
      </CardContent>
    </Card>
  )
}



function getToneIconClassName(
  tone: "default" | "info" | "success" | "warning"
) {
  if (tone === "info") {
    return "text-secondary"
  }

  if (tone === "success") {
    return "text-success"
  }

  if (tone === "warning") {
    return "text-tertiary"
  }

  return "text-primary"
}
