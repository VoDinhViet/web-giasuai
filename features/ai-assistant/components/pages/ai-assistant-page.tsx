"use client"

import type { LucideIcon } from "lucide-react"
import {
  Bot,
  BookOpenCheck,
  Brain,
  Clock3,
  FileText,
  GraduationCap,
  Lightbulb,
  Send,
  Sparkles,
  Target,
} from "lucide-react"
import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { User } from "@/features/users/types"

type AiAssistantPageProps = {
  user: User
}

type ChatMode = "general" | "lesson" | "class"

type Message = {
  id: string
  role: "assistant" | "user"
  content: string
  time: string
}

const promptSuggestions = [
  "Giải thích lại phần em đang yếu bằng ví dụ đơn giản",
  "Tạo 5 câu luyện tập theo mức độ tăng dần",
  "Tóm tắt bài học hôm nay thành checklist ôn tập",
  "Phân tích lỗi sai và gợi ý cách sửa",
]

const contextCards = [
  { title: "Bài học hiện tại", value: "Ứng dụng đạo hàm", icon: BookOpenCheck },
  { title: "Lớp học", value: "Toán 12 - Đạo hàm", icon: GraduationCap },
  { title: "Điểm yếu", value: "Khảo sát hàm số", icon: Target },
]

const conversationHistory = [
  { title: "Ôn lỗi sai đạo hàm", time: "Hôm nay", count: "8 tin nhắn" },
  { title: "Mini-test hàm số", time: "Hôm qua", count: "12 tin nhắn" },
  { title: "Lập kế hoạch ôn tuần", time: "2 ngày trước", count: "6 tin nhắn" },
]

const modeLabels = {
  general: "Chat tổng quát",
  lesson: "Theo bài học",
  class: "Theo lớp học",
} satisfies Record<ChatMode, string>

export function AiAssistantPage({ user }: AiAssistantPageProps) {
  const [mode, setMode] = React.useState<ChatMode>("lesson")
  const [draftMessage, setDraftMessage] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "msg-1",
      role: "assistant",
      content:
        "Mình đang dùng ngữ cảnh bài học Ứng dụng đạo hàm. Bạn muốn mình giải thích, tạo bài luyện hay phân tích lỗi sai?",
      time: "09:20",
    },
    {
      id: "msg-2",
      role: "user",
      content: "Giải thích giúp em vì sao phải xét dấu đạo hàm khi khảo sát hàm số.",
      time: "09:21",
    },
    {
      id: "msg-3",
      role: "assistant",
      content:
        "Xét dấu đạo hàm giúp biết hàm số đang tăng hay giảm trên từng khoảng. Từ đó ta xác định cực trị và phác thảo dáng đồ thị chính xác hơn.",
      time: "09:22",
    },
  ])

  function handleSendMessage() {
    const trimmedMessage = draftMessage.trim()

    if (!trimmedMessage) {
      return
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `msg-${currentMessages.length + 1}`,
        role: "user",
        content: trimmedMessage,
        time: "Bây giờ",
      },
      {
        id: `msg-${currentMessages.length + 2}`,
        role: "assistant",
        content:
          "Đã nhận câu hỏi. Ở bản review UI, phản hồi này là mock. Khi nối API, nội dung sẽ được sinh từ AI theo ngữ cảnh đã chọn.",
        time: "Bây giờ",
      },
    ])
    setDraftMessage("")
  }

  return (
    <div className="grid min-h-[calc(100svh-8rem)] items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <section className="grid min-h-[calc(100svh-8rem)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded border border-border/80 bg-card shadow-xs">
        <div className="border-b border-border/70 p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/15">
                  AI Tutor
                </span>
                <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80">
                  {modeLabels[mode]}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold text-foreground">
                Trợ lý học tập cá nhân
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Chat tổng quát hoặc hỏi theo ngữ cảnh bài học, lớp học và điểm yếu hiện tại.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {Object.entries(modeLabels).map(([modeValue, label]) => (
                <Button
                  key={modeValue}
                  type="button"
                  size="sm"
                  variant={mode === modeValue ? "default" : "outline"}
                  onClick={() => setMode(modeValue as ChatMode)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto p-5">
          <div className="mx-auto grid max-w-4xl gap-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} user={user} />
            ))}
          </div>
        </div>

        <div className="border-t border-border/70 bg-background/70 p-4">
          <div className="mx-auto grid max-w-4xl gap-3">
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.slice(0, 2).map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDraftMessage(suggestion)}
                >
                  <Lightbulb className="size-4" />
                  {suggestion}
                </Button>
              ))}
            </div>
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <Textarea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                rows={3}
                placeholder="Nhập câu hỏi cho AI Tutor"
              />
              <Button type="button" onClick={handleSendMessage}>
                <Send className="size-4" />
                Gửi
              </Button>
            </div>
          </div>
        </div>
      </section>

      <aside className="grid items-start gap-5">
        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={Sparkles}
            title="Ngữ cảnh đang dùng"
            description="AI sẽ ưu tiên dữ liệu này khi trả lời."
          />
          <div className="mt-4 grid gap-3">
            {contextCards.map((contextCard) => (
              <InfoBox
                key={contextCard.title}
                icon={contextCard.icon}
                title={contextCard.title}
                value={contextCard.value}
              />
            ))}
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={Brain}
            title="Prompt gợi ý"
            description="Bấm để đưa nhanh vào ô chat."
          />
          <div className="mt-4 grid gap-2">
            {promptSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                className="h-auto justify-start whitespace-normal px-3 py-2 text-left text-xs leading-5"
                onClick={() => setDraftMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={Clock3}
            title="Lịch sử hội thoại"
            description="Các phiên chat gần đây."
          />
          <div className="mt-4 grid gap-3">
            {conversationHistory.map((history) => (
              <div key={history.title} className="rounded border border-border/70 bg-background px-3 py-3">
                <p className="text-sm font-semibold text-foreground">{history.title}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {history.time} · {history.count}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
          <SectionHeader
            icon={FileText}
            title="Quota AI"
            description="Theo dõi lượt dùng trong ngày."
          />
          <div className="mt-4 rounded border border-border/70 bg-background p-4">
            <div className="flex items-end justify-between gap-3">
              <span className="text-2xl font-bold text-foreground">18/50</span>
              <span className="text-xs font-semibold text-muted-foreground">lượt hôm nay</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded bg-muted">
              <div className="h-full rounded bg-primary" style={{ width: "36%" }} />
            </div>
          </div>
        </section>
      </aside>
    </div>
  )
}

function ChatBubble({ message, user }: { message: Message; user: User }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? (
        <Avatar className="size-9 shrink-0 bg-primary/10">
          <AvatarFallback className="text-primary">
            <Bot className="size-4" />
          </AvatarFallback>
        </Avatar>
      ) : null}

      <div className={`max-w-[min(42rem,78%)] rounded border px-4 py-3 ${isUser ? "border-primary/30 bg-primary text-primary-foreground" : "border-border/70 bg-background text-foreground"}`}>
        <p className="text-sm leading-6">{message.content}</p>
        <p className={`mt-2 text-xs font-medium ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {message.time}
        </p>
      </div>

      {isUser ? (
        <Avatar className="size-9 shrink-0 bg-primary/10">
          <AvatarFallback className="text-primary">
            {user.fullName.slice(0, 1).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      ) : null}
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

function InfoBox({
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
      <span className="flex size-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
