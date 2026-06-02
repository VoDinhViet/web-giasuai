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
import type { Role } from "@/types/user"
import { createUser } from "../actions/create-user"
import { userStatusOptions } from "../constants/user-table-constants"
import { useRoles } from "../hooks/use-roles"
import { createUserSchema, type CreateUserInput } from "../schemas/user.schema"
import { UserGender, UserStatus } from "../types"
import { getGenderLabel } from "../utils/user-gender.util"
import { DateOfBirthPicker } from "./date-of-birth-picker"
import { RoleSelectField } from "./role-select-field"

type CreateUserFormProps = {
  initialRoles: Role[]
  onCancel: () => void
  onSuccess: () => void
}

const createUserDefaultValues: CreateUserInput = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  roleId: "",
  status: UserStatus.ACTIVE,
}

const userGenderOptions = [
  UserGender.MALE,
  UserGender.FEMALE,
  UserGender.OTHER,
] as const

export function CreateUserForm({
  initialRoles,
  onCancel,
  onSuccess,
}: CreateUserFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { data: roles = [], isLoading: isLoadingRoles } = useRoles(initialRoles)

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
        setSubmitError("Không thể tạo nhân sự. Vui lòng thử lại.")
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

        <form.Field name="phoneNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel htmlFor={field.name}>
                  Số điện thoại
                </RequiredFieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="0xxx xxx xxx"
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
                  placeholder="example@tienhuy.com"
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

        <form.Field name="roleId">
          {(field) => (
            <RoleSelectField
              field={field}
              roles={roles}
              disabled={isLoadingRoles}
              required
            />
          )}
        </form.Field>

        <form.Field name="dateOfBirth">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Ngày sinh</FieldLabel>
                <DateOfBirthPicker
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  isInvalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="gender">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Giới tính</FieldLabel>
                <Select
                  value={field.state.value ?? ""}
                  onValueChange={(value) =>
                    field.handleChange(value as CreateUserInput["gender"])
                  }
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    {userGenderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {getGenderLabel(gender)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="status">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel>Trạng thái</RequiredFieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as CreateUserInput["status"])
                  }
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {userStatusOptions.map((statusOption) => (
                      <SelectItem
                        key={statusOption.value}
                        value={statusOption.value}
                      >
                        {statusOption.label}
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
              {isSubmitting ? "Đang lưu..." : "Lưu nhân sự"}
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
