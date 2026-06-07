import { Save } from "lucide-react"

import { withForm } from "@/components/form/app-form"
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
import type { ProfileFormInput } from "@/features/users/schemas/profile.schema"
import { UserRole, type User } from "@/features/users/types"

const profileFormDefaultValues: ProfileFormInput = {
  fullName: "",
  phone: "",
  location: "",
  bio: "",
}

type ProfileFormCardProps = {
  canEdit: boolean
  user: User
}

const profileFormDefaultUser: User = {
  id: "",
  email: "",
  username: "",
  fullName: "",
  role: UserRole.LEARNER,
  isLocked: false,
  createdAt: "",
  updatedAt: "",
  profile: null,
}

const profileFormDefaultProps: ProfileFormCardProps = {
  canEdit: true,
  user: profileFormDefaultUser,
}

export const ProfileFormCard = withForm({
  defaultValues: profileFormDefaultValues,
  props: profileFormDefaultProps,
  render: function RenderProfileFormCard({
    canEdit,
    form,
    user,
  }) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="grid gap-1.5">
              <CardTitle>Thông tin hiển thị</CardTitle>
              <CardDescription>
                Dùng cho lớp học, gia sư và thông báo hệ thống.
              </CardDescription>
            </div>

            {canEdit ? (
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                  >
                    <Save data-icon="inline-start" />
                    {isSubmitting ? "Đang lưu" : "Lưu thay đổi"}
                  </Button>
                )}
              </form.Subscribe>
            ) : null}
          </div>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <form.AppField name="fullName">
              {(field) => (
                <field.TextField
                  label="Họ và tên"
                  disabled={!canEdit}
                  placeholder="Nhập họ và tên"
                />
              )}
            </form.AppField>

            <Field>
              <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
              <Input
                id="username"
                value={user.username}
                disabled
                placeholder="Nhập tên đăng nhập"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                placeholder="name@example.com"
              />
            </Field>

            <form.AppField name="phone">
              {(field) => (
                <field.TextField
                  label="Số điện thoại"
                  disabled={!canEdit}
                  placeholder="Nhập số điện thoại"
                />
              )}
            </form.AppField>

            <form.AppField name="location">
              {(field) => (
                <field.TextField
                  label="Khu vực"
                  disabled={!canEdit}
                  placeholder="Nhập khu vực"
                />
              )}
            </form.AppField>

            <div className="sm:col-span-2">
              <form.AppField name="bio">
                {(field) => (
                  <field.TextareaField
                    label="Giới thiệu ngắn"
                    disabled={!canEdit}
                    rows={4}
                    placeholder="Mục tiêu học tập hoặc ghi chú cá nhân"
                  />
                )}
              </form.AppField>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    )
  },
})
