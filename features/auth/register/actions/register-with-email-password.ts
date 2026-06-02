"use server";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import type { UserRole } from "@/types/user";
import type { RegisterInput } from "../schemas/register.schema";

interface RegisterResponse {
  userId: string;
}

interface VerifyRegistrationOtpResponse {
  isVerified: boolean;
  requiresAdminVerification: boolean;
}

interface OtpChallengeResponse {
  expiresInSeconds: number;
}

export async function registerWithEmailPassword(
  data: RegisterInput
): Promise<ActionResponse<RegisterResponse>> {
  try {
    const response = await api<RegisterResponse>("/api/v1/auth/register", {
      method: "POST",
      body: {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });

    return {
      success: true,
      message: "Tài khoản đã được tạo. Vui lòng nhập OTP để xác thực email.",
      data: response,
    };
  } catch (error: unknown) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Đăng ký thất bại. Email hoặc Tên đăng nhập có thể đã tồn tại.",
    };
  }
}

export async function requestRegistrationOtp(
  userId: string
): Promise<ActionResponse<OtpChallengeResponse>> {
  try {
    const response = await api<OtpChallengeResponse>(
      "/api/v1/auth/register/otp",
      {
        method: "POST",
        body: { userId },
      }
    );

    return {
      success: true,
      message: "OTP đã được gửi lại.",
      data: response,
    };
  } catch {
    return {
      success: false,
      message: "Không thể gửi lại OTP lúc này. Vui lòng thử lại sau.",
    };
  }
}

export async function verifyRegistrationOtp(
  userId: string,
  otpCode: string,
  role: UserRole
): Promise<ActionResponse<VerifyRegistrationOtpResponse>> {
  try {
    const response = await api<VerifyRegistrationOtpResponse>(
      "/api/v1/auth/register/verify-otp",
      {
        method: "POST",
        body: { userId, otpCode },
      }
    );

    const message =
      role === "TEACHER" || response.requiresAdminVerification
        ? "Email đã xác thực. Tài khoản giáo viên sẽ đăng nhập được sau khi Admin duyệt."
        : "Email đã xác thực. Bạn có thể đăng nhập.";

    return {
      success: true,
      message,
      data: response,
    };
  } catch {
    return {
      success: false,
      message: "OTP không hợp lệ hoặc đã hết hạn.",
    };
  }
}
