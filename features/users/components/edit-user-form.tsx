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
import { Input } from "@/components/ui/input"
import type { Role } from "@/types/user"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUser } from "../actions/update-user"
import { useRoles } from "../hooks/use-roles"
import {
  getGenderLabel,
  normalizeUserGender,
  normalizeUserStatus,
} from "../lib/user-input.util"
import { formatDateInputValue } from "../lib/user-date.util"
import { updateUserSchema, type UpdateUserInput } from "../schemas/user.schema"
import { UserGender, UserStatus, type User } from "../types"
import { DateOfBirthPicker } from "./date-of-birth-picker"
import { RoleSelectField } from "./role-select-field"

type EditUserFormProps = {
  user: User
  initialRoles: Role[]
  onCancel: () => void
  onSuccess: () => void
}

const userGenderOptions = [
  UserGender.MALE,
  UserGender.FEMALE,
  UserGender.OTHER,
] as const

export function EditUserForm({
  user,
  initialRoles,
  onCancel,
  onSuccess,
}: EditUserFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { data: roles = [], isLoading: isLoadingRoles } = useRoles(initialRoles)

  const form = useForm({
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber ?? "",
      dateOfBirth: formatDateInputValue(user.birthDate),
      gender: normalizeUserGender(user.gender),
      roleId: user.roleId || user.role?.id || "",
      status: normalizeUserStatus(user.status),
    } satisfies UpdateUserInput,
    validators: {
      onSubmit: updateUserSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await updateUser(user.id, value)
        onSuccess()
      } catch {
        setSubmitError("Không thể cập nhật nhân sự. Vui lòng thử lại.")
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

        <form.Field name="phoneNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Số điện thoại</FieldLabel>
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
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as UpdateUserInput["gender"])
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

        <form.Field name="roleId">
          {(field) => (
            <RoleSelectField
              field={field}
              roles={roles}
              disabled={isLoadingRoles}
            />
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Trạng thái</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as UpdateUserInput["status"])
                  }
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserStatus.ACTIVE}>Hoạt động</SelectItem>
                    <SelectItem value={UserStatus.INACTIVE}>
                      Ngừng hoạt động
                    </SelectItem>
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
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật nhân sự"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
