"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useQueryState, parseAsBoolean } from "nuqs";
import {
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconAlertOctagon,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "../schemas/login.schema";
import { useTransition } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { loginWithEmailPassword } from "../actions/login-with-email-password";

interface LoginFormProps {
  // Props are now handled via nuqs
}

export function LoginForm({}: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isRegistered] = useQueryState(
    "registered",
    parseAsBoolean.withDefault(false),
  );
  const [redirectTo] = useQueryState("redirectTo");

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
        const result = await loginWithEmailPassword(value, redirectTo ?? undefined);
        if (result?.success === false) {
          setError(result.message);
        }
      });
    },
  });

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] md:p-12">
      <div className="relative z-10">
        <div className="mb-10 text-left">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Đăng nhập
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Cộng sự giáo dục thông minh
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
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
              <AlertTitle>Đăng ký thành công! Vui lòng đăng nhập.</AlertTitle>
            </Alert>
          )}
          <FieldGroup className="gap-6">
            <form.Field name="emailOrUsername">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-slate-900 dark:text-slate-200"
                    >
                      Email hoặc Tên đăng nhập{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Email hoặc username"
                      autoComplete="username"
                      className="h-11"
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
                );
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex w-full items-center justify-between">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-bold text-slate-900 dark:text-slate-200"
                      >
                        Mật khẩu <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-bold text-primary transition-colors hover:underline"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>

                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="h-11 pr-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <IconEyeOff className="size-4" />
                        ) : (
                          <IconEye className="size-4" />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full text-md font-bold"
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

        <p className="mt-8 text-left text-[13px] font-medium text-slate-500 dark:text-slate-400">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Đăng ký miễn phí
          </Link>
        </p>
      </div>
    </div>
  );
}
