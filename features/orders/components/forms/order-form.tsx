"use client"

import { useMemo, useState, type ReactNode } from "react"
import { useForm } from "@tanstack/react-form"
import { DateTime } from "luxon"
import {
  FileText,
  Package,
  Paperclip,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react"
import { useDropzone } from "react-dropzone"

import { DatePicker } from "@/components/shared/date-picker"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
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
import { resolveApiAssetUrl } from "@/lib/asset-url"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/number.util"
import {
  orderFormSchema,
  type OrderFormInput,
} from "../../schemas/order.schema"
import type {
  Order,
  OrderFormOptions,
  OrderProductFile,
  OrderProductOption,
} from "../../types"

type OrderFormProps = {
  formOptions: OrderFormOptions
  order?: Order
  onCancel: () => void
  onSubmit: (value: OrderFormInput, pdfFile: File | null) => Promise<unknown>
  onSuccess: () => void
  onTechnicalFileUpload?: (
    productId: string,
    file: File
  ) => Promise<OrderProductFile>
  submitLabel: string
  submittingLabel: string
}

const vatRateOptions = [0, 5, 8, 10] as const

export function OrderForm({
  formOptions,
  order,
  onCancel,
  onSubmit,
  onSuccess,
  onTechnicalFileUpload,
  submitLabel,
  submittingLabel,
}: OrderFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null)
  const [productOptions, setProductOptions] = useState(formOptions.products)

  const defaultValues = useMemo<OrderFormInput>(
    () => ({
      clientId: order?.client.id ?? "",
      code: order?.code ?? "",
      prNumber: order?.prNumber ?? "",
      dueDate:
        order?.dueDate?.split("T")[0] ??
        DateTime.now().plus({ days: 7 }).toISODate(),
      vatRate: order?.vatRate ?? 10,
      note: order?.note ?? "",
      items: order?.items.length
        ? order.items.map((orderItem) => ({
            productId: orderItem.productId,
            unit: orderItem.unit,
            quantity: Number(orderItem.quantity),
          }))
        : [
            {
              productId: "",
              unit: "",
              quantity: 1,
            },
          ],
    }),
    [order]
  )

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: orderFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await onSubmit(value, selectedPdfFile)
        onSuccess()
      } catch {
        setSubmitError("Không thể lưu đơn hàng. Vui lòng thử lại.")
      }
    },
  })

  function handleTechnicalFileUploaded(
    productId: string,
    uploadedFile: OrderProductFile
  ) {
    setProductOptions((currentProducts) =>
      currentProducts.map((productOption) =>
        productOption.id === productId
          ? {
              ...productOption,
              technicalFiles: [uploadedFile, ...productOption.technicalFiles],
            }
          : productOption
      )
    )
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <FieldGroup className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <form.Field name="clientId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0
            const selectedClient = formOptions.clients.find(
              (client) => client.id === field.state.value
            )

            return (
              <Field className="sm:col-span-2" data-invalid={isInvalid}>
                <RequiredFieldLabel>Khách hàng</RequiredFieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {formOptions.clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.code} - {client.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedClient ? (
                  <div className="grid gap-2 rounded-md border border-border/70 bg-muted/20 p-3 text-xs text-muted-foreground sm:grid-cols-2">
                    <ClientInfo
                      label="Công ty"
                      value={selectedClient.companyName}
                    />
                    <ClientInfo
                      label="Mã số thuế"
                      value={selectedClient.taxCode}
                    />
                    <ClientInfo
                      label="Số điện thoại"
                      value={selectedClient.phoneNumber}
                    />
                    <ClientInfo
                      label="Địa chỉ"
                      value={selectedClient.address}
                    />
                  </div>
                ) : null}
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="code">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel htmlFor={field.name}>
                  Mã PO
                </RequiredFieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="PO-24001"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="prNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel htmlFor={field.name}>
                  Số PR
                </RequiredFieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="PR-001"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="dueDate">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel>Ngày giao hàng</RequiredFieldLabel>
                <DatePicker
                  value={field.state.value}
                  isInvalid={isInvalid}
                  minYear={2020}
                  maxYear={2035}
                  defaultMonth={new Date()}
                  onBlur={field.handleBlur}
                  onChange={(value) => field.handleChange(value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="vatRate">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel>Mức VAT</RequiredFieldLabel>
                <Select
                  value={String(field.state.value)}
                  onValueChange={(value) => field.handleChange(Number(value))}
                >
                  <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Chọn VAT" />
                  </SelectTrigger>
                  <SelectContent>
                    {vatRateOptions.map((vatRate) => (
                      <SelectItem key={vatRate} value={String(vatRate)}>
                        {vatRate}%
                      </SelectItem>
                    ))}
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
              <FieldLabel htmlFor={field.name}>Ghi chú</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Ghi chú giao hàng, yêu cầu đặc biệt..."
                className="min-h-22 resize-y"
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <OrderPdfDropzone
        existingFiles={order?.files ?? []}
        selectedFile={selectedPdfFile}
        onFileChange={setSelectedPdfFile}
      />

      <form.Field name="items">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && field.state.meta.errors.length > 0
          const orderItems = field.state.value
          const totals = calculateDraftTotals(orderItems, productOptions)

          return (
            <Field data-invalid={isInvalid}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <RequiredFieldLabel>Thông tin thành phẩm</RequiredFieldLabel>
                  <FieldDescription>
                    Đơn giá lấy từ giá bán mặc định của sản phẩm và được backend
                    snapshot khi lưu đơn.
                  </FieldDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    field.handleChange([
                      ...orderItems,
                      { productId: "", unit: "", quantity: 1 },
                    ])
                  }
                >
                  <Plus className="size-4" />
                  Thêm dòng
                </Button>
              </div>

              <div className="grid gap-3">
                {orderItems.map((orderItem, index) => {
                  const selectedProduct = productOptions.find(
                    (productOption) => productOption.id === orderItem.productId
                  )
                  const lineTotal =
                    Number(selectedProduct?.defaultSalePrice ?? 0) *
                    Number(orderItem.quantity || 0)

                  return (
                    <div
                      key={`${index}-${orderItem.productId || "empty"}`}
                      className="grid gap-3 rounded-md border border-border/70 bg-background p-3"
                    >
                      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_120px_120px_130px_36px] lg:items-end">
                        <Field>
                          <RequiredFieldLabel>Thành phẩm</RequiredFieldLabel>
                          <Select
                            value={orderItem.productId}
                            onValueChange={(productId) => {
                              const productOption = productOptions.find(
                                (option) => option.id === productId
                              )
                              const nextItems = [...orderItems]
                              nextItems[index] = {
                                ...orderItem,
                                productId,
                                unit: productOption?.unit ?? orderItem.unit,
                              }
                              field.handleChange(nextItems)
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn mã thành phẩm" />
                            </SelectTrigger>
                            <SelectContent>
                              {productOptions.map((productOption) => (
                                <SelectItem
                                  key={productOption.id}
                                  value={productOption.id}
                                >
                                  {productOption.code} - {productOption.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field>
                          <RequiredFieldLabel>Đơn vị</RequiredFieldLabel>
                          <Input
                            value={orderItem.unit}
                            onChange={(event) => {
                              const nextItems = [...orderItems]
                              nextItems[index] = {
                                ...orderItem,
                                unit: event.target.value,
                              }
                              field.handleChange(nextItems)
                            }}
                            placeholder="bộ"
                          />
                        </Field>

                        <Field>
                          <RequiredFieldLabel>Số lượng</RequiredFieldLabel>
                          <Input
                            type="number"
                            min="0"
                            step="0.001"
                            value={orderItem.quantity}
                            onChange={(event) => {
                              const nextItems = [...orderItems]
                              nextItems[index] = {
                                ...orderItem,
                                quantity: Number(event.target.value),
                              }
                              field.handleChange(nextItems)
                            }}
                          />
                        </Field>

                        <div className="grid gap-1">
                          <p className="text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                            Thành tiền
                          </p>
                          <p className="h-9 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm font-semibold text-foreground">
                            {formatCurrency(lineTotal)}
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled={orderItems.length === 1}
                          aria-label="Xóa dòng thành phẩm"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            field.handleChange(
                              orderItems.filter(
                                (_, orderItemIndex) => orderItemIndex !== index
                              )
                            )
                          }
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>

                      {selectedProduct ? (
                        <ProductTechnicalFiles
                          product={selectedProduct}
                          disabled={!onTechnicalFileUpload}
                          onUploaded={handleTechnicalFileUploaded}
                          onUpload={onTechnicalFileUpload}
                        />
                      ) : (
                        <div className="flex items-center gap-2 rounded-md bg-muted/25 px-3 py-2 text-xs text-muted-foreground">
                          <Package className="size-4" />
                          Chọn thành phẩm để xem file kỹ thuật và đơn giá mặc
                          định.
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="grid gap-2 rounded-md border border-border/70 bg-muted/20 p-3 sm:ml-auto sm:w-80">
                <MoneyRow label="Tổng tiền" value={totals.subTotal} />
                <form.Subscribe selector={(state) => state.values.vatRate}>
                  {(vatRate) => (
                    <>
                      <MoneyRow
                        label={`VAT ${vatRate}%`}
                        value={(totals.subTotal * Number(vatRate)) / 100}
                      />
                      <MoneyRow
                        label="Tổng sau VAT"
                        value={
                          totals.subTotal +
                          (totals.subTotal * Number(vatRate)) / 100
                        }
                        strong
                      />
                    </>
                  )}
                </form.Subscribe>
              </div>

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      </form.Field>

      {submitError ? <FieldError>{submitError}</FieldError> : null}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex justify-end gap-3 border-t border-border/70 pt-5">
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
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}

function OrderPdfDropzone({
  existingFiles,
  selectedFile,
  onFileChange,
}: {
  existingFiles: Order["files"]
  selectedFile: File | null
  onFileChange: (file: File | null) => void
}) {
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => onFileChange(acceptedFiles[0] ?? null),
  })

  return (
    <Field>
      <FieldLabel>File đặt hàng PO PDF</FieldLabel>
      <div
        {...getRootProps()}
        className={cn(
          "grid cursor-pointer justify-items-center gap-2 rounded-md border border-dashed border-border bg-muted/15 px-4 py-5 text-center transition-colors",
          isDragActive && "border-primary bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        <span className="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
          <Upload className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">
            {selectedFile ? selectedFile.name : "Kéo thả hoặc chọn file PDF"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            File PO chỉ hiển thị cho Admin, Giám đốc và Kinh doanh. Tối đa 10
            MB.
          </p>
        </div>
      </div>

      {selectedFile ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-fit text-muted-foreground"
          onClick={() => onFileChange(null)}
        >
          <X className="size-4" />
          Bỏ file đã chọn
        </Button>
      ) : null}

      {existingFiles.length ? (
        <div className="grid gap-2 rounded-md border border-border/70 bg-background p-3">
          <p className="text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            File PO hiện có
          </p>
          {existingFiles.map((orderFile) => {
            const fileUrl = resolveApiAssetUrl(orderFile.url)

            return (
              <a
                key={orderFile.id}
                href={fileUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{orderFile.originalName}</span>
              </a>
            )
          })}
        </div>
      ) : null}
    </Field>
  )
}

function ProductTechnicalFiles({
  disabled,
  onUpload,
  onUploaded,
  product,
}: {
  disabled?: boolean
  onUpload?: (productId: string, file: File) => Promise<OrderProductFile>
  onUploaded: (productId: string, uploadedFile: OrderProductFile) => void
  product: OrderProductOption
}) {
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { getInputProps, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/dxf": [".dxf"],
      "application/dwg": [".dwg"],
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
    multiple: false,
    noClick: true,
    onDrop: async (acceptedFiles) => {
      const technicalFile = acceptedFiles[0]

      if (!technicalFile || !onUpload) {
        return
      }

      setUploadError(null)
      setIsUploading(true)

      try {
        const uploadedFile = await onUpload(product.id, technicalFile)
        onUploaded(product.id, uploadedFile)
      } catch {
        setUploadError("Không thể upload file kỹ thuật.")
      } finally {
        setIsUploading(false)
      }
    },
  })

  return (
    <div className="grid gap-2 rounded-md bg-muted/25 px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">
            {product.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Đơn giá mặc định: {formatCurrency(product.defaultSalePrice)}
          </p>
        </div>

        <div>
          <input {...getInputProps()} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || isUploading}
            onClick={open}
          >
            <Paperclip className="size-4" />
            {isUploading ? "Đang upload..." : "Up file"}
          </Button>
        </div>
      </div>

      {product.technicalFiles.length ? (
        <div className="flex flex-wrap gap-2">
          {product.technicalFiles.slice(0, 4).map((technicalFile) => {
            const fileUrl = resolveApiAssetUrl(technicalFile.url)

            return (
              <a
                key={technicalFile.id}
                href={fileUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex max-w-52 items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground hover:text-primary"
              >
                <FileText className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{technicalFile.originalName}</span>
              </a>
            )
          })}
          {product.technicalFiles.length > 4 ? (
            <span className="rounded-md bg-background px-2 py-1 text-xs text-muted-foreground">
              +{product.technicalFiles.length - 4} file
            </span>
          ) : null}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Sản phẩm chưa có file kỹ thuật.
        </p>
      )}

      {uploadError ? (
        <p className="text-xs text-destructive">{uploadError}</p>
      ) : null}
    </div>
  )
}

function ClientInfo({
  label,
  value,
}: {
  label: string
  value?: string | null
}) {
  return (
    <p className="min-w-0">
      <span className="font-semibold text-foreground">{label}: </span>
      <span className="break-words">{value || "--"}</span>
    </p>
  )
}

function MoneyRow({
  label,
  strong = false,
  value,
}: {
  label: string
  strong?: boolean
  value: number
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span
        className={
          strong ? "font-semibold text-foreground" : "text-muted-foreground"
        }
      >
        {label}
      </span>
      <span className="font-semibold text-foreground">
        {formatCurrency(value)}
      </span>
    </div>
  )
}

function calculateDraftTotals(
  orderItems: OrderFormInput["items"],
  productOptions: OrderProductOption[]
) {
  const subTotal = orderItems.reduce((totalAmount, orderItem) => {
    const productOption = productOptions.find(
      (option) => option.id === orderItem.productId
    )

    return (
      totalAmount +
      Number(productOption?.defaultSalePrice ?? 0) *
        Number(orderItem.quantity || 0)
    )
  }, 0)

  return {
    subTotal,
  }
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
