"use server";

import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import type { RegisterInput } from "../schemas/register.schema";

interface RegisterResponse {
  userId: string;
  message: string;
}

export async function registerWithEmailPassword(
  data: RegisterInput
): Promise<ActionResponse<RegisterResponse>> {
  try {
    await api<RegisterResponse>("/api/v1/auth/register", {
      method: "POST",
      body: {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });

  } catch (error: unknown) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Đăng ký thất bại. Email hoặc Tên đăng nhập có thể đã tồn tại.",
    };
  }

  redirect("/login?registered=true");
}
