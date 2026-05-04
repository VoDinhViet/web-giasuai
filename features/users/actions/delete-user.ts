"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";

export async function deleteUser(userId: string) {
  try {
    await api(`/api/v1/users/${userId}`, { method: "DELETE" });
    revalidatePath("/manage/users");
    return { success: true, message: "Đã xóa người dùng thành công." };
  } catch {
    return { success: false, message: "Có lỗi xảy ra khi xóa người dùng." };
  }
}
