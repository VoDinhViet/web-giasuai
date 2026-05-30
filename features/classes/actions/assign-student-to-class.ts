"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";

export async function assignStudentToClass(
  classId: string,
  studentId: string
): Promise<ActionResponse> {
  try {
    await api.raw(`/api/v1/classes/${classId}/students/${studentId}`, {
      method: "POST",
    });

    revalidatePath("/manage/classes");
    revalidatePath(`/manage/classes/${classId}`);

    return {
      success: true,
      message: "Học viên đã được thêm vào lớp học thành công.",
    };
  } catch (error: unknown) {
    const errorWithResponse = error as {
      response?: {
        _data?: {
          message?: string;
        };
      };
    };

    return {
      success: false,
      message:
        errorWithResponse.response?._data?.message ||
        "Không thể thêm học viên vào lớp học.",
    };
  }
}
