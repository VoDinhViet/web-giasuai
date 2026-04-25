import { z } from "zod";

export const updateClassSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên lớp không được để trống")
    .max(120, "Tên lớp tối đa 120 ký tự"),
  description: z
    .string()
    .trim()
    .max(500, "Mô tả tối đa 500 ký tự"),
  isActive: z.boolean(),
});

export type UpdateClassFormInput = z.infer<typeof updateClassSchema>;
