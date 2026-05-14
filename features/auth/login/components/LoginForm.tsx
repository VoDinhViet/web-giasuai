"use client"

import * as React from "react"
import { useTransition } from "react"
import { useForm } from "@tanstack/react-form"
import {
  IconAlertOctagon,
  IconEye,
  IconEyeOff,
  IconLoader2,
} from "@tabler/icons-react"
import { parseAsBoolean, useQueryState } from "nuqs"

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
  const [isRegistered] = useQueryState(
    "registered",
    parseAsBoolean.withDefault(false)
  )
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
    <div className="relative overflow-hidden md:p-12">
      <div className="relative z-10">
        <div className="mb-10 text-left">
          <div className="mb-5 flex items-center gap-3 lg:hidden">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground">
              TH
            </div>
            <div>
              <p className="text-sm font-black tracking-wide text-slate-900 uppercase">
                Cơ khí Tiến Huy
              </p>
              <p className="text-xs font-medium text-slate-500">
                Quản lý sản xuất
              </p>
            </div>
          </div>

          <h2 className="mb-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Đăng nhập
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Truy cập bảng điều hành sản xuất Cơ khí Tiến Huy.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          noValidate
          className="space-y-6"
        >
          {error && (
            <Alert className="border-none bg-destructive/10 text-destructive dark:bg-destructive/15">
              <IconAlertOctagon className="size-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {isRegistered && (
            <Alert className="border-none bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15">
              <IconAlertOctagon className="size-4" />
              <AlertTitle>Đăng ký thành công. Vui lòng đăng nhập.</AlertTitle>
            </Alert>
          )}

          <FieldGroup className="gap-6">
            <form.Field name="emailOrUsername">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-slate-900 dark:text-slate-200"
                    >
                      Tài khoản <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Email hoặc tên đăng nhập"
                      autoComplete="username"
                      className="h-11 border-slate-300 bg-white"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      disabled={isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
                      className="text-sm font-bold text-slate-900 dark:text-slate-200"
                    >
                      Mật khẩu <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="h-11 border-slate-300 bg-white pr-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        disabled={isPending}
                      />
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded focus:ring-0 data-[state=open]:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <IconEyeOff className="size-4" />
                        ) : (
                          <IconEye className="size-4" />
                        )}
                      </Button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  size="lg"
                  className="text-md h-12 w-full font-bold"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? (
                    <>
                      <IconLoader2 className="mr-2 size-5 animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>Đăng nhập</>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
