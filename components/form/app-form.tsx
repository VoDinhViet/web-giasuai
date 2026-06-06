"use client"

import type { ComponentProps, ReactNode } from "react"
import {
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

type TextFieldProps = {
  label: string
  disabled?: boolean
  placeholder?: string
  type?: "email" | "password" | "search" | "tel" | "text" | "url"
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
    <Field data-invalid={isInvalid}>
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

type TextareaFieldProps = {
  label: string
  disabled?: boolean
  placeholder?: string
  rows?: number
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
    <Field data-invalid={isInvalid}>
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

type SubscribeButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "disabled" | "type"
> & {
  icon?: ReactNode
  label: string
  pendingLabel?: string
}

function SubscribeButton({
  icon,
  label,
  pendingLabel,
  ...buttonProps
}: SubscribeButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
    >
      {([canSubmit, isSubmitting]) => (
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          {...buttonProps}
        >
          {icon}
          {isSubmitting ? pendingLabel ?? label : label}
        </Button>
      )}
    </form.Subscribe>
  )
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
