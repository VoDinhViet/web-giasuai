"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import type { CreateUserInput } from "../schemas/create-user.schema";

export async function createUser(
  data: CreateUserInput
): Promise<ActionResponse<unknown>> {
  try {
    const response = await api("/api/v1/users", {
      method: "POST",
      body: data,
    });

    revalidatePath("/manage/users");

    return {
      success: true,
      message: "Người dùng đã được tạo thành công.",
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

    return {
      success: false,
      message:
        errorWithResponse.response?._data?.message ||
        "Đã có lỗi xảy ra khi tạo người dùng.",
    };
  }
}
