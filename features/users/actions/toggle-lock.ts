"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";

export async function toggleLock(userId: string, isLocked: boolean) {
  try {
    await api(`/api/v1/users/${userId}/lock`, {
      method: "PATCH",
      body: { isLocked },
    });
    revalidatePath("/manage/users");
    return {
      success: true,
      message: `${isLocked ? "Khóa" : "Mở khóa"} thành công.`,
    };
  } catch {
    return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại." };
  }
}
