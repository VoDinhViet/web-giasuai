"use client"

import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  createUserSchema,
  type CreateUserInput,
} from "../schemas/user.schema"
import { createUser } from "../actions/create-user"

const positionOptions = [
  "Quản lý sản xuất",
  "Tổ trưởng gia công",
  "Nhân viên kho",
  "Kỹ thuật viên",
  "Kế toán sản xuất",
  "Giám sát chất lượng",
  "Nhân viên hành chính",
]

type CreateUserFormProps = {
  onCancel: () => void
  onSuccess: () => void
}

const createUserDefaultValues: CreateUserInput = {
  fullName: "",
  email: "",
  phoneNumber: "",
  position: "",
  status: "active",
}

export function CreateUserForm({ onCancel, onSuccess }: CreateUserFormProps) {
  const form = useForm({
    defaultValues: createUserDefaultValues,
    validators: {
      onSubmit: createUserSchema,
    },
    onSubmit: async ({ value }) => {
      await createUser(value)
      onSuccess()
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <FieldGroup className="grid gap-6 px-6 py-8 sm:grid-cols-2">
        <form.Field name="fullName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid} className="sm:col-span-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-bold uppercase text-muted-foreground"
                >
                  Họ và tên
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập đầy đủ họ tên..."
                  className="h-11"
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
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-bold uppercase text-muted-foreground"
                >
                  Số điện thoại
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="0xxx xxx xxx"
                  className="h-11"
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
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-bold uppercase text-muted-foreground"
                >
                  Email
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="example@erppro.com"
                  className="h-11"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="position">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className="text-xs font-bold uppercase text-muted-foreground">
                  Chức vụ
                </FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="h-11 w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn chức vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map((positionOption) => (
                      <SelectItem key={positionOption} value={positionOption}>
                        {positionOption}
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
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className="text-xs font-bold uppercase text-muted-foreground">
                  Trạng thái
                </FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as CreateUserInput["status"])
                  }
                >
                  <SelectTrigger className="h-11 w-full" aria-invalid={isInvalid}>
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

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex justify-end gap-4 border-t border-border bg-muted/20 px-6 py-5">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="font-bold"
              onClick={onCancel}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              size="lg"
              className="font-bold shadow-md"
              disabled={!canSubmit || isSubmitting}
            >
              Lưu nhân sự
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}
