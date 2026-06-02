import { z } from "zod"

import { ProductItemType, ProductStatus } from "../types"

const productImageUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value.length === 0 ||
      value.startsWith("/uploads/") ||
      value.startsWith("blob:") ||
      value.startsWith("data:") ||
      z.string().url().safeParse(value).success,
    {
      message: "Đường dẫn hình ảnh không hợp lệ",
    }
  )

export const productItemTypeSchema = z.enum(
  [
    ProductItemType.FG,
    ProductItemType.WIP,
    ProductItemType.RM,
    ProductItemType.CONSUMABLE,
  ],
  {
    message: "Vui lòng chọn loại sản phẩm",
  }
)

export const createProductFormSchema = z.object({
  clientId: z.string().trim(),
  code: z.string().trim().min(1, { message: "Vui lòng nhập mã sản phẩm" }),
  name: z.string().trim().min(1, { message: "Vui lòng nhập tên sản phẩm" }),
  itemType: productItemTypeSchema,
  unitId: z.string().trim().min(1, { message: "Vui lòng chọn đơn vị" }),
  revisionNo: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập mã revision" }),
  imageUrl: productImageUrlSchema,
  note: z.string().trim(),
})

export type CreateProductFormInput = z.infer<typeof createProductFormSchema>

export const updateProductStatusSchema = z.enum(
  [ProductStatus.ACTIVE, ProductStatus.INACTIVE],
  {
    message: "Vui lòng chọn trạng thái",
  }
)

export const updateProductFormSchema = z.object({
  clientId: z.string().trim(),
  code: z.string().trim().min(1, { message: "Vui lòng nhập mã sản phẩm" }),
  name: z.string().trim().min(1, { message: "Vui lòng nhập tên sản phẩm" }),
  itemType: productItemTypeSchema,
  unitId: z.string().trim().min(1, { message: "Vui lòng chọn đơn vị" }),
  revisionNo: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập mã revision" })
    .max(50, { message: "Revision tối đa 50 ký tự" }),
  status: updateProductStatusSchema,
  imageUrl: productImageUrlSchema,
  note: z.string().trim(),
})

export type UpdateProductFormInput = z.infer<typeof updateProductFormSchema>

export const createProductRevisionFormSchema = z.object({
  revisionNo: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập mã revision" })
    .max(50, { message: "Revision tối đa 50 ký tự" }),
  copyFromRevisionId: z.string().trim(),
  note: z.string().trim(),
})

export type CreateProductRevisionFormInput = z.infer<
  typeof createProductRevisionFormSchema
>

export const updateProductRevisionFormSchema = z.object({
  revisionNo: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập mã revision" })
    .max(50, { message: "Revision tối đa 50 ký tự" }),
  note: z.string().trim(),
})

export type UpdateProductRevisionFormInput = z.infer<
  typeof updateProductRevisionFormSchema
>

export const bomChildItemTypeSchema = z.enum(
  [ProductItemType.WIP, ProductItemType.RM, ProductItemType.CONSUMABLE],
  {
    message: "Vui lòng chọn loại node con",
  }
)

export const createBomLineFormSchema = z.object({
  childItemType: bomChildItemTypeSchema,
  childItemId: z.string().trim().min(1, { message: "Vui lòng chọn item con" }),
  qty: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số lượng" })
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
      message: "Số lượng phải lớn hơn 0",
    }),
  unitId: z.string().trim().min(1, { message: "Vui lòng chọn đơn vị" }),
  note: z.string().trim(),
})

export type CreateBomLineFormInput = z.infer<typeof createBomLineFormSchema>

export const updateBomLineFormSchema = z.object({
  qty: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số lượng" })
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
      message: "Số lượng phải lớn hơn 0",
    }),
  unitId: z.string().trim().optional(),
  note: z.string().trim().optional(),
})

export type UpdateBomLineFormInput = z.infer<typeof updateBomLineFormSchema>

export const routingStepFormSchema = z.object({
  operationId: z.string().trim().min(1, { message: "Vui lòng chọn công đoạn" }),
  stepNo: z.coerce
    .number()
    .int({ message: "STT phải là số nguyên" })
    .min(1, { message: "STT phải lớn hơn 0" }),
  isOutsideProcess: z.boolean(),
  defaultSupplierId: z.string().trim(),
  note: z.string().trim(),
})

export const updateRoutingFormSchema = z
  .object({
    steps: z.array(routingStepFormSchema),
  })
  .superRefine((value, context) => {
    const stepNos = new Set<number>()

    value.steps.forEach((step, index) => {
      if (stepNos.has(step.stepNo)) {
        context.addIssue({
          code: "custom",
          message: "STT công đoạn không được trùng",
          path: ["steps", index, "stepNo"],
        })
      }

      stepNos.add(step.stepNo)

      if (step.isOutsideProcess && step.defaultSupplierId === "none") {
        context.addIssue({
          code: "custom",
          message: "Vui lòng chọn nhà cung cấp cho công đoạn outsource",
          path: ["steps", index, "defaultSupplierId"],
        })
      }
    })
  })

export type UpdateRoutingFormInput = z.infer<typeof updateRoutingFormSchema>
