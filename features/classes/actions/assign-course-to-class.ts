"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";

export async function assignCourseToClass(
  classId: string,
  courseId: string
): Promise<ActionResponse> {
  try {
    await api.raw(`/api/v1/classes/${classId}/courses/${courseId}`, {
      method: "POST",
    });

    revalidatePath("/manage/classes");
    revalidatePath("/courses");
    revalidatePath(`/manage/classes/${classId}`);
    revalidatePath(`/courses/${courseId}`);

    return {
      success: true,
      message: "Khóa học đã được gán vào lớp học thành công.",
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
        "Không thể gán khóa học vào lớp học.",
    };
  }
}
