  import Link from "next/link"
import type { Route } from "next"
import type { LucideIcon } from "lucide-react"
import {
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileQuestion,
  GraduationCap,
  MessageSquareText,
  PlayCircle,
  Sparkles,
  Target,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Course, CourseLesson } from "@/features/courses/constants/course-data"

type StudentCourseLearningPageProps = {
  course: Course
}

type LearningChapterNode = {
  code: string
  title: string
  lessons: CourseLesson[]
  startLessonNumber: number
}

const studyPlan = [
  { title: "Xem bài học đang mở", time: "25 phút", status: "Ưu tiên" },
  { title: "Làm quiz kiểm tra nhanh", time: "10 câu", status: "Cần làm" },
  { title: "Ghi chú câu hỏi cho gia sư", time: "Trước buổi học", status: "Tùy chọn" },
]

const lessonNotes = [
  "Tập trung vào ví dụ mẫu trước khi làm bài tập.",
  "Đánh dấu phần chưa hiểu để AI Tutor gợi ý thêm câu luyện.",
  "Hoàn thành bài kiểm tra ngắn để cập nhật tiến độ khóa học.",
]

export function StudentCourseLearningPage({ course }: StudentCourseLearningPageProps) {
  const publishedLessons = course.lessons.filter(
    (lesson) => lesson.status === "published"
  )
  const currentLesson = publishedLessons[0] ?? course.lessons[0]
  const nextLessons = course.lessons.filter(
    (lesson) => lesson.lessonCode !== currentLesson.lessonCode
  )
  const completedLessonCount = Math.max(1, Math.floor(course.lessons.length * course.completionRate / 100))
  const chapterNodes = createLearningTree(course)

  return (
    <div className="grid gap-5">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-end">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground shadow-none">
                  {course.courseCode}
                </Badge>
                <Badge variant="secondary" className="border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground shadow-none">
                  {course.category}
                </Badge>
                <Badge variant="secondary" className="border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground shadow-none">
                  {course.level}
                </Badge>
              </div>
              <CardTitle className="mt-4 text-2xl leading-8 font-bold text-primary-foreground lg:text-3xl lg:leading-10">
                {course.courseName}
              </CardTitle>
              <CardDescription className="mt-2 max-w-3xl text-primary-foreground/80">
                {course.description}
              </CardDescription>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button type="button" variant="inverse" asChild>
                  <Link href="#current-lesson">
                    <PlayCircle className="size-4" />
                    Học tiếp
                  </Link>
                </Button>
                <Button type="button" variant="onPrimary" asChild>
                  <Link href={"/manage/ai-assistant" as Route}>
                    <BrainCircuit className="size-4" />
                    Hỏi AI Tutor
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded border border-primary-foreground/20 bg-primary-foreground/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-primary-foreground/75">Tiến độ khóa học</p>
                  <p className="mt-1 text-3xl font-bold text-primary-foreground">{course.completionRate}%</p>
                </div>
                <span className="grid size-11 place-items-center rounded bg-primary-foreground/15 ring-1 ring-primary-foreground/20">
                  <Sparkles className="size-5" />
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded bg-primary-foreground/20">
                <div className="h-full rounded bg-primary-foreground" style={{ width: `${course.completionRate}%` }} />
              </div>
              <p className="mt-3 text-xs font-medium text-primary-foreground/75">
                {completedLessonCount}/{course.lessons.length} bài đã hoàn thành
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Clock3} label="Thời lượng" value={course.duration} helper="Tổng thời lượng" />
        <MetricCard icon={BookOpenCheck} label="Bài học" value={`${course.lessons.length}`} helper="Trong khóa học" tone="info" />
        <MetricCard icon={CheckCircle2} label="Hoàn thành" value={`${completedLessonCount}`} helper="Bài đã xong" tone="success" />
        <MetricCard icon={GraduationCap} label="Gia sư" value={course.author} helper="Phụ trách khóa" tone="warning" />
      </section>

      <section className="grid items-start gap-5 2xl:grid-cols-[20rem_minmax(0,1fr)_24rem]">
        <LearningTreeSidebar
          chapters={chapterNodes}
          currentLessonCode={currentLesson.lessonCode}
        />

        <div className="grid gap-5">
          <Card id="current-lesson" className="overflow-hidden">
            <CardHeader className="border-b border-border/70 bg-card">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <SectionHeader
                  icon={PlayCircle}
                  title="Bài đang học"
                  description="Không gian học chính cho video, tài liệu và bài kiểm tra nhanh."
                />
                <LessonStatusBadge lesson={currentLesson} />
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="grid min-h-72 place-items-center rounded border border-border/70 bg-foreground text-background">
                <div className="grid place-items-center gap-4 p-6 text-center">
                  <span className="grid size-16 place-items-center rounded-full bg-background/10 ring-1 ring-background/20">
                    <PlayCircle className="size-8" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold">{currentLesson.title}</p>
                    <p className="mt-1 text-sm text-background/70">
                      {currentLesson.type} · {currentLesson.duration}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <InfoPanel icon={Target} title="Mục tiêu" value={course.objectives[0] ?? "Hoàn thành nội dung chính của bài học."} />
                <InfoPanel icon={ClipboardList} title="Học liệu" value={`${currentLesson.resourceCount} tài nguyên kèm theo`} />
                <InfoPanel icon={FileQuestion} title="Kiểm tra" value="Quiz ngắn mở sau khi học xong nội dung chính." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionHeader
                icon={BookOpenCheck}
                title="Tổng quan khóa học"
                description="Mục tiêu và kết quả cần đạt sau khi hoàn thành khóa học."
              />
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {course.objectives.map((objective, objectiveIndex) => (
                <InfoPanel
                  key={objective}
                  icon={Target}
                  title={`Mục tiêu ${objectiveIndex + 1}`}
                  value={objective}
                />
              ))}
            </CardContent>
          </Card>
        </div>

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
                <InfoPanel key={task.title} icon={CheckCircle2} title={task.title} value={`${task.time} · ${task.status}`} />
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
                <div key={note} className="rounded border border-border/70 bg-background p-3 text-sm leading-6 text-muted-foreground">
                  {note}
                </div>
              ))}
            </CardContent>
          </Card>

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
                <InfoPanel key={lesson.lessonCode} icon={BookOpenCheck} title={lesson.title} value={`${lesson.type} · ${lesson.duration}`} />
              ))}
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}

