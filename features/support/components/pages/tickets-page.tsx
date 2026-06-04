"use client"

import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LifeBuoy,
  Mail,
  MessageSquare,
  Plus,
  Send,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type TicketStatus = "open" | "pending" | "resolved"
type TicketPriority = "high" | "medium" | "low"

type SupportTicket = {
  ticketId: string
  title: string
  requester: string
  role: string
  priority: TicketPriority
  status: TicketStatus
  channel: string
  createdAt: string
  lastMessage: string
}

const initialTickets: SupportTicket[] = [
  {
    ticketId: "TIC-001",
    title: "Không thấy lớp sau khi được duyệt",
    requester: "Nguyễn Bảo An",
    role: "Học viên",
    priority: "high",
    status: "open",
    channel: "Dashboard học viên",
    createdAt: "Hôm nay, 09:20",
    lastMessage: "Em đã được duyệt nhưng lớp chưa hiện trong dashboard.",
  },
  {
    ticketId: "TIC-002",
    title: "AI Tutor trả lời sai ngữ cảnh bài học",
    requester: "Trần Quốc Huy",
    role: "Giáo viên",
    priority: "medium",
    status: "pending",
    channel: "AI Tutor",
    createdAt: "Hôm qua, 18:40",
    lastMessage: "Cần kiểm tra context lesson khi gửi chat.",
  },
  {
    ticketId: "TIC-003",
    title: "Xin tăng quota AI cho lớp ôn thi",
    requester: "Nguyễn Minh Anh",
    role: "Giáo viên",
    priority: "medium",
    status: "open",
    channel: "AI quota",
    createdAt: "02/06/2026",
    lastMessage: "Lớp cần thêm lượt luyện AI trong tuần cao điểm.",
  },
  {
    ticketId: "TIC-004",
    title: "Không nhận được email mời lớp",
    requester: "Lê Minh Châu",
    role: "Học viên",
    priority: "low",
    status: "resolved",
    channel: "Email",
    createdAt: "01/06/2026",
    lastMessage: "Đã gửi lại lời mời và xác nhận học viên truy cập được.",
  },
]

