"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import { ActionResponse } from "@/types/api";

export async function joinClassByInvite(
  inviteCode: string
): Promise<ActionResponse> {
  try {
    await api(`/api/v1/classes/join/${inviteCode}`, {
      method: "POST",
    });

    revalidatePath("/manage/classes");

    return {
      success: true,
      message: "Bạn đã tham gia lớp học thành công.",
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
        "Không thể tham gia lớp học bằng link mời.",
    };
  }
}
