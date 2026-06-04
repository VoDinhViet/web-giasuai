"use client"

import type { LucideIcon } from "lucide-react"
import * as React from "react"
import {
  Award,
  BookOpenCheck,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  Flame,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getNameInitials } from "@/lib/string.util"
import { resolveApiAssetUrl } from "@/lib/asset-url"
import type { User } from "@/features/users/types"
import { getUserRoleLabel } from "@/features/users/utils/user-role.util"
import { updateUser } from "@/features/users/actions/update-user"
import { updateCurrentUser } from "../../actions/update-current-user"

type ProfilePageProps = {
  user: User
  editable?: boolean
  targetUserId?: string
}

const learningStats = [
  { label: "Giờ học tháng này", value: "42h", icon: Clock3, tone: "primary" },
  { label: "Bài đã hoàn thành", value: "18", icon: BookOpenCheck, tone: "sky" },
  { label: "Chuỗi học liên tục", value: "12 ngày", icon: Flame, tone: "orange" },
  { label: "Điểm tiến bộ", value: "+16%", icon: Award, tone: "green" },
] as const

const strengths = [
  { title: "Tư duy logic", helper: "Giải bài theo bước rõ ràng", value: 86 },
  { title: "Làm bài đều", helper: "Giữ nhịp luyện tập ổn định", value: 78 },
  { title: "Phản hồi nhanh", helper: "Trao đổi tốt sau mỗi buổi học", value: 92 },
]
const learningGoals = [
  { title: "Ôn đại số tuyến tính", helper: "Ưu tiên phần ma trận và định thức", value: 68 },
  { title: "Cải thiện tốc độ giải đề", helper: "Mục tiêu giảm 15% thời gian làm bài", value: 54 },
  { title: "Hoàn thành 3 bài luyện tập/tuần", helper: "Theo dõi đều vào cuối tuần", value: 72 },
]

const recentActivities = [
  { title: "Hoàn thành bài luyện tập Hàm số", time: "09:20 hôm nay" },
  { title: "Gia sư thêm nhận xét buổi học", time: "Tối qua" },
  { title: "Cập nhật mục tiêu học tuần", time: "2 ngày trước" },
]

const upcomingLessons = [
  { title: "Toán 12 - Đạo hàm", time: "19:30, Thứ 4" },
  { title: "Ôn đề theo năng lực", time: "20:00, Thứ 6" },
]

type ProfileCardTone =
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "violet"

type StatTone = "primary" | "sky" | "orange" | "green"

const statToneMap = {
  primary: "violet",
  sky: "info",
  orange: "warning",
  green: "success",
} satisfies Record<StatTone, ProfileCardTone>

type ContactTone = "info" | "success" | "violet" | "warning"

const contactToneClassNames = {
  info: "border-secondary/20 bg-secondary/10 text-secondary ring-secondary/10",
  success: "border-success/20 bg-success/10 text-success ring-success/10",
  violet: "border-primary/20 bg-primary/10 text-primary ring-primary/10",
  warning: "border-tertiary/20 bg-tertiary/10 text-tertiary ring-tertiary/10",
} satisfies Record<ContactTone, string>

const profileToneClassName =
  "[&_[data-tone=default]_svg]:text-primary [&_[data-tone=info]_svg]:text-secondary [&_[data-tone=success]_svg]:text-success [&_[data-tone=warning]_svg]:text-tertiary [&_[data-tone=danger]_svg]:text-destructive [&_[data-tone=violet]_svg]:text-primary [&_[data-tone=primary]]:border-primary [&_[data-tone=primary]]:bg-primary [&_[data-tone=primary]>[data-slot=card-header]_[data-slot=card-description]]:text-primary-foreground/80 [&_[data-tone=primary]>[data-slot=card-header]_[data-slot=card-title]]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-header]_svg]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-content]>[data-slot=card-title]]:text-primary-foreground [&_[data-tone=primary]>[data-slot=card-content]>[data-slot=card-description]]:text-primary-foreground/80"

