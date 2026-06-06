"use client"

import {
  Award,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Target,
} from "lucide-react"

import { useAppForm } from "@/components/form/app-form"
import { updateUser } from "@/features/users/actions/update-user"
import {
  profileFormSchema,
  type ProfileFormInput,
} from "@/features/users/schemas/profile.schema"
import type { User } from "@/features/users/types"
import {
  ProfileContactPanel,
  type ProfileContactRow,
} from "./profile-contact-panel"
import { ProfileFocusPanel, type ProfileFocusItem } from "./profile-focus-panel"
import { ProfileFormCard } from "./profile-form-card"
import { ProfileHeroCard } from "./profile-hero-card"
import type { ProfileStatItem } from "./profile-stat-card"
import {
  ProfileTimelinePanel,
  type ProfileTimelineRow,
} from "./profile-timeline-panel"

type ProfilePageProps = {
  user: User
  editable?: boolean
}

const learningStats = [
  { label: "Giờ học tháng này", value: "42h", icon: Clock3, tone: "primary" },
  { label: "Bài đã hoàn thành", value: "18", icon: BookOpenCheck, tone: "sky" },
  {
    label: "Chuỗi học liên tục",
    value: "12 ngày",
    icon: Flame,
    tone: "orange",
  },
  { label: "Điểm tiến bộ", value: "+16%", icon: Award, tone: "green" },
] satisfies ProfileStatItem[]

const strengths = [
  { title: "Tư duy logic", helper: "Giải bài theo bước rõ ràng", value: 86 },
  { title: "Làm bài đều", helper: "Giữ nhịp luyện tập ổn định", value: 78 },
  {
    title: "Phản hồi nhanh",
    helper: "Trao đổi tốt sau mỗi buổi học",
    value: 92,
  },
] satisfies ProfileFocusItem[]

const learningGoals = [
  {
    title: "Ôn đại số tuyến tính",
    helper: "Ưu tiên phần ma trận và định thức",
    value: 68,
  },
  {
    title: "Cải thiện tốc độ giải đề",
    helper: "Mục tiêu giảm 15% thời gian làm bài",
    value: 54,
  },
  {
    title: "Hoàn thành 3 bài luyện tập/tuần",
    helper: "Theo dõi đều vào cuối tuần",
    value: 72,
  },
] satisfies ProfileFocusItem[]

const recentActivities = [
  { title: "Hoàn thành bài luyện tập Hàm số", time: "09:20 hôm nay" },
  { title: "Gia sư thêm nhận xét buổi học", time: "Tối qua" },
  { title: "Cập nhật mục tiêu học tuần", time: "2 ngày trước" },
] satisfies ProfileTimelineRow[]

const upcomingLessons = [
  { title: "Toán 12 - Đạo hàm", time: "19:30, Thứ 4" },
  { title: "Ôn đề theo năng lực", time: "20:00, Thứ 6" },
] satisfies ProfileTimelineRow[]

function getProfileFormDefaultValues(user: User): ProfileFormInput {
  return {
    fullName: user.fullName,
    phone: user.profile?.phone ?? "",
    location: user.profile?.location ?? "",
    bio: user.profile?.bio ?? "",
  }
}

function getProfileContactRows(
  email: string,
  profile: ProfileFormInput
): ProfileContactRow[] {
  return [
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
  ]
}

export function ProfilePage({ user, editable = true }: ProfilePageProps) {
  const form = useAppForm({
    defaultValues: getProfileFormDefaultValues(user),
    validators: {
      onSubmit: profileFormSchema,
    },
    onSubmit: async ({ value }) => {
      const updateUserResult = await updateUser(user.id, value)

      if (updateUserResult.success && updateUserResult.data) {
        form.reset(getProfileFormDefaultValues(updateUserResult.data))
      }
    },
  })

  return (
    <form
      className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem] [&_[data-tone=info]_svg]:text-secondary [&_[data-tone=primary]]:border-primary [&_[data-tone=primary]]:bg-primary [&_[data-tone=success]_svg]:text-success [&_[data-tone=violet]_svg]:text-primary [&_[data-tone=warning]_svg]:text-tertiary"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <form.Subscribe
        selector={(state) => ({
          values: state.values,
        })}
      >
        {({ values }) => {
          const contactRows = getProfileContactRows(user.email, values)

          return (
            <>
              <div className="grid gap-5">
                <ProfileHeroCard
                  actions={
                    <form.AppForm>
                      <form.SubscribeButton
                        icon={<Save />}
                        label="Lưu thay đổi"
                        pendingLabel="Đang lưu"
                        variant="inverse"
                      />
                    </form.AppForm>
                  }
                  stats={learningStats}
                  user={user}
                />

                <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
                  <ProfileFormCard canEdit={editable} form={form} user={user} />

                  <div className="grid items-start gap-5">
                    <ProfileFocusPanel
                      icon={Target}
                      title="Mục tiêu tuần này"
                      values={learningGoals}
                    />
                    <ProfileFocusPanel
                      icon={GraduationCap}
                      title="Điểm mạnh"
                      values={strengths}
                    />
                  </div>
                </section>
              </div>

              <aside className="grid items-start gap-5">
                <ProfileContactPanel rows={contactRows} />

                <ProfileTimelinePanel
                  icon={CalendarDays}
                  title="Lịch học sắp tới"
                  rows={upcomingLessons}
                />

                <ProfileTimelinePanel
                  icon={CheckCircle2}
                  title="Hoạt động gần đây"
                  rows={recentActivities}
                />
              </aside>
            </>
          )
        }}
      </form.Subscribe>
    </form>
  )
}
