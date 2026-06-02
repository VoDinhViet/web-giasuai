"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import {
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconAlertOctagon,
  IconUserPlus,
  IconCircleCheck,
  IconMail,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerSchema } from "../schemas/register.schema";
import { useTransition } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  registerWithEmailPassword,
  requestRegistrationOtp,
  verifyRegistrationOtp,
} from "../actions/register-with-email-password";
import { UserRole } from "@/types/user";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type PendingRegistration = {
  userId: string;
  email: string;
  role: UserRole.STUDENT | UserRole.TEACHER;
};

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [pendingRegistration, setPendingRegistration] =
    React.useState<PendingRegistration | null>(null);
  const [otpCode, setOtpCode] = React.useState("");

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRole.STUDENT,
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await registerWithEmailPassword({
          ...value,
          role: value.role as UserRole.TEACHER | UserRole.STUDENT,
        });
        if (result?.success === false) {
          setError(result.message);
          setSuccess(null);
          return;
        }

        if (result?.data) {
          setError(null);
          setSuccess(result.message);
          setPendingRegistration({
            userId: result.data.userId,
            email: value.email,
            role: value.role as UserRole.TEACHER | UserRole.STUDENT,
          });
        }
      });
    },
  });

  const handleVerifyOtp = () => {
    if (!pendingRegistration || otpCode.length !== 6) {
      setError("Vui lòng nhập đủ 6 số OTP.");
      return;
    }

    startTransition(async () => {
      const result = await verifyRegistrationOtp(
        pendingRegistration.userId,
        otpCode,
        pendingRegistration.role
      );

      if (result.success) {
        setError(null);
        setSuccess(result.message);
        setPendingRegistration(null);
        return;
      }

      setError(result.message);
      setSuccess(null);
    });
  };

  const handleResendOtp = () => {
    if (!pendingRegistration) return;

    startTransition(async () => {
      const result = await requestRegistrationOtp(pendingRegistration.userId);

      if (result.success) {
        setError(null);
        setSuccess(result.message);
        return;
      }

      setError(result.message);
      setSuccess(null);
    });
  };

  if (pendingRegistration) {
    return (
      <div className="relative overflow-hidden rounded-[2.5rem] md:p-12">
        <div className="relative z-10 space-y-8">
          <div className="space-y-2 text-left">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Xác thực email
            </h2>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
              Nhập mã OTP 6 số đã gửi tới {pendingRegistration.email}.
            </p>
          </div>

          {error && (
            <Alert className="border-none bg-destructive/10 text-destructive dark:bg-destructive/15">
              <IconAlertOctagon className="size-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {success && (
            <Alert className="border-none bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15">
              <IconCircleCheck className="size-4" />
              <AlertTitle>{success}</AlertTitle>
            </Alert>
          )}

          <div className="space-y-3">
            <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
              Mã OTP <span className="text-red-500">*</span>
            </FieldLabel>
            <InputOTP
              maxLength={6}
              value={otpCode}
              onChange={setOtpCode}
              disabled={isPending}
              containerClassName="justify-between"
            >
              <InputOTPGroup className="w-full justify-between gap-2 border-none">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="size-11 rounded-xl border bg-background text-base font-bold"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="h-11 font-bold"
              disabled={isPending}
              onClick={handleResendOtp}
            >
              <IconMail className="mr-2 size-5" />
              Gửi lại OTP
            </Button>
            <Button
              type="button"
              className="h-11 font-bold"
              disabled={isPending || otpCode.length !== 6}
              onClick={handleVerifyOtp}
            >
              {isPending ? (
                <IconLoader2 className="mr-2 size-5 animate-spin" />
              ) : (
                <IconCircleCheck className="mr-2 size-5" />
              )}
              Xác thực
            </Button>
          </div>

          <p className="text-center text-[13px] font-medium text-slate-500 dark:text-slate-400">
            Đã xác thực?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] md:p-12">
      <div className="relative z-10">
        <div className="mb-10 text-left">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Đăng ký tài khoản
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Trở thành cộng sự giáo dục thông minh ngay hôm nay
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          noValidate
          className="space-y-5"
        >
          {error && (
            <Alert className="border-none bg-destructive/10 text-destructive dark:bg-destructive/15">
              <IconAlertOctagon className="size-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {success && (
            <Alert className="border-none bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15">
              <IconCircleCheck className="size-4" />
              <AlertTitle>{success}</AlertTitle>
            </Alert>
          )}

          <FieldGroup className="gap-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <form.Field name="fullName">
                {(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  >
                    <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      Họ và tên <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Nguyễn Văn A"
                      className="h-11"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isPending}
                    />
                    {field.state.meta.isTouched && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="username">
                {(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  >
                    <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      Tên đăng nhập <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="username123"
                      className="h-11"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
                        field.handleChange(val);
                      }}
                      disabled={isPending}
                    />
                    {field.state.meta.isTouched && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>
            </div>

            <form.Field name="email">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                >
                  <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                    Địa chỉ Email <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="example@gmail.com"
                    autoComplete="email"
                    className="h-11"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                  />
                  {field.state.meta.isTouched && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <form.Field name="password">
                {(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  >
                    <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      Mật khẩu <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-11 pr-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <IconEyeOff size={16} />
                        ) : (
                          <IconEye size={16} />
                        )}
                      </button>
                    </div>
                    {field.state.meta.isTouched && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="confirmPassword">
                {(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  >
                    <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-11 pr-10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <IconEyeOff size={16} />
                        ) : (
                          <IconEye size={16} />
                        )}
                      </button>
                    </div>
                    {field.state.meta.isTouched && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>
            </div>

            <form.Field name="role">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                >
                  <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                    Vai trò <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) =>
                      field.handleChange(
                        val as UserRole.STUDENT | UserRole.TEACHER
                      )
                    }
                    disabled={isPending}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Chọn vai trò của bạn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.STUDENT}>
                        Tôi là học viên
                      </SelectItem>
                      <SelectItem value={UserRole.TEACHER}>
                        Tôi là giáo viên
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.isTouched && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  size="lg"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isSubmitting || isPending ? (
                    <>
                      <IconLoader2 className="mr-2 size-5 animate-spin" />
                      Đang tạo tài khoản...
                    </>
                  ) : (
                    <>
                      <IconUserPlus className="mr-2 size-5" />
                      Tạo tài khoản ngay
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>

        <p className="mt-8 text-center text-[13px] font-medium text-slate-500 dark:text-slate-400">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
