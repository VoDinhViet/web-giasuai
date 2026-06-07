"use client"

import {
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Target,
} from "lucide-react"
import { toast } from "sonner"

import { useAppForm } from "@/components/form/app-form"
import { updateUser } from "@/features/users/actions/update-user"
import {
  profileLearningGoals,
  profileLearningStats,
  profileRecentActivities,
  profileStrengths,
  profileUpcomingLessons,
} from "@/features/users/constants/profile-detail-constants"
import {
  profileFormSchema,
  type ProfileFormInput,
} from "@/features/users/schemas/profile.schema"
import type { User } from "@/features/users/types"
import { ProfileContactPanel } from "./profile-contact-panel"
import { ProfileFocusPanel } from "./profile-focus-panel"
import { ProfileFormCard } from "./profile-form-card"
import { ProfileHeroCard } from "./profile-hero-card"
import { ProfileTimelinePanel } from "./profile-timeline-panel"

type ProfilePageProps = {
  user: User
  editable?: boolean
}

function getProfileFormDefaultValues(user: User): ProfileFormInput {
  return {
    fullName: user.fullName,
    phone: user.profile?.phone ?? "",
    location: user.profile?.location ?? "",
    bio: user.profile?.bio ?? "",
  }
}

export function ProfilePage({ user, editable = true }: ProfilePageProps) {
  const form = useAppForm({
    defaultValues: getProfileFormDefaultValues(user),
    validators: {
      onSubmit: profileFormSchema,
    },
    onSubmit: async ({ value }) => {
      const updateUserResult = await updateUser(user.id, value)

      if (!updateUserResult.success || !updateUserResult.data) {
        toast.error(updateUserResult.message)
        return
      }

      form.reset(getProfileFormDefaultValues(updateUserResult.data))
      toast.success("Đã cập nhật thông tin tài khoản.")
    },
  })

  return (
    <form
      className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_23rem] [&_[data-tone=info]_svg:not([data-icon])]:text-secondary [&_[data-tone=primary]]:border-primary [&_[data-tone=primary]]:bg-primary [&_[data-tone=success]_svg:not([data-icon])]:text-success [&_[data-tone=violet]_svg:not([data-icon])]:text-primary [&_[data-tone=warning]_svg:not([data-icon])]:text-tertiary"
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
        {({ values }) => (
          <>
            <div className="grid gap-5">
              <ProfileHeroCard stats={profileLearningStats} user={user} />

              <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
                <ProfileFormCard canEdit={editable} form={form} user={user} />

                <div className="grid items-start gap-5">
                  <ProfileFocusPanel
                    icon={Target}
                    title="Mục tiêu tuần này"
                    values={profileLearningGoals}
                  />
                  <ProfileFocusPanel
                    icon={GraduationCap}
                    title="Điểm mạnh"
                    values={profileStrengths}
                  />
                </div>
              </section>
            </div>

            <aside className="grid items-start gap-5">
              <ProfileContactPanel email={user.email} profile={values} />

              <ProfileTimelinePanel
                icon={CalendarDays}
                title="Lịch học sắp tới"
                rows={profileUpcomingLessons}
              />

              <ProfileTimelinePanel
                icon={CheckCircle2}
                title="Hoạt động gần đây"
                rows={profileRecentActivities}
              />
            </aside>
          </>
        )}
      </form.Subscribe>
    </form>
  )
}
