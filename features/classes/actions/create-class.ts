"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import type { Class } from "@/types/class";
import type { CreateClassInput } from "../schemas/create-class.schema";

export async function createClass(
  data: CreateClassInput
): Promise<ActionResponse<Class>> {
  try {
    const response = await api<Class>("/api/v1/classes", {
      method: "POST",
      body: data,
    });

    revalidatePath("/manage/classes");

    return {
      success: true,
      message: "Lớp học đã được tạo thành công.",
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
      "Đã có lỗi xảy ra khi tạo lớp học.";

    return {
      success: false,
      message,
    };
  }
}
