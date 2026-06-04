import { CheckCircle2, Lock, Sparkles, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Pagination } from "@/types/api"
import type { UserStats } from "../../actions/get-user-stats"
import type { User } from "../../types"
import { UsersTable } from "../tables/users-table"

type UsersPageProps = {
  users: User[]
  pagination: Pagination
  stats: UserStats
}

export function UsersPage({ users, pagination, stats }: UsersPageProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Quản lý tài khoản học viên, giáo viên và admin. Theo dõi trạng thái khóa,
        vai trò truy cập và hoạt động gần đây để vận hành hệ thống đào tạo.
      </p>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Tổng người dùng" value={stats.total.toLocaleString("vi-VN")} helper="Toàn hệ thống" icon={Users} tone="info" />
        <StatsCard label="Mới hôm nay" value={stats.new.toLocaleString("vi-VN")} helper="Tài khoản mới" icon={Sparkles} tone="primary" />
        <StatsCard label="Đang hoạt động" value={stats.active.toLocaleString("vi-VN")} helper="Có phiên 24h qua" icon={CheckCircle2} tone="success" />
        <StatsCard label="Đã khóa" value={stats.locked.toLocaleString("vi-VN")} helper="Cần xử lý" icon={Lock} tone="danger" />
      </section>

      <UsersTable users={users} pagination={pagination} />
    </div>
  )
}

function StatsCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: "primary" | "info" | "success" | "danger"
}) {
  const iconClassName = {
    primary: "border-primary/20 bg-primary/10 text-primary ring-primary/10",
    info: "border-secondary/20 bg-secondary-container text-on-secondary-container ring-secondary/10",
    success: "border-success/20 bg-success-container text-success ring-success/10",
    danger: "border-destructive/20 bg-error-container text-destructive ring-destructive/10",
  }[tone]

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] leading-4 font-semibold tracking-[0.06em] text-muted-foreground uppercase">
              {label}
            </p>
            <CardTitle className="mt-2 text-xl leading-7">
              {value}
            </CardTitle>
            <CardDescription className="mt-3 text-xs leading-4">
              {helper}
            </CardDescription>
          </div>
          <span className={cn("flex size-8 shrink-0 items-center justify-center rounded border ring-2", iconClassName)}>
            <Icon className="size-4 !text-current" />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
