import { Calendar, Clock, GraduationCap, User, Monitor, ExternalLink, LockKeyhole, FileText } from "lucide-react"
import { DateTime } from "luxon"

import type { Class } from "../../types"

const FORMAT_LABELS: Record<Class["format"], string> = {
  ONLINE: "Trực tuyến (Online)",
  OFFLINE: "Trực tiếp (Offline)",
  HYBRID: "Kết hợp (Hybrid)",
}

const JOIN_POLICY_LABELS: Record<Class["joinPolicy"], string> = {
  INVITE_ONLY: "Chỉ mời vào lớp",
  REQUEST_APPROVAL: "Duyệt yêu cầu tham gia",
  OPEN: "Mở tự do",
}

type ClassInfoProps = {
  class: Class
}

export function ClassInfo(props: ClassInfoProps) {
  return (
    <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
      <div className="flex items-start gap-3 border-b border-border/70 pb-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <GraduationCap className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">
            Thông tin lớp
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Cấu hình vận hành lớp học.
          </p>
        </div>
      </div>
      
      <div className="mt-4 space-y-4">
        <InfoItem
          icon={User}
          label="Giảng viên"
          value={props.class.instructor.fullName}
        />
        <InfoItem
          icon={Calendar}
          label="Lịch học"
          value={props.class.schedule ?? "Chưa lên lịch"}
        />
        <InfoItem
          icon={Clock}
          label="Thời gian"
          value={getDateRange(
            props.class.startDate,
            props.class.endDate
          )}
        />
        <InfoItem
          icon={Monitor}
          label="Hình thức học"
          value={FORMAT_LABELS[props.class.format]}
        />
        {props.class.meetingUrl && (props.class.format === "ONLINE" || props.class.format === "HYBRID") && (
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground/80">
              <ExternalLink className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Link học trực tuyến</p>
              <a
                href={props.class.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 block text-sm font-semibold leading-5 text-primary hover:underline truncate"
              >
                {props.class.meetingUrl}
              </a>
            </div>
          </div>
        )}
        <InfoItem
          icon={LockKeyhole}
          label="Cách ghi danh"
          value={JOIN_POLICY_LABELS[props.class.joinPolicy]}
        />
        {props.class.note && (
          <InfoItem
            icon={FileText}
            label="Ghi chú"
            value={props.class.note}
          />
        )}
      </div>
    </section>
  )
}

type InfoItemProps = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground/80">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-semibold leading-5 text-foreground">
          {value}
        </p>
      </div>
    </div>
  )
}

function getDateRange(
  startDate: string | null,
  endDate: string | null
): string {
  const start = startDate ? DateTime.fromISO(startDate).toFormat("dd/MM/yyyy") : null
  const end = endDate ? DateTime.fromISO(endDate).toFormat("dd/MM/yyyy") : null

  if (!start && !end) {
    return "Chưa lên lịch"
  }

  if (!end) {
    return start ?? "Chưa lên lịch"
  }

  return `${start ?? "Chưa rõ"} - ${end}`
}
