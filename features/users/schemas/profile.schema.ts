import { z } from "zod"

export const profileFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Họ tên phải có ít nhất 2 ký tự" })
    .max(120),
  phone: z.string().trim().max(32).optional(),
  location: z.string().trim().max(160).optional(),
  bio: z.string().trim().max(1000).optional(),
})

export type ProfileFormInput = z.infer<typeof profileFormSchema>
