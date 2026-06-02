"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import { getPermissionsForRole } from "@/lib/rbac";
import type { ActionResponse } from "@/types/api";
import type { User } from "@/types/user";
import type { LoginInput } from "../schemas/login.schema";
import { Route } from "next";

interface LoginResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
}

function getLoginErrorMessage(error: unknown): string {
  const apiError = error as {
    response?: {
      _data?: {
        errorCode?: string;
      };
    };
  };

  if (apiError.response?._data?.errorCode === "auth.error.account_locked") {
    return "Tài khoản chưa xác thực, đang chờ duyệt hoặc đã bị khóa.";
  }

  return "Email hoặc mật khẩu không chính xác.";
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

    const user = await api<User>("/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${result.accessToken}`,
      },
    });

    session.role = user.role;
    session.permissions = user.permissions ?? getPermissionsForRole(user.role);

    await session.save();
  } catch (error: unknown) {
    console.error("Login error:", error);

    return {
      success: false,
      message: getLoginErrorMessage(error),
    };
  }

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") ? redirectTo : "/manage/users";

  redirect(safeRedirect as Route<string>);
}
