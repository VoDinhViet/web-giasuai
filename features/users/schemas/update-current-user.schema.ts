import { z } from "zod";

export const updateCurrentUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(120, "Họ và tên tối đa 120 ký tự"),
});

export type UpdateCurrentUserInput = z.infer<typeof updateCurrentUserSchema>;
