import type { ComponentType } from "react"
import {
  Bot,
  CalendarCheck,
  GraduationCap,
  RouteIcon,
  TrendingUp,
} from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { LoginForm } from "@/features/auth/components/login/login-form"

export default async function LoginPage() {
  return (
    <ScrollArea className="h-screen w-full bg-background">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <TutorBrandPanel />
        <main className="flex flex-1 items-center justify-center bg-card px-4 py-12 sm:px-8 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-110">
            <LoginForm />
          </div>
        </main>
      </div>
    </ScrollArea>
  )
}

function TutorBrandPanel() {
  return (
    <aside className="relative hidden flex-1 overflow-hidden border-r border-primary bg-primary p-16 text-primary-foreground lg:flex lg:w-1/2 lg:items-center lg:justify-center">
      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-10 flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">
            <GraduationCap className="size-8" />
          </div>
          <div>
            <p className="text-3xl font-bold leading-10 tracking-tight">
              Gia Sư AI
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground/75">
              Hệ thống gia sư AI
            </p>
          </div>
        </div>

        <div className="border-l-2 border-primary-foreground/25 pl-10">
          <p className="text-xl font-medium leading-8 text-primary-foreground/80">
            Cá nhân hóa lộ trình học, theo dõi tiến độ và hỗ trợ học viên bằng AI
            theo đúng ngữ cảnh lớp học.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          <InsightCard
            icon={RouteIcon}
            label="Lộ trình AI"
            value="Theo mục tiêu từng học viên"
          />
          <InsightCard
            icon={TrendingUp}
            label="Tiến độ học tập"
            value="Cập nhật sau mỗi buổi học"
          />
          <InsightCard
            icon={Bot}
            label="AI Tutor"
            value="Trả lời theo bài học và lớp"
          />
          <InsightCard
            icon={CalendarCheck}
            label="Lịch học"
            value="Điểm danh, bài tập, nhắc lịch"
          />
        </div>

      </div>

      <div className="absolute bottom-16 left-16 flex gap-1">
        <div className="h-1 w-12 bg-primary-foreground" />
        <div className="h-1 w-4 bg-primary-foreground/30" />
        <div className="h-1 w-4 bg-primary-foreground/30" />
      </div>
    </aside>
  )
}

type InsightCardProps = {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}

function InsightCard({ icon: Icon, label, value }: InsightCardProps) {
  return (
    <div className="rounded border border-primary-foreground/15 bg-primary-foreground/10 p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded bg-primary-foreground/10 text-primary-foreground">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary-foreground">{label}</p>
          <p className="mt-1 text-xs leading-5 text-primary-foreground/70">{value}</p>
        </div>
      </div>
    </div>
  )
}
