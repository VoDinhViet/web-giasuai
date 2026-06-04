import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  Bot,
  Brain,
  CircleDollarSign,
  Clock3,
  Database,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

const featureUsage = [
  { name: "AI Tutor", requests: "8,420", cost: "$126.4", percent: 68 },
  { name: "Sinh lộ trình", requests: "1,240", cost: "$42.8", percent: 34 },
  { name: "Tracking điểm yếu", requests: "2,860", cost: "$38.5", percent: 45 },
  { name: "Placement Test", requests: "920", cost: "$18.2", percent: 24 },
]

const conversationLogs = [
  { title: "Ôn lỗi sai đạo hàm", user: "Lê Minh Khang", tokens: "2,840", cost: "$0.42", time: "Hôm nay" },
  { title: "Sinh lộ trình lớp B2B Sales A01", user: "Nguyễn Minh Anh", tokens: "5,120", cost: "$0.86", time: "Hôm qua" },
  { title: "Phân tích điểm yếu khảo sát hàm số", user: "Trần Hoàng Phúc", tokens: "3,420", cost: "$0.51", time: "02/06/2026" },
]

const quotaGroups = [
  { title: "Học viên", used: 12400, limit: 20000 },
  { title: "Giáo viên", used: 8200, limit: 12000 },
  { title: "Admin", used: 2100, limit: 5000 },
]

export function AiUsagePage() {
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="overflow-hidden rounded border border-border/80 bg-card shadow-xs">
          <div className="bg-primary px-5 py-6 text-primary-foreground sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <span className="inline-flex h-7 items-center rounded bg-primary-foreground/15 px-2.5 text-xs font-semibold ring-1 ring-primary-foreground/25">
                  AI Usage
                </span>
                <h1 className="mt-3 text-2xl font-bold">
                  Quản lý chi phí và quota AI
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-primary-foreground/80">
                  Theo dõi request, token, chi phí API và lịch sử hội thoại AI toàn hệ thống.
                </p>
              </div>
              <div className="rounded border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-3">
                <p className="text-xs font-semibold text-primary-foreground/70">Chi phí tháng này</p>
                <p className="mt-1 text-2xl font-bold">$227.40</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Requests" value="13.4K" helper="Tháng này" icon={Zap} />
            <SummaryCard label="Tokens" value="4.8M" helper="Input + output" icon={Database} />
            <SummaryCard label="Chi phí" value="$227" helper="Tạm tính" icon={CircleDollarSign} />
            <SummaryCard label="Quota" value="74%" helper="Đã dùng" icon={ShieldCheck} />
          </div>
        </section>

        <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={BarChart3}
              title="Phân bổ theo tính năng"
              description="Theo dõi request và chi phí AI của từng module."
            />
            <div className="mt-5 grid gap-3">
              {featureUsage.map((feature) => (
                <div key={feature.name} className="rounded border border-border/70 bg-background p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{feature.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.requests} requests · {feature.cost}
                      </p>
                    </div>
                    <span className="w-fit rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                      {feature.percent}% quota
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded bg-muted">
                    <div className="h-full rounded bg-primary" style={{ width: `${feature.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={Users}
              title="Quota theo nhóm"
              description="Giới hạn lượt dùng theo vai trò."
            />
            <div className="mt-5 grid gap-3">
              {quotaGroups.map((group) => {
                const percent = Math.round((group.used / group.limit) * 100)

                return (
                  <div key={group.title} className="rounded border border-border/70 bg-background p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{group.title}</p>
                        <p className="mt-1 text-xs font-medium text-muted-foreground">
                          {group.used.toLocaleString("vi-VN")}/{group.limit.toLocaleString("vi-VN")} lượt
                        </p>
                      </div>
                      <span className="text-sm font-bold text-foreground">{percent}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded bg-muted">
                      <div className="h-full rounded bg-primary" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={MessageSquare}
            title="Lịch sử hội thoại AI"
            description="Các phiên dùng AI gần đây và chi phí tạm tính."
          />
          <div className="mt-5 grid gap-3">
            {conversationLogs.map((log) => (
              <div key={`${log.title}-${log.time}`} className="rounded border border-border/70 bg-background p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{log.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {log.user} · {log.time}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                      {log.tokens} tokens
                    </span>
                    <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                      {log.cost}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="grid items-start gap-5">
        <SidePanel
          icon={TrendingUp}
          title="Xu hướng"
          rows={[
            ["Request", "+18% so với tuần trước"],
            ["Chi phí", "+$32.8 trong 7 ngày"],
            ["Tính năng tăng mạnh", "AI Tutor"],
          ]}
        />
        <SidePanel
          icon={Brain}
          title="Model usage"
          rows={[
            ["Chat nhanh", "68% request"],
            ["Reasoning", "22% request"],
            ["Sinh lộ trình", "10% request"],
          ]}
        />
        <SidePanel
          icon={Clock3}
          title="Cảnh báo quota"
          rows={[
            ["Học viên", "Còn 6,000 lượt"],
            ["Giáo viên", "Còn 3,800 lượt"],
            ["Reset", "01/07/2026"],
          ]}
        />
        <SidePanel
          icon={Bot}
          title="Gợi ý tối ưu"
          rows={[
            ["Cache prompt", "Áp dụng cho gợi ý lộ trình"],
            ["Giới hạn context", "Giảm token cho chat lesson"],
            ["Quota mềm", "Cảnh báo khi đạt 80%"],
          ]}
        />
      </aside>
    </div>
  )
}

function SummaryCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <div className="rounded border border-border/80 bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{helper}</p>
    </div>
  )
}

function SectionHeader({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function SidePanel({ icon: Icon, title, rows }: { icon: LucideIcon; title: string; rows: [string, string][] }) {
  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <SectionHeader icon={Icon} title={title} description="Theo dõi vận hành AI." />
      <div className="mt-4 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded border border-border/70 bg-background px-3 py-3">
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="mt-1 text-xs leading-5 font-medium text-muted-foreground">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
