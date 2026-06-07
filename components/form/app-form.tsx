"use client"

import type { ComponentProps } from "react"
import {
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

type TextFieldProps = Pick<
  ComponentProps<typeof Input>,
  "disabled" | "placeholder" | "type"
> & {
  label: string
}

function TextField({
  disabled,
  label,
  placeholder,
  type = "text",
}: TextFieldProps) {
  const field = useFieldContext<string | undefined>()
  const isInvalid =
    field.state.meta.isTouched && field.state.meta.errors.length > 0

  return (
    <Field data-invalid={isInvalid} data-disabled={disabled || undefined}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value ?? ""}
        disabled={disabled}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}

type TextareaFieldProps = Pick<
  ComponentProps<typeof Textarea>,
  "disabled" | "placeholder" | "rows"
> & {
  label: string
}

function TextareaField({
  disabled,
  label,
  placeholder,
  rows,
}: TextareaFieldProps) {
  const field = useFieldContext<string | undefined>()
  const isInvalid =
    field.state.meta.isTouched && field.state.meta.errors.length > 0

  return (
    <Field data-invalid={isInvalid} data-disabled={disabled || undefined}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        disabled={disabled}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
  },
  formComponents: {},
  fieldContext,
  formContext,
})
