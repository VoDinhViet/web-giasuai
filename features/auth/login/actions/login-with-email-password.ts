"use server";

import { redirect } from "next/navigation";
import type { Route } from "next";

import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import type { ActionResponse } from "@/types/api";
import type { LoginInput } from "../schemas/login.schema";

interface LoginResponse {
  userId: string;
  roleCode: string;
  permissions: string[];
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
}

export async function loginWithEmailPassword(
  reqDto: LoginInput,
  redirectTo?: string
): Promise<ActionResponse<LoginResponse>> {
  try {
    const loginResponse = await api<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: {
        email: reqDto.email,
        password: reqDto.password,
      },
    });

    const session = await getSession();

    session.userId = loginResponse.userId;
    session.roleCode = loginResponse.roleCode;
    session.permissions = loginResponse.permissions;
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
