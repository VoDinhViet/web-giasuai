"use client"

import * as React from "react"
import { useTransition } from "react"
import { useForm } from "@tanstack/react-form"
import { AlertOctagon, Eye, EyeOff, Loader2, LogIn } from "lucide-react"
import { useQueryState } from "nuqs"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginWithEmailPassword } from "../actions/login-with-email-password"
import { loginSchema } from "../schemas/login.schema"

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [redirectTo] = useQueryState("redirectTo")

  const form = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await loginWithEmailPassword(
          value,
          redirectTo ?? undefined
        )

        if (result?.success === false) {
          setError(result.message)
        }
      })
    },
  })

  return (
    <div>
      <div className="mb-10">
        <div className="mb-2 flex items-end gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Cổng xác thực
          </p>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Đăng nhập
        </h1>
        <p className="mt-4 text-base leading-6 text-muted-foreground">
          Xác thực tài khoản để truy cập hệ thống quản lý sản xuất.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          form.handleSubmit()
        }}
        noValidate
        className="space-y-6"
      >
        {error ? (
          <Alert className="border-destructive/20 bg-destructive/10 text-destructive">
            <AlertOctagon className="size-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        ) : null}

        <FieldGroup className="gap-5">
          <form.Field name="emailOrUsername">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    Email hoặc tên đăng nhập
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Nhập email hoặc tên đăng nhập"
                    autoComplete="username"
                    className="h-12 border-2 bg-muted/30 px-4 font-medium"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    Mật khẩu
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="h-12 border-2 bg-muted/30 px-4 pr-11 font-medium"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="absolute top-1/2 right-2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )
            }}
          </form.Field>

          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                className="size-4 rounded border-2 border-border accent-primary"
              />
              Ghi nhớ phiên đăng nhập
            </label>
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full uppercase tracking-widest"
                disabled={!canSubmit || isSubmitting || isPending}
              >
                {isSubmitting || isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Đang đăng nhập
                  </>
                ) : (
                  <>
                    Đăng nhập hệ thống
                    <LogIn />
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>
    </div>
  )
}
