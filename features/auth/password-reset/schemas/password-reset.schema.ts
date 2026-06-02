import { z } from "zod";

export const requestPasswordResetOtpSchema = z.object({
  email: z.string().trim().email({ message: "Địa chỉ email không hợp lệ" }),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().trim().email({ message: "Địa chỉ email không hợp lệ" }),
    otpCode: z
      .string()
      .trim()
      .length(6, { message: "OTP phải gồm 6 số" }),
    newPassword: z
      .string()
      .trim()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Vui lòng xác nhận lại mật khẩu" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RequestPasswordResetOtpInput = z.infer<
  typeof requestPasswordResetOtpSchema
>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