function LearningTreeSidebar({
  chapters,
  currentLessonCode,
}: {
  chapters: LearningChapterNode[]
  currentLessonCode: string
}) {
  const lessonCount = chapters.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0
  )

  return (
    <aside className="overflow-hidden rounded border border-border/80 bg-card text-card-foreground shadow-xs 2xl:sticky 2xl:top-6 2xl:max-h-[calc(100svh-3rem)]">
      <div className="border-b border-border/70 px-4 py-4">
        <div className="flex min-w-0 items-center gap-2">
          <BookOpenCheck className="size-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-foreground">
              Cây khóa học
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {chapters.length} chương · {lessonCount} bài học
            </p>
          </div>
        </div>
      </div>

      <nav aria-label="Cây khóa học" className="grid gap-3 overflow-y-auto p-3 2xl:max-h-[calc(100svh-9rem)]">
        {chapters.map((chapter, chapterIndex) => (
          <LearningChapterTree
            key={chapter.code}
            chapter={chapter}
            chapterNumber={chapterIndex + 1}
            currentLessonCode={currentLessonCode}
          />
        ))}
      </nav>
    </aside>
  )
}

function createLearningTree(course: Course): LearningChapterNode[] {
  const chapterSize = Math.max(2, Math.ceil(course.lessons.length / 2))
  const chapterTitles = [
    "Chương 1: Nền tảng",
    "Chương 2: Luyện tập và ứng dụng",
    "Chương 3: Tổng kết",
  ]

  const chapterNodes: LearningChapterNode[] = []

  for (let lessonStartIndex = 0; lessonStartIndex < course.lessons.length; lessonStartIndex += chapterSize) {
    const chapterIndex = chapterNodes.length

    chapterNodes.push({
      code: `${course.courseCode}-CH${chapterIndex + 1}`,
      title: chapterTitles[chapterIndex] ?? `Chương ${chapterIndex + 1}`,
      lessons: course.lessons.slice(lessonStartIndex, lessonStartIndex + chapterSize),
      startLessonNumber: lessonStartIndex + 1,
    })
  }

  return chapterNodes
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
    <div className="flex min-w-0 gap-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </div>
  )
}

function InfoPanel({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon
  title: string
  value: string
}) {
  return (
    <div className="flex gap-3 rounded border border-border/70 bg-background p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function LearningChapterTree({
  chapter,
  chapterNumber,
  currentLessonCode,
}: {
  chapter: LearningChapterNode
  chapterNumber: number
  currentLessonCode: string
}) {
  return (
    <div className="rounded border border-border/70 bg-background">
      <div className="flex items-center gap-2 border-b border-border/70 bg-muted/35 px-3 py-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded bg-primary text-[11px] font-bold text-primary-foreground">
          {chapterNumber}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{chapter.title}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {chapter.code} · {chapter.lessons.length} bài học
          </p>
        </div>
      </div>

      <div className="grid gap-0 px-3 py-2.5">
        {chapter.lessons.map((lesson, lessonIndex) => (
          <LearningLessonNode
            key={lesson.lessonCode}
            lesson={lesson}
            lessonNumber={chapter.startLessonNumber + lessonIndex}
            active={lesson.lessonCode === currentLessonCode}
            last={lessonIndex === chapter.lessons.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function LearningLessonNode({
  lesson,
  lessonNumber,
  active,
  last,
}: {
  lesson: CourseLesson
  lessonNumber: number
  active: boolean
  last: boolean
}) {
  return (
    <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2">
      <div className="relative flex justify-center">
        {!last ? <span className="absolute top-6 bottom-0 w-px bg-border" /> : null}
        <span
          className={cn(
            "relative z-10 grid size-6 place-items-center rounded border bg-card text-[10px] font-bold",
            active
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground"
          )}
        >
          {lessonNumber}
        </span>
      </div>
      <div className="min-w-0">
        <div
          className={cn(
            "mb-2.5 grid gap-2 rounded border border-border/70 bg-card p-2.5",
            active && "border-primary/30 bg-primary/5"
          )}
        >
          <div className="min-w-0">
            <div className="grid gap-1.5">
              <p className="text-sm leading-5 font-semibold text-foreground">{lesson.title}</p>
              <LessonStatusBadge lesson={lesson} />
            </div>
            <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">
              {lesson.lessonCode} · {lesson.type} · {lesson.duration}
            </p>
          </div>
          <Button type="button" variant={active ? "default" : "outline"} size="sm" disabled={lesson.status === "locked"}>
            {active ? "Đang học" : lesson.status === "locked" ? "Chưa mở" : "Học bài"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function LessonStatusBadge({ lesson }: { lesson: CourseLesson }) {
  if (lesson.status === "published") {
    return <Badge variant="outline" className="border-success/25 bg-success/10 text-success">Đã mở</Badge>
  }

  if (lesson.status === "locked") {
    return <Badge variant="ghost">Chưa mở</Badge>
  }

  return <Badge variant="outline" className="border-tertiary/25 bg-tertiary/10 text-tertiary">Sắp có</Badge>
}

function getToneIconClassName(tone: "default" | "info" | "success" | "warning") {
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
