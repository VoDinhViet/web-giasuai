"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import type { ActionResponse } from "@/types/api";
import type { User } from "@/types/user";
import {
  updateCurrentUserSchema,
  type UpdateCurrentUserInput,
} from "../schemas/update-current-user.schema";

export async function updateCurrentUser(
  data: UpdateCurrentUserInput
): Promise<ActionResponse<User>> {
  const parsed = updateCurrentUserSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Vui lòng kiểm tra lại thông tin hồ sơ.",
    };
  }

  try {
    const response = await api<User>("/api/v1/users/me", {
      method: "PATCH",
      body: parsed.data,
    });

    revalidatePath("/manage/profile");

    return {
      success: true,
      message: "Hồ sơ cá nhân đã được cập nhật.",
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
        "Đã có lỗi xảy ra khi cập nhật hồ sơ.",
    };
  }
}
