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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { clientTypeLabel } from "../lib/client-table-constants"
import {
  clientFormSchema,
  type ClientFormInput,
} from "../schemas/client.schema"
import { ClientType, type Client } from "../types"

type ClientFormProps = {
  client?: Client
  submitLabel: string
  submittingLabel: string
  submitErrorMessage: string
  onCancel: () => void
  onSuccess: () => void
  onSubmit: (value: ClientFormInput) => Promise<unknown>
}

export function ClientForm({
  client,
  submitLabel,
  submittingLabel,
  submitErrorMessage,
  onCancel,
  onSuccess,
  onSubmit,
}: ClientFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      fullName: client?.fullName ?? "",
      email: client?.email ?? "",
      phoneNumber: client?.phoneNumber ?? "",
      clientType: normalizeClientType(client?.clientType),
      taxCode: client?.taxCode ?? "",
      companyName: client?.companyName ?? "",
      address: client?.address ?? "",
    } satisfies ClientFormInput,
    validators: {
      onSubmit: clientFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await onSubmit(value)
        onSuccess()
      } catch {
        setSubmitError(submitErrorMessage)
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
                  Họ tên khách hàng
                </RequiredFieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập họ tên khách hàng"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="clientType">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel>Loại khách hàng</RequiredFieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as ClientFormInput["clientType"])
                  }
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn loại khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(clientTypeLabel).map(([type, label]) => (
                      <SelectItem key={type} value={type}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  placeholder="client@example.com"
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

        <form.Field name="taxCode">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Mã số thuế</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập mã số thuế"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Subscribe selector={(state) => state.values.clientType}>
          {(clientType) =>
            clientType === ClientType.COMPANY ? (
              <form.Field name="companyName">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0

                  return (
                    <Field data-invalid={isInvalid}>
                      <RequiredFieldLabel htmlFor={field.name}>
                        Tên công ty
                      </RequiredFieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Nhập tên công ty"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            ) : null
          }
        </form.Subscribe>

        <form.Field name="address">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid} className="sm:col-span-2">
                <FieldLabel htmlFor={field.name}>Địa chỉ</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập địa chỉ"
                  aria-invalid={isInvalid}
                />
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
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}

function normalizeClientType(value?: string): ClientType {
  if (value?.toUpperCase() === ClientType.COMPANY) {
    return ClientType.COMPANY
  }

  return ClientType.INDIVIDUAL
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
