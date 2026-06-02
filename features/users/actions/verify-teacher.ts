"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";

export async function verifyTeacher(userId: string) {
  try {
    await api(`/api/v1/users/${userId}/verify-teacher`, {
      method: "PATCH",
    });
    revalidatePath("/manage/users");
    return {
      success: true,
      message: "Tài khoản giáo viên đã được xác thực.",
    };
  } catch {
    return {
      success: false,
      message: "Không thể xác thực giáo viên. Vui lòng thử lại.",
    };
  }
}
