"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import type { ActionResponse } from "@/types/api";
import type { LoginInput } from "../schemas/login.schema";
import { Route } from "next";

interface LoginResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
}

export async function loginWithEmailPassword(
  data: LoginInput,
  redirectTo?: string
): Promise<ActionResponse<LoginResponse>> {
  try {
    const result = await api<LoginResponse>("/api/v1/auth/login", {
      method: "POST",
      body: {
        emailOrUsername: data.emailOrUsername,
        password: data.password,
      },
    });

    const session = await getSession();

    session.userId = result.userId;
    session.accessToken = result.accessToken;
    session.refreshToken = result.refreshToken;
    session.isLoggedIn = true;

    await session.save();
  } catch (error: unknown) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Email hoặc mật khẩu không chính xác.",
    };
  }

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") ? redirectTo : "/manage/users";

  redirect(safeRedirect as Route<string>);
}
