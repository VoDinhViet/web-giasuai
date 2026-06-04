import { z } from "zod"

export const supplierTypeSchema = z.enum(["INDIVIDUAL", "COMPANY", "HOUSEHOLD"])

export const supplierFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Vui lòng nhập tên nhà cung cấp" }),
  supplierGroupId: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng chọn nhóm nhà cung cấp" }),
  supplierType: supplierTypeSchema,
  taxCode: z.string().trim().min(1, { message: "Vui lòng nhập mã số thuế" }),
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
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số điện thoại" }),
  representativeName: z.string().trim(),
  representativePhone: z.string().trim(),
  address: z.string().trim().min(1, { message: "Vui lòng nhập địa chỉ" }),
  note: z.string().trim(),
})

export const supplierUpdateFormSchema = supplierFormSchema.extend({
  supplierGroupId: z.string().trim(),
  taxCode: z.string().trim(),
  phoneNumber: z.string().trim(),
  address: z.string().trim(),
})

export type SupplierFormInput = z.infer<typeof supplierFormSchema>
export type SupplierUpdateFormInput = z.infer<typeof supplierUpdateFormSchema>
