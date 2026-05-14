"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import { getPermissionsForRole } from "@/lib/rbac";
import type { ActionResponse } from "@/types/api";
import type { User } from "@/types/user";
import type { LoginInput } from "../schemas/login.schema";

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

    const me = await api<User>("/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${result.accessToken}`,
      },
    });

    if (!me?.role) {
      return {
        success: false,
        message: "Không thể xác định vai trò người dùng sau khi đăng nhập.",
      };
    }

    const session = await getSession();

    session.userId = me.id;
    session.role = me.role;
    session.permissions = me.permissions ?? getPermissionsForRole(me.role);
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

  redirect(safeRedirect as any);
}
