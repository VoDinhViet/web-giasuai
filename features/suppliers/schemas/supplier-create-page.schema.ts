import { z } from "zod"

const supplierLogoMaxSizeInBytes = 2 * 1024 * 1024
const supplierLogoMimeTypes = ["image/jpeg", "image/png"]

const supplierLogoFileSchema = z
  .custom<File | null>(
    (value) =>
      value === null || (typeof File !== "undefined" && value instanceof File),
    "Logo không hợp lệ"
  )
  .refine(
    (value) => !value || supplierLogoMimeTypes.includes(value.type),
    "Logo chỉ hỗ trợ JPG hoặc PNG"
  )
  .refine(
    (value) => !value || value.size <= supplierLogoMaxSizeInBytes,
    "Logo không được vượt quá 2MB"
  )

export const supplierCreatePageSchema = z.object({
  supplierCode: z.string(),
  logoFile: supplierLogoFileSchema,
  name: z.string().trim().min(1, "Vui lòng nhập tên nhà cung cấp"),
  supplierGroupId: z.string().trim().min(1, "Vui lòng chọn nhóm nhà cung cấp"),
  supplierType: z.enum(["INDIVIDUAL", "COMPANY", "HOUSEHOLD"]),
  taxCode: z.string().trim().min(1, "Vui lòng nhập mã số thuế"),
  phoneNumber: z.string().trim().min(1, "Vui lòng nhập số điện thoại"),
  email: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 || z.string().email().safeParse(value).success,
      "Email không hợp lệ"
    ),
  representativeName: z.string().trim(),
  representativePhone: z.string().trim(),
  address: z.string().trim().min(1, "Vui lòng nhập địa chỉ"),
  note: z.string().trim(),
})

export const supplierCreatePageDraftSchema = supplierCreatePageSchema
  .omit({
    logoFile: true,
  })
  .extend({
    logoFileName: z.string().nullable().optional(),
  })

export const supplierEditPageSchema = supplierCreatePageSchema.extend({
  supplierGroupId: z.string().trim(),
  taxCode: z.string().trim(),
  phoneNumber: z.string().trim(),
  address: z.string().trim(),
})

export type SupplierCreatePageInput = z.infer<
  typeof supplierCreatePageSchema
>

export type SupplierEditPageInput = z.infer<typeof supplierEditPageSchema>

export type SupplierCreatePageDraftInput = z.infer<
  typeof supplierCreatePageDraftSchema
>
