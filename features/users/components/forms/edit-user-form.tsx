"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { UserRole } from "@/features/users/types"
import { updateUser } from "../../actions/update-user"
import {
  updateUserSchema,
  type UpdateUserInput,
} from "../../schemas/user.schema"
import type { User } from "../../types"
import { getUserRoleLabel } from "../../utils/user-role.util"

type EditUserFormProps = {
  user: User
  onCancel: () => void
  onSuccess: () => void
}

export function EditUserForm({
  user,
  onCancel,
  onSuccess,
}: EditUserFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const defaultValues: UpdateUserInput = {
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    password: "",
    role: user.role,
    isLocked: user.isLocked,
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: updateUserSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await updateUser(user.id, value)
        onSuccess()
      } catch {
        setSubmitError("Không thể cập nhật người dùng. Vui lòng thử lại.")
      }
    },
  })

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <FieldGroup className="grid gap-5 sm:grid-cols-2">
        <form.Field name="fullName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid} className="sm:col-span-2">
                <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập đầy đủ họ tên"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="username">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Tên đăng nhập</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="username123"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="example@giasuai.com"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Mật khẩu mới</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Bỏ trống nếu không đổi"
                  autoComplete="new-password"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="role">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Vai trò</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as UpdateUserInput["role"])
                  }
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserRole).map((role) => (
                      <SelectItem key={role} value={role}>
                        {getUserRoleLabel(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="isLocked">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Trạng thái khóa</FieldLabel>
                <Select
                  value={field.state.value ? "locked" : "active"}
                  onValueChange={(value) =>
                    field.handleChange(value === "locked")
                  }
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="locked">Đã khóa</SelectItem>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>

      {submitError ? <FieldError>{submitError}</FieldError> : null}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật người dùng"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
