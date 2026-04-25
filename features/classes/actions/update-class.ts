"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import type { Class } from "@/types/class";
import type { UpdateClassFormInput } from "../schemas/update-class.schema";

export async function updateClass(
  classId: string,
  data: UpdateClassFormInput
): Promise<ActionResponse<Class>> {
  try {
    const response = await api<Class>(`/api/v1/classes/${classId}`, {
      method: "PATCH",
      body: data,
    });

    revalidatePath("/manage/classes");
    revalidatePath(`/manage/classes/${classId}`);

    return {
      success: true,
      message: "Lớp học đã được cập nhật thành công.",
      data: response,
    };
  } catch (error: unknown) {
    const errorWithResponse = error as {
      response?: {
        _data?: {
          message?: string;
        };
      };
    };
    const message =
      errorWithResponse.response?._data?.message ||
      "Đã có lỗi xảy ra khi cập nhật lớp học.";

    return {
      success: false,
      message,
    };
  }
}