export function ProfilePage({ user, editable = true, targetUserId }: ProfilePageProps) {
  const [isPending, startTransition] = React.useTransition()
  const [message, setMessage] = React.useState<string>()
  const [fullName, setFullName] = React.useState(user.fullName)
  const username = user.username
  const email = user.email
  const [phone, setPhone] = React.useState(user.profile?.phone ?? "")
  const [location, setLocation] = React.useState(user.profile?.location ?? "")
  const [bio, setBio] = React.useState(user.profile?.bio ?? "")
  const [avatarUrl, setAvatarUrl] = React.useState(user.profile?.avatarUrl ?? "")
  const initials = getNameInitials(fullName || email)
  const statusLabel = user.isLocked ? "Đã khóa" : "Đang hoạt động"
  const avatarSrc = resolveApiAssetUrl(avatarUrl)

  function handleSaveProfile() {
    startTransition(async () => {
      if (targetUserId) {
        try {
          const updatedUser = await updateUser(targetUserId, {
            email: user.email,
            username: user.username,
            fullName,
            password: "",
            role: user.role,
            isLocked: user.isLocked,
            phone,
            location,
            bio,
            avatarUrl,
          })

          setFullName(updatedUser.fullName)
          setPhone(updatedUser.profile?.phone ?? "")
          setLocation(updatedUser.profile?.location ?? "")
          setBio(updatedUser.profile?.bio ?? "")
          setAvatarUrl(updatedUser.profile?.avatarUrl ?? "")
          setMessage("Đã cập nhật hồ sơ.")
        } catch {
          setMessage("Không thể cập nhật hồ sơ. Vui lòng thử lại.")
        }

        return
      }

      const userResult = await updateCurrentUser({
        fullName,
        phone,
        location,
        bio,
        avatarUrl,
      })

      if (userResult.success && userResult.data) {
        setFullName(userResult.data.fullName)
        if (userResult.data.profile) {
          setPhone(userResult.data.profile.phone ?? "")
          setLocation(userResult.data.profile.location ?? "")
          setBio(userResult.data.profile.bio ?? "")
          setAvatarUrl(userResult.data.profile.avatarUrl ?? "")
        }
        setMessage("Đã cập nhật hồ sơ.")
        return
      }

      setMessage(userResult.message)
    })
  }

  return (
    <div className={`grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem] ${profileToneClassName}`}>
      <div className="grid gap-5">
        <Card tone="primary">
          <CardHeader>
            <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-5 sm:gap-6">
                <div className="relative shrink-0">
                  <Avatar className="!size-28 border-4 border-primary-foreground/25 bg-primary-foreground/10 shadow-sm sm:!size-32" size="lg">
                    {avatarSrc ? (
                      <AvatarImage src={avatarSrc} alt={fullName} />
                    ) : null}
                    <AvatarFallback className="bg-primary-foreground text-3xl font-bold text-primary sm:text-4xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {editable ? (
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="secondary"
                      className="absolute right-2 bottom-2 size-8 rounded-full border border-primary-foreground/60 p-0 shadow-sm"
                      aria-label="Đổi ảnh đại diện"
                    >
                      <Camera className="size-4" />
                    </Button>
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-7 items-center rounded bg-primary-foreground/15 px-2.5 text-xs font-semibold ring-1 ring-primary-foreground/25">
                      {getUserRoleLabel(user.role)}
                    </span>
                    <span className="inline-flex h-7 items-center rounded bg-primary-foreground px-2.5 text-xs font-semibold text-primary">
                      {statusLabel}
                    </span>
                  </div>
                  <h2 className="mt-3 truncate text-2xl font-bold tracking-normal">
                    {fullName}
                  </h2>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-primary-foreground/80">
                    @{username} - Hồ sơ học tập cá nhân, mục tiêu tuần và hoạt động gần đây.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <Button type="button" variant="onPrimary">
                  <MessageSquare className="size-4" />
                  Nhắn gia sư
                </Button>
                {editable ? (
                  <Button type="button" variant="inverse" disabled={isPending} onClick={handleSaveProfile}>
                    <Save className="size-4" />
                    {isPending ? "Đang lưu" : "Lưu thay đổi"}
                  </Button>
                ) : null}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {learningStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </CardContent>
        </Card>

        <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <Card tone="info">
            <CardHeader>
              <SectionTitle icon={Sparkles} title="Thông tin hiển thị" />
              <CardDescription>
                Dùng cho lớp học, gia sư và thông báo hệ thống.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <FieldGroup className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
                  <Input
                    id="fullName"
                    value={fullName}
                    disabled={!editable}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Nhập họ và tên"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
                  <Input
                    id="username"
                    value={username}
                    disabled
                    placeholder="Nhập tên đăng nhập"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    placeholder="name@example.com"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Số điện thoại</FieldLabel>
                  <Input
                    id="phone"
                    value={phone}
                    disabled={!editable}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="location">Khu vực</FieldLabel>
                  <Input
                    id="location"
                    value={location}
                    disabled={!editable}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Nhập khu vực"
                  />
                </Field>

                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="bio">Giới thiệu ngắn</FieldLabel>
                  <Textarea
                    id="bio"
                    value={bio}
                    disabled={!editable}
                    onChange={(event) => setBio(event.target.value)}
                    rows={4}
                    placeholder="Mục tiêu học tập hoặc ghi chú cá nhân"
                  />
                </Field>

                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="avatarUrl">Ảnh đại diện</FieldLabel>
                  <Input
                    id="avatarUrl"
                    value={avatarUrl}
                    disabled={!editable}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                    placeholder="Dán URL ảnh đại diện"
                  />
                </Field>
              </FieldGroup>
              {message ? (
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  {message}
                </p>
              ) : null}
            </CardContent>
          </Card>

          <div className="grid items-start gap-5">
            <FocusPanel
              icon={Target}
              title="Mục tiêu tuần này"
              values={learningGoals}
            />
            <FocusPanel
              icon={GraduationCap}
              title="Điểm mạnh"
              values={strengths}
            />
          </div>
        </section>
      </div>

      <aside className="grid items-start gap-5">
        <ContactPanel
          rows={[
            { icon: Mail, label: "Email", value: email, tone: "info" },
            { icon: Phone, label: "Điện thoại", value: phone, tone: "success" },
            { icon: MapPin, label: "Khu vực", value: location, tone: "violet" },
            { icon: ShieldCheck, label: "Bảo mật", value: "Email hoặc username", tone: "warning" },
          ]}
        />

        <TimelinePanel
          icon={CalendarDays}
          title="Lịch học sắp tới"
          rows={upcomingLessons}
        />

        <TimelinePanel
          icon={CheckCircle2}
          title="Hoạt động gần đây"
          rows={recentActivities}
        />
      </aside>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  icon: LucideIcon
  tone: StatTone
}) {
  const cardTone = statToneMap[tone]

  return (
    <Card size="sm" tone={cardTone}>
      <CardHeader>
        <SectionTitle icon={Icon} title={label} />
      </CardHeader>
      <CardContent>
        <CardTitle>{value}</CardTitle>
      </CardContent>
    </Card>
  )
}

function FocusPanel({
  icon: Icon,
  title,
  values,
}: {
  icon: LucideIcon
  title: string
  values: { title: string; helper: string; value: number }[]
}) {
  return (
    <Card tone="warning">
      <CardHeader>
        <SectionTitle icon={Icon} title={title} />
        <CardDescription>Theo dõi nhanh các điểm cần giữ nhịp.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="grid gap-2 rounded bg-card p-3 ring-1 ring-border/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="grid size-6 shrink-0 place-items-center rounded bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20">
                      {index + 1}
                    </span>
                    <p className="font-medium text-foreground">{value.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {value.helper}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-foreground">
                  {value.value}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded bg-muted">
                <div
                  className="h-full rounded bg-primary"
                  style={{ width: `${value.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ContactPanel({
  rows,
}: {
  rows: { icon: LucideIcon; label: string; value: string; tone: ContactTone }[]
}) {
  return (
    <Card tone="info">
      <CardHeader>
        <SectionTitle icon={Mail} title="Thông tin nhanh" />
        <CardDescription>Kênh liên hệ và trạng thái tài khoản.</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3">
          {rows.map(({ icon: Icon, label, value, tone }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-3 rounded bg-card p-3 ring-1 ring-border/70"
            >
              <span className={`grid size-9 shrink-0 place-items-center rounded border ring-2 ${contactToneClassNames[tone]}`}>
                <Icon className="size-4 !text-current" />
              </span>
              <div className="min-w-0 flex-1">
                <dt className="text-xs font-semibold uppercase text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 break-words text-sm font-medium text-foreground">
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

function TimelinePanel({
  icon: Icon,
  title,
  rows,
}: {
  icon: LucideIcon
  title: string
  rows: { title: string; time: string }[]
}) {
  return (
    <Card tone="success">
      <CardHeader>
        <SectionTitle icon={Icon} title={title} />
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          {rows.map((row, index) => (
            <div
              key={row.title}
              className="relative grid gap-1 py-3 pl-7 not-last:border-b not-last:border-border/70"
            >
              <span className="absolute top-4 left-1 grid size-4 place-items-center rounded-full bg-success/15 ring-1 ring-success/30">
                <span className="size-1.5 rounded-full bg-success" />
              </span>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{row.title}</CardTitle>
                <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  #{index + 1}
                </span>
              </div>
              <CardDescription>{row.time}</CardDescription>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SectionTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 shrink-0" />
      <CardTitle>{title}</CardTitle>
    </div>
  )
}
