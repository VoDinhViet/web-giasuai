import { z } from "zod"

export const supplierFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Vui lòng nhập tên nhà cung cấp" }),
  email: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 || z.string().email().safeParse(value).success,
      {
        message: "Email không hợp lệ",
      }
    ),
  phoneNumber: z.string().trim(),
  address: z.string().trim(),
})

export type SupplierFormInput = z.infer<typeof supplierFormSchema>
