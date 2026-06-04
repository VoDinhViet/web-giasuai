import Link from "next/link"
import Image from "next/image"
import type { Route } from "next"
import type { LucideIcon } from "lucide-react"
import {
  Bot,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  GraduationCap,
  MessageSquareText,
  PlayCircle,
  Send,
  Trophy,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { User } from "@/features/users/types"

type StudentDashboardPageProps = {
  user: User
}

const weeklyProgress = [
  { day: "T2", value: 42 },
  { day: "T3", value: 68 },
  { day: "T4", value: 56 },
  { day: "T5", value: 74 },
  { day: "T6", value: 62 },
  { day: "T7", value: 88 },
  { day: "CN", value: 35 },
]

const modules = [
  { name: "Đạo hàm cơ bản", progress: 100, status: "Hoàn thành", href: "/manage/courses/MATH-12" },
  { name: "Ứng dụng đạo hàm", progress: 72, status: "Đang học", href: "/manage/courses/MATH-12/lessons" },
  { name: "Khảo sát hàm số", progress: 48, status: "Cần luyện thêm", href: "/manage/weaknesses" },
]

const studyHistory = [
  { title: "Làm bài luyện Đạo hàm", time: "Hôm nay", score: "8.6" },
  {
    title: "Xem lại video Ứng dụng đạo hàm",
    time: "Hôm qua",
    score: "Hoàn thành",
  },
  {
    title: "AI Tutor gợi ý 5 câu luyện",
    time: "2 ngày trước",
    score: "+5 bài",
  },
]

const learningTasks = [
  { title: "Mini test 15 phút", time: "19:30 hôm nay", status: "Cần làm", action: "Làm bài", href: "/manage/placement-tests" },
  { title: "Ôn lỗi sai tuần này", time: "Thứ 6", status: "Đang mở", action: "Ôn ngay", href: "/manage/weaknesses" },
  { title: "Gửi câu hỏi cho gia sư", time: "Trước buổi học", status: "Tùy chọn", action: "Hỏi AI", href: "/manage/ai-assistant" },
]

const upcomingSessions = [
  { title: "Toán 12 - Đạo hàm", value: "19:30, Thứ 4", action: "Vào lớp", href: "/manage/classes/B2B-A01" },
  { title: "Ôn đề theo năng lực", value: "20:00, Thứ 6", action: "Xem lịch", href: "/manage/classes/B2B-A01/sessions" },
]

const weeklyAchievements = [
  { title: "Hoàn thành 6/8 mục tiêu", value: "Còn 2 việc cần xử lý" },
  { title: "Điểm mini test tăng", value: "+1.2 so với tuần trước" },
]

const studentDashboardToneClassName =
  "[&_[data-tone=default]_svg]:text-primary [&_[data-tone=info]_svg]:text-secondary [&_[data-tone=success]_svg]:text-success [&_[data-tone=warning]_svg]:text-tertiary [&_[data-tone=danger]_svg]:text-destructive [&_[data-tone=violet]_svg]:text-primary [&_[data-tone=primary]]:border-primary [&_[data-tone=primary]]:bg-primary [&_[data-tone=primary]>[data-slot=card-header]_[data-slot=card-description]]:text-primary-foreground/80 [&_[data-tone=primary]>[data-slot=card-header]_[data-slot=card-title]]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-header]_svg]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-content]>[data-slot=card-title]]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-content]>[data-slot=card-description]]:text-primary-foreground/80"

export function StudentDashboardPage({ user }: StudentDashboardPageProps) {
  return (
    <div className={`grid gap-5 ${studentDashboardToneClassName}`}>
      <Card tone="primary">
        <CardHeader>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
            <div className="min-w-0">
              <SectionTitle icon={Sparkles} title={`Chào ${user.fullName}`} />
              <CardDescription>
                Theo dõi tiến độ học, lịch ôn tập, module đã hoàn thành và gợi ý từ AI Tutor.
              </CardDescription>
              <div className="mt-4 flex shrink-0 flex-wrap gap-2">
                <Button type="button" variant="inverse" asChild>
                  <Link href={"/manage/ai-assistant" as Route}>
                    <Bot />
                    Hỏi AI Tutor
                  </Link>
                </Button>
                <Button type="button" variant="inverse" asChild>
                  <Link href={"/manage/courses/MATH-12/lessons" as Route}>
                    <PlayCircle />
                    Tiếp tục học
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="/student-learning-illustration.svg"
              alt="Học viên theo dõi tiến độ học tập"
              width={420}
              height={260}
              priority
              className="hidden w-full rounded-xl lg:block"
            />
          </div>
        </CardHeader>
      </Card>

      <section className="grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Giờ học" value="42h" helper="Tháng này" icon={Clock3} />
        <SummaryCard label="Module xong" value="18" helper="Tổng đã hoàn thành" icon={BookOpenCheck} />
        <SummaryCard label="Chuỗi học" value="12 ngày" helper="Duy trì đều" icon={Flame} />
        <SummaryCard label="Tiến bộ" value="+16%" helper="So với tuần trước" icon={TrendingUp} />
      </section>

      <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <div className="grid items-start gap-5">
          <Card tone="info">
            <CardHeader>
              <SectionHeader
                icon={TrendingUp}
                title="Biểu đồ tiến bộ tuần"
                description="Tổng hợp thời lượng học và mức hoàn thành mỗi ngày."
              />
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-3 rounded border border-border/70 bg-background p-4">
                {weeklyProgress.map((progress) => (
                  <div key={progress.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                    <div className="flex h-32 w-full items-end rounded bg-primary/10 px-1.5">
                      <div className="w-full rounded bg-primary" style={{ height: `${progress.value}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">{progress.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card tone="success">
            <CardHeader>
              <SectionHeader
                icon={GraduationCap}
                title="Module đang học"
                description="Theo dõi tiến độ từng phần trong lộ trình cá nhân."
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 lg:grid-cols-3">
                {modules.map((module) => (
                  <Card key={module.name} size="sm" tone="default">
                    <CardHeader>
                      <CardTitle>{module.name}</CardTitle>
                      <CardDescription>{module.status}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{module.progress}% hoàn thành</CardDescription>
                      <div className="h-2 overflow-hidden rounded bg-muted">
                        <div className="h-full rounded bg-primary" style={{ width: `${module.progress}%` }} />
                      </div>
                      <Button type="button" variant="outline" size="sm" asChild>
                        <Link href={module.href as Route}>Chi tiết</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card tone="success">
            <CardHeader>
              <SectionHeader
                icon={CheckCircle2}
                title="Lịch sử học tập"
                description="Hoạt động gần đây."
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 lg:grid-cols-3">
                {studyHistory.map((history) => (
                  <InfoBox key={history.title} title={history.title} value={`${history.time} · ${history.score}`} />
                ))}
              </div>
            </CardContent>
          </Card>

          <section className="grid items-start gap-5 lg:grid-cols-2">
            <Card tone="violet">
              <CardHeader>
                <SectionHeader
                  icon={MessageSquareText}
                  title="Nhận xét gia sư"
                  description="Phản hồi gần nhất sau buổi học."
                />
              </CardHeader>
              <CardContent>
                <Card size="sm" tone="default">
                  <CardHeader>
                    <CardTitle>Giữ nhịp tốt ở phần đạo hàm</CardTitle>
                    <CardDescription>
                      Cần trình bày rõ hơn bước xét dấu và kết luận cực trị.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button type="button" variant="outline" size="sm" asChild>
                      <Link href={"/manage/classes/B2B-A01" as Route}>Xem lớp</Link>
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card tone="warning">
              <CardHeader>
                <SectionHeader
                  icon={Trophy}
                  title="Thành tích tuần"
                  description="Tín hiệu học tập nổi bật."
                />
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {weeklyAchievements.map((achievement) => (
                    <InfoBox key={achievement.title} title={achievement.title} value={achievement.value} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <aside className="grid items-start gap-5">
          <Card tone="warning">
            <CardHeader>
              <SectionHeader
                icon={Target}
                title="Bài cần làm"
                description="Ưu tiên theo hạn nộp và điểm yếu gần đây."
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {learningTasks.map((task) => (
                  <ActionBox
                    key={task.title}
                    title={task.title}
                    description={`${task.time} · ${task.status}`}
                    action={task.action}
                    href={task.href}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card tone="violet">
            <CardHeader>
              <SectionHeader
                icon={Sparkles}
                title="Gợi ý AI"
                description="Ưu tiên ôn tập theo điểm yếu gần đây."
              />
            </CardHeader>
            <CardContent>
              <Card size="sm" tone="default">
                <CardContent>
                  <p className="text-sm leading-6 font-medium text-foreground">
                    Nên luyện thêm phần khảo sát hàm số và xem lại lỗi sai trong mini test gần nhất.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button type="button" size="sm" asChild>
                      <Link href={"/manage/weaknesses" as Route}>
                        <Target />
                        Luyện điểm yếu
                      </Link>
                    </Button>
                    <Button type="button" variant="outline" size="sm" asChild>
                      <Link href={"/manage/ai-assistant" as Route}>
                        <Send />
                        Hỏi thêm
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card tone="info">
            <CardHeader>
              <SectionHeader
                icon={CalendarDays}
                title="Lịch học gần nhất"
                description="Các buổi học và hạn bài sắp tới."
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {upcomingSessions.map((session) => (
                  <ActionBox
                    key={session.title}
                    title={session.title}
                    description={session.value}
                    action={session.action}
                    href={session.href}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
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
    <Card size="sm" tone="default">
      <CardHeader>
        <SectionTitle icon={Icon} title={label} />
      </CardHeader>
      <CardContent>
        <CardTitle>{value}</CardTitle>
        <CardDescription>{helper}</CardDescription>
      </CardContent>
    </Card>
  )
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon
  title: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Icon />
      <CardTitle>{title}</CardTitle>
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
    <div className="flex gap-2">
      <Icon />
      <div className="min-w-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </div>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <Card size="sm" tone="default">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{value}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function ActionBox({
  title,
  description,
  action,
  href,
}: {
  title: string
  description: string
  action: string
  href: string
}) {
  return (
    <Card size="sm" tone="default">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={href as Route}>{action}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
