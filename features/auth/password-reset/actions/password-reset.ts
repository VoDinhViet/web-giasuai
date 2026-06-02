"use server";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import {
  requestPasswordResetOtpSchema,
  resetPasswordSchema,
  type RequestPasswordResetOtpInput,
  type ResetPasswordInput,
} from "../schemas/password-reset.schema";

interface OtpChallengeResponse {
  expiresInSeconds: number;
}

export async function requestPasswordResetOtp(
  input: RequestPasswordResetOtpInput
): Promise<ActionResponse<OtpChallengeResponse>> {
  const parsed = requestPasswordResetOtpSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Email không hợp lệ.",
    };
  }

  try {
    const response = await api<OtpChallengeResponse>(
      "/api/v1/auth/password-reset/otp",
      {
        method: "POST",
        body: parsed.data,
      }
    );

    return {
      success: true,
      message: "Nếu email tồn tại, OTP reset mật khẩu đã được gửi.",
      data: response,
    };
  } catch {
    return {
      success: false,
      message: "Không thể gửi OTP lúc này. Vui lòng thử lại sau.",
    };
  }
}

export async function resetPassword(
  input: ResetPasswordInput
): Promise<ActionResponse> {
  const parsed = resetPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Thông tin reset mật khẩu không hợp lệ.",
    };
  }

  try {
    await api("/api/v1/auth/password-reset", {
      method: "POST",
      body: {
        email: parsed.data.email,
        otpCode: parsed.data.otpCode,
        newPassword: parsed.data.newPassword,
      },
    });

    return {
      success: true,
      message: "Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.",
    };
  } catch {
    return {
      success: false,
      message: "OTP không hợp lệ hoặc đã hết hạn.",
    };
  }
}
