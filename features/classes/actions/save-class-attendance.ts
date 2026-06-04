"use server"

import { revalidatePath } from "next/cache"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import type { ActionResponse } from "@/types/api"
import type { ClassAttendance, ClassAttendanceStatus } from "../types"

export type SaveClassAttendanceRecordInput = {
  studentId: string
  status: ClassAttendanceStatus
  note?: string
}

type SaveClassAttendanceInput = {
  classCode: string
  sessionCode: string
  records: SaveClassAttendanceRecordInput[]
}

export async function saveClassAttendance({
  classCode,
  sessionCode,
  records,
}: SaveClassAttendanceInput): Promise<ActionResponse<ClassAttendance>> {
  try {
    const attendance = await api<ClassAttendance>(
      `/api/v1/classes/${classCode}/sessions/${sessionCode}/attendance`,
      {
        method: "PATCH",
        body: {
          records: records.map((record) =>
            omitEmptyFields({
              studentId: record.studentId,
              status: record.status,
              note: record.note,
            })
          ),
        },
      }
    )

    revalidatePath(`/manage/classes/${classCode}`)
    revalidatePath(`/manage/classes/${classCode}/sessions`)
    revalidatePath(
      `/manage/classes/${classCode}/sessions/${sessionCode}/attendance`
    )

    return {
      success: true,
      data: attendance,
    }
  } catch (saveClassAttendanceError) {
    console.error("Save class attendance error:", saveClassAttendanceError)

    return {
      success: false,
      message: "Không thể lưu điểm danh. Vui lòng thử lại.",
    }
  }
}
