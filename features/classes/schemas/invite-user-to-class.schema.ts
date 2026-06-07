import { z } from "zod"

import { emptyStringToUndefined } from "./utils"

export const inviteUserToClassSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập email học viên" })
    .email({ message: "Email không hợp lệ" }),
  note: z
    .string()
    .trim()
    .max(1000, { message: "Ghi chú tối đa 1000 ký tự" })
    .transform(emptyStringToUndefined),
})

export type InviteUserToClassInput = z.input<typeof inviteUserToClassSchema>
export type InviteUserToClassReqDto = z.output<typeof inviteUserToClassSchema>