export function TicketsPage() {
  const [tickets, setTickets] = React.useState(initialTickets)
  const [selectedTicketId, setSelectedTicketId] = React.useState("TIC-001")
  const selectedTicket = tickets.find((ticket) => ticket.ticketId === selectedTicketId) ?? tickets[0]
  const openCount = tickets.filter((ticket) => ticket.status === "open").length
  const pendingCount = tickets.filter((ticket) => ticket.status === "pending").length
  const resolvedCount = tickets.filter((ticket) => ticket.status === "resolved").length

  function updateTicketStatus(ticketId: string, status: TicketStatus) {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.ticketId === ticketId ? { ...ticket, status } : ticket
      )
    )
  }

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                Support Center
              </span>
              <h1 className="mt-3 text-2xl font-bold text-foreground">
                Quản lý ticket hỗ trợ
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Theo dõi yêu cầu hỗ trợ từ học viên, giáo viên và các vấn đề liên quan AI trong hệ thống.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button type="button" variant="outline">
                <Mail className="size-4" />
                Gửi thông báo
              </Button>
              <Button type="button">
                <Plus className="size-4" />
                Tạo ticket
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Đang mở" value={openCount.toString()} helper="Cần xử lý" icon={Ticket} />
          <SummaryCard label="Đang chờ" value={pendingCount.toString()} helper="Chờ phản hồi" icon={Clock3} />
          <SummaryCard label="Đã xong" value={resolvedCount.toString()} helper="Trong tuần" icon={CheckCircle2} />
          <SummaryCard label="SLA" value="92%" helper="Đúng hạn" icon={ShieldCheck} />
        </section>

        <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={LifeBuoy}
              title="Danh sách ticket"
              description="Bấm một ticket để xem chi tiết và phản hồi."
            />
            <div className="mt-5 grid gap-3">
              {tickets.map((ticket) => (
                <button
                  key={ticket.ticketId}
                  type="button"
                  className={`rounded border p-4 text-left transition-colors ${selectedTicketId === ticket.ticketId ? "border-primary/40 bg-primary/5" : "border-border/70 bg-background hover:border-primary/30"}`}
                  onClick={() => setSelectedTicketId(ticket.ticketId)}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <StatusBadge status={ticket.status} />
                        <PriorityBadge priority={ticket.priority} />
                        <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                          {ticket.ticketId}
                        </span>
                      </div>
                      <h2 className="mt-3 text-base font-semibold text-foreground">
                        {ticket.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {ticket.requester} · {ticket.role} · {ticket.channel}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-foreground">
                        {ticket.lastMessage}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {ticket.createdAt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <SectionHeader
              icon={MessageSquare}
              title="Xử lý ticket"
              description="Phản hồi và đổi trạng thái yêu cầu."
            />
            <div className="mt-4 rounded border border-border/70 bg-background p-4">
              <p className="text-sm font-semibold text-foreground">{selectedTicket.title}</p>
              <p className="mt-2 text-xs leading-5 font-medium text-muted-foreground">
                {selectedTicket.requester} · {selectedTicket.createdAt}
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">
                {selectedTicket.lastMessage}
              </p>
            </div>
            <Textarea
              className="mt-4 min-h-32"
              defaultValue="Chào bạn, đội hỗ trợ đã ghi nhận yêu cầu. Mình sẽ kiểm tra dữ liệu liên quan và phản hồi kết quả trong thời gian sớm nhất."
            />
            <div className="mt-4 grid gap-2">
              <Button type="button">
                <Send className="size-4" />
                Gửi phản hồi
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => updateTicketStatus(selectedTicket.ticketId, "pending")}
              >
                Chuyển chờ phản hồi
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => updateTicketStatus(selectedTicket.ticketId, "resolved")}
              >
                Đánh dấu đã xử lý
              </Button>
            </div>
          </section>
        </section>
      </div>

      <aside className="grid items-start gap-5">
        <SidePanel
          icon={AlertTriangle}
          title="Cảnh báo ưu tiên"
          rows={[
            ["AI Tutor", "1 ticket cần kiểm tra ngữ cảnh"],
            ["Lớp học", "1 học viên chưa thấy lớp sau duyệt"],
            ["Email", "Không có lỗi gửi hàng loạt"],
          ]}
        />
        <SidePanel
          icon={Users}
          title="Nhóm phụ trách"
          rows={[
            ["Vận hành lớp", "2 ticket"],
            ["AI platform", "2 ticket"],
            ["Email hệ thống", "1 ticket"],
          ]}
        />
        <SidePanel
          icon={Clock3}
          title="SLA hôm nay"
          rows={[
            ["Phản hồi đầu", "Dưới 30 phút"],
            ["Xử lý trung bình", "2 giờ 10 phút"],
            ["Quá hạn", "0 ticket"],
          ]}
        />
      </aside>
    </div>
  )
}

function SummaryCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <div className="rounded border border-border/80 bg-card p-4 shadow-xs">
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

function StatusBadge({ status }: { status: TicketStatus }) {
  const statusMap = {
    open: { label: "Đang mở", className: "bg-destructive/10 text-destructive ring-destructive/20" },
    pending: { label: "Đang chờ", className: "bg-tertiary-container text-on-tertiary-container ring-tertiary/20" },
    resolved: { label: "Đã xử lý", className: "bg-success-container text-success ring-success/20" },
  } satisfies Record<TicketStatus, { label: string; className: string }>

  return <span className={`rounded px-2.5 py-1 text-xs font-semibold ring-1 ${statusMap[status].className}`}>{statusMap[status].label}</span>
}

function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const priorityMap = {
    high: { label: "Cao", className: "bg-destructive/10 text-destructive ring-destructive/20" },
    medium: { label: "Vừa", className: "bg-tertiary-container text-on-tertiary-container ring-tertiary/20" },
    low: { label: "Thấp", className: "bg-success-container text-success ring-success/20" },
  } satisfies Record<TicketPriority, { label: string; className: string }>

  return <span className={`rounded px-2.5 py-1 text-xs font-semibold ring-1 ${priorityMap[priority].className}`}>{priorityMap[priority].label}</span>
}

function SidePanel({ icon: Icon, title, rows }: { icon: LucideIcon; title: string; rows: [string, string][] }) {
  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <SectionHeader icon={Icon} title={title} description="Tổng quan vận hành." />
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
