"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useForm } from "@tanstack/react-form"
import { Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  editableProductStatusOptions,
  productItemTypeOptions,
} from "../constants/product-table-constants"
import {
  type UpdateProductFormInput,
  updateProductFormSchema,
} from "../schemas/product.schema"
import { ProductStatus, type Product, type ProductFormOptions } from "../types"
import { ProductImageField } from "./product-image-field"

type EditProductFormProps = {
  product: Product
  formOptions: ProductFormOptions
  onCancel: () => void
  onSuccess: () => void
  onSubmit: (
    value: UpdateProductFormInput,
    imageFile: File | null,
    shouldDeleteImage: boolean
  ) => Promise<unknown>
  variant?: "page" | "dialog"
}

export function EditProductForm({
  product,
  formOptions,
  onCancel,
  onSuccess,
  onSubmit,
  variant = "page",
}: EditProductFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [selectedImagePreviewUrl, setSelectedImagePreviewUrl] = useState<
    string | null
  >(null)
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false)
  const unitOptions = getUnitOptions(product, formOptions)

  const defaultValues: UpdateProductFormInput = {
    clientId: product.client?.id ?? "none",
    code: product.code,
    name: product.name,
    itemType: product.itemType,
    unitId: product.unit?.id ?? "",
    revisionNo: product.currentRevision?.revisionNo ?? "",
    status:
      product.status === ProductStatus.INACTIVE
        ? ProductStatus.INACTIVE
        : ProductStatus.ACTIVE,
    imageUrl: product.imageUrl ?? "",
    note: product.note ?? "",
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: updateProductFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await onSubmit(value, selectedImageFile, shouldDeleteImage)
        onSuccess()
      } catch {
        setSubmitError("Không thể cập nhật sản phẩm. Vui lòng thử lại.")
      }
    },
  })

  useEffect(() => {
    return () => {
      if (selectedImagePreviewUrl) {
        URL.revokeObjectURL(selectedImagePreviewUrl)
      }
    }
  }, [selectedImagePreviewUrl])

  function handleImageFileChange(file: File | null) {
    setSelectedImageFile(file)
    setSelectedImagePreviewUrl(file ? URL.createObjectURL(file) : null)
    setShouldDeleteImage(false)
  }

  function handleClearImage() {
    setSelectedImageFile(null)
    setSelectedImagePreviewUrl(null)
    setShouldDeleteImage(!!product.imageUrl)
  }

  return (
    <form
      className={cn(
        "overflow-hidden",
        variant === "page" &&
          "rounded-(--radius) border border-border/80 bg-card shadow-xs"
      )}
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      {variant === "page" ? (
        <div className="border-b border-border/70 px-5 py-4 sm:px-6">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-base font-semibold text-foreground">
              Thông tin chung
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Điều chỉnh thông tin đang dùng trong danh mục sản phẩm. Revision
              mặc định được dùng để đối chiếu BOM - Routing khi tạo job.
            </p>
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]",
          variant === "page" ? "px-5 py-5 sm:px-6" : "py-1"
        )}
      >
        <ProductImageField
          label="Hình ảnh sản phẩm"
          imageUrl={
            selectedImagePreviewUrl ??
            (shouldDeleteImage ? null : product.imageUrl)
          }
          canClear={
            !!selectedImageFile || (!!product.imageUrl && !shouldDeleteImage)
          }
          onClear={handleClearImage}
          onFileChange={handleImageFileChange}
        />

        <FieldGroup className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
          <form.Field name="code">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <RequiredFieldLabel htmlFor={field.name}>
                    Mã sản phẩm
                  </RequiredFieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="XYZ"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <RequiredFieldLabel htmlFor={field.name}>
                    Tên sản phẩm
                  </RequiredFieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Sản phẩm XYZ"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="itemType">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <RequiredFieldLabel>Loại sản phẩm</RequiredFieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(
                        value as UpdateProductFormInput["itemType"]
                      )
                    }
                  >
                    <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                      <SelectValue placeholder="Chọn loại sản phẩm" />
                    </SelectTrigger>
                    <SelectContent>
                      {productItemTypeOptions.map((productItemTypeOption) => (
                        <SelectItem
                          key={productItemTypeOption.value}
                          value={productItemTypeOption.value}
                        >
                          {productItemTypeOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="unitId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <RequiredFieldLabel>Đơn vị tính</RequiredFieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                      <SelectValue placeholder="Chọn đơn vị" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.code} - {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="revisionNo">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <RequiredFieldLabel htmlFor={field.name}>
                    Revision mặc định
                  </RequiredFieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="R1"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="status">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0

              return (
                <Field data-invalid={isInvalid}>
                  <RequiredFieldLabel>Trạng thái</RequiredFieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(
                        value as UpdateProductFormInput["status"]
                      )
                    }
                  >
                    <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {editableProductStatusOptions.map(
                        (productStatusOption) => (
                          <SelectItem
                            key={productStatusOption.value}
                            value={productStatusOption.value}
                          >
                            {productStatusOption.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="note">
            {(field) => (
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor={field.name}>Ghi chú bổ sung</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập ghi chú chi tiết về sản phẩm..."
                  className="min-h-24 resize-y"
                />
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      </div>

      {submitError ? (
        <div className={cn(variant === "page" && "px-5 pb-4 sm:px-6")}>
          <FieldError>{submitError}</FieldError>
        </div>
      ) : null}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div
            className={cn(
              "flex justify-end gap-3 border-t border-border/70",
              variant === "page" ? "bg-muted/15 px-5 py-4 sm:px-6" : "pt-5"
            )}
          >
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              <X className="size-4" />
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              <Save className="size-4" />
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}

type RequiredFieldLabelProps = {
  children: ReactNode
  htmlFor?: string
}

function RequiredFieldLabel({ children, htmlFor }: RequiredFieldLabelProps) {
  return (
    <FieldLabel
      htmlFor={htmlFor}
      className="text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase"
    >
      {children} <span className="text-destructive">*</span>
    </FieldLabel>
  )
}

function getUnitOptions(product: Product, formOptions: ProductFormOptions) {
  if (
    product.unit &&
    !formOptions.units.some((unit) => unit.id === product.unit?.id)
  ) {
    return [product.unit, ...formOptions.units]
  }

  return formOptions.units
}
