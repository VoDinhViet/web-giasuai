"use server";

import { redirect } from "next/navigation";
import type { Route } from "next";

import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import type { ActionResponse } from "@/types/api";
import type { LoginInput } from "../schemas/login.schema";

interface LoginResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
}

export async function loginWithEmailPassword(
  reqDto: LoginInput,
  redirectTo?: string
): Promise<ActionResponse<LoginResponse>> {
  try {
    const loginResponse = await api<LoginResponse>("/api/v1/auth/login", {
      method: "POST",
      body: {
        emailOrUsername: reqDto.emailOrUsername,
        password: reqDto.password,
      },
    });

    const session = await getSession();

    session.userId = loginResponse.userId;
    session.accessToken = loginResponse.accessToken;
    session.refreshToken = loginResponse.refreshToken;
    session.tokenExpires = loginResponse.tokenExpires;
    session.isLoggedIn = true;

    await session.save();
  } catch (loginError: unknown) {
    console.error("Login error:", loginError);

    return {
      success: false,
      message: "Email hoặc mật khẩu không chính xác.",
    };
  }

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") ? redirectTo : "/manage/users";

  redirect(safeRedirect as Route);
}
