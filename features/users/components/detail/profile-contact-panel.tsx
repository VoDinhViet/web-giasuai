import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ProfileFormInput } from "@/features/users/schemas/profile.schema"
import { cn } from "@/lib/utils"

type ContactTone = "info" | "success" | "violet" | "warning"

const contactToneClassNames = {
  info: "bg-secondary/10",
  success: "bg-success/10",
  violet: "bg-primary/10",
  warning: "bg-tertiary/10",
} satisfies Record<ContactTone, string>

const contactIconClassNames = {
  info: "text-secondary",
  success: "text-success",
  violet: "text-primary",
  warning: "text-tertiary",
} satisfies Record<ContactTone, string>

type ProfileContactPanelProps = {
  email: string
  profile: ProfileFormInput
}

type ProfileContactItem = {
  icon: typeof Mail
  label: string
  tone: ContactTone
  value: string
}

export function ProfileContactPanel({
  email,
  profile,
}: ProfileContactPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin nhanh</CardTitle>
        <CardDescription>Kênh liên hệ và trạng thái tài khoản.</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3">
          {([
            { icon: Mail, label: "Email", value: email, tone: "info" },
            {
              icon: Phone,
              label: "Điện thoại",
              value: profile.phone ?? "",
              tone: "success",
            },
            {
              icon: MapPin,
              label: "Khu vực",
              value: profile.location ?? "",
              tone: "violet",
            },
            {
              icon: ShieldCheck,
              label: "Bảo mật",
              value: "Email hoặc username",
              tone: "warning",
            },
          ] satisfies ProfileContactItem[]).map(({ icon: Icon, label, value, tone }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-3 rounded bg-card p-3 ring-1 ring-border/70"
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded",
                  contactToneClassNames[tone]
                )}
              >
                <Icon className={cn("size-4", contactIconClassNames[tone])} />
              </span>
              <div className="min-w-0 flex-1">
                <dt className="text-xs font-semibold text-muted-foreground uppercase">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-medium wrap-break-word text-foreground">
                  {value || "Chưa cập nhật"}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
