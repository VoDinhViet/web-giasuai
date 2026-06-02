"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconAlertOctagon,
  IconCircleCheck,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconMail,
} from "@tabler/icons-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  requestPasswordResetOtp,
  resetPassword,
} from "../actions/password-reset";
import {
  requestPasswordResetOtpSchema,
  resetPasswordSchema,
} from "../schemas/password-reset.schema";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = React.useTransition();
  const [email, setEmail] = React.useState("");
  const [otpCode, setOtpCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [hasRequestedOtp, setHasRequestedOtp] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleRequestOtp = () => {
    const parsed = requestPasswordResetOtpSchema.safeParse({ email });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Email không hợp lệ.");
      setSuccess(null);
      return;
    }

    startTransition(async () => {
      const result = await requestPasswordResetOtp(parsed.data);

      if (result.success) {
        setHasRequestedOtp(true);
        setError(null);
        setSuccess(result.message);
        return;
      }

      setError(result.message);
      setSuccess(null);
    });
  };

  const handleResetPassword = () => {
    const parsed = resetPasswordSchema.safeParse({
      email,
      otpCode,
      newPassword,
      confirmPassword,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Thông tin không hợp lệ.");
      setSuccess(null);
      return;
    }

    startTransition(async () => {
      const result = await resetPassword(parsed.data);

      if (result.success) {
        setError(null);
        setSuccess(result.message);
        setOtpCode("");
        setNewPassword("");
        setConfirmPassword("");
        return;
      }

      setError(result.message);
      setSuccess(null);
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] md:p-12">
      <div className="relative z-10 space-y-8">
        <div className="space-y-2 text-left">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Quên mật khẩu
          </h1>
          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            Nhận OTP qua email và đặt lại mật khẩu mới.
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

        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
              Email <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              className="h-11"
              value={email}
              disabled={isPending || hasRequestedOtp}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>

          {hasRequestedOtp && (
            <>
              <Field>
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
              </Field>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field>
                  <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-11 pr-10"
                      value={newPassword}
                      disabled={isPending}
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                      onClick={() => setShowNewPassword((value) => !value)}
                    >
                      {showNewPassword ? (
                        <IconEyeOff className="size-4" />
                      ) : (
                        <IconEye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>

                <Field>
                  <FieldLabel className="text-sm font-bold text-slate-900 dark:text-slate-200">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-11 pr-10"
                      value={confirmPassword}
                      disabled={isPending}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                    >
                      {showConfirmPassword ? (
                        <IconEyeOff className="size-4" />
                      ) : (
                        <IconEye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>
              </div>
            </>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" className="h-11 font-bold">
              <Link href="/login">Quay lại đăng nhập</Link>
            </Button>
            <Button
              type="button"
              className="h-11 font-bold"
              disabled={isPending}
              onClick={hasRequestedOtp ? handleResetPassword : handleRequestOtp}
            >
              {isPending ? (
                <IconLoader2 className="mr-2 size-5 animate-spin" />
              ) : hasRequestedOtp ? (
                <IconCircleCheck className="mr-2 size-5" />
              ) : (
                <IconMail className="mr-2 size-5" />
              )}
              {hasRequestedOtp ? "Đặt lại mật khẩu" : "Gửi OTP"}
            </Button>
          </div>
        </FieldGroup>
      </div>
    </div>
  );
}
