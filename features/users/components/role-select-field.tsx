"use client"

import type { AnyFieldApi } from "@tanstack/react-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Role } from "@/types/user"

type RoleSelectFieldProps = {
  field: AnyFieldApi
  roles: Role[]
  disabled?: boolean
  required?: boolean
}

export function RoleSelectField({
  field,
  roles,
  disabled,
  required,
}: RoleSelectFieldProps) {
  const isInvalid =
    field.state.meta.isTouched && field.state.meta.errors.length > 0

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel>
        Vai trò
        {required ? <span className="text-destructive">*</span> : null}
      </FieldLabel>
      <Select
        value={field.state.value ?? ""}
        onValueChange={field.handleChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full" aria-invalid={isInvalid}>
          <SelectValue placeholder="Chọn vai trò" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.id}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
