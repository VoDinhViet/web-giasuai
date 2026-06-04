"use client"

import { useState, type ReactNode } from "react"
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
import { createUser } from "../../actions/create-user"
import {
  createUserSchema,
  type CreateUserInput,
} from "../../schemas/user.schema"
import { getUserRoleLabel } from "../../utils/user-role.util"

type CreateUserFormProps = {
  onCancel: () => void
  onSuccess: () => void
}

const createUserDefaultValues: CreateUserInput = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  role: UserRole.STUDENT,
}

export function CreateUserForm({
  onCancel,
  onSuccess,
}: CreateUserFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: createUserDefaultValues,
    validators: {
      onSubmit: createUserSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await createUser(value)
        onSuccess()
      } catch {
        setSubmitError("Không thể tạo người dùng. Vui lòng thử lại.")
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
                <RequiredFieldLabel htmlFor={field.name}>
                  Họ và tên
                </RequiredFieldLabel>
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
                <RequiredFieldLabel htmlFor={field.name}>
                  Tên đăng nhập
                </RequiredFieldLabel>
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
                <RequiredFieldLabel htmlFor={field.name}>
                  Email
                </RequiredFieldLabel>
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
                <RequiredFieldLabel htmlFor={field.name}>
                  Mật khẩu
                </RequiredFieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Tối thiểu 8 ký tự"
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
                <RequiredFieldLabel>Vai trò</RequiredFieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as CreateUserInput["role"])
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
              {isSubmitting ? "Đang lưu..." : "Lưu người dùng"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}

type RequiredFieldLabelProps = {
  children: ReactNode
  htmlFor?: string
}

function RequiredFieldLabel({ children, htmlFor }: RequiredFieldLabelProps) {
  return (
    <FieldLabel htmlFor={htmlFor}>
      {children}
      <span className="text-destructive">*</span>
    </FieldLabel>
  )
}
