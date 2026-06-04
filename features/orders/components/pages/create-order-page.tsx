"use client"

import Link from "next/link"
import type { Route } from "next"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import type {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form"
import { DateTime } from "luxon"
import {
  ClipboardList,
  Package,
  Paperclip,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react"
import { useMemo, useState, type ReactNode } from "react"
import { useDropzone } from "react-dropzone"

import { DatePicker } from "@/components/shared/date-picker"
import { PageTitleBar } from "@/components/page-title-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/number.util"
import { createOrder } from "../../actions/create-order"
import { uploadOrderPdf } from "../../actions/upload-order-pdf"
import { uploadProductTechnicalFile } from "../../actions/upload-product-technical-file"
import {
  orderFormSchema,
  type OrderFormInput,
} from "../../schemas/order.schema"
import type {
  OrderFormOptions,
  OrderProductFile,
  OrderProductOption,
} from "../../types"

type CreateOrderPageProps = {
  formOptions: OrderFormOptions
}

type OrderFormValidate = FormValidateOrFn<OrderFormInput> | undefined
type OrderFormAsyncValidate = FormAsyncValidateOrFn<OrderFormInput> | undefined

type CreateOrderFormApi = ReactFormExtendedApi<
  OrderFormInput,
  OrderFormValidate,
  OrderFormValidate,
  OrderFormAsyncValidate,
  OrderFormValidate,
  OrderFormAsyncValidate,
  OrderFormValidate,
  OrderFormAsyncValidate,
  OrderFormValidate,
  OrderFormAsyncValidate,
  OrderFormAsyncValidate,
  unknown
>

const vatRateOptions = [0, 5, 8, 10] as const
const defaultValues: OrderFormInput = {
  clientId: "",
  code: "",
  prNumber: "",
  dueDate: DateTime.now().plus({ days: 7 }).toISODate(),
  vatRate: 8,
  note: "",
  items: [
    {
      productId: "",
      unit: "",
      quantity: 1,
    },
  ],
}

export function CreateOrderPage({ formOptions }: CreateOrderPageProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null)
  const [productOptions, setProductOptions] = useState(formOptions.products)
  const router = useRouter()
  const ordersRoute = "/manage/orders" as Route

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: orderFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        const order = await createOrder(value)

        if (selectedPdfFile) {
          const formData = new FormData()
          formData.set("file", selectedPdfFile)
          await uploadOrderPdf(order.id, formData)
        }

        router.push(`/manage/orders/${order.id}` as Route)
        router.refresh()
      } catch {
        setSubmitError("Không thể tạo đơn hàng. Vui lòng thử lại.")
      }
    },
  })

  function handleReset() {
    setSelectedPdfFile(null)
    setSubmitError(null)
    form.reset(defaultValues)
  }

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
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <PageTitleBar
          title="Tạo đơn hàng mới"
          breadcrumbItems={[
            { label: "Bảng điều khiển", href: "/manage/orders" },
            { label: "Đơn hàng", href: "/manage/orders" },
            { label: "Tạo mới" },
          ]}
          actions={
            <span className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
              Dữ liệu được lưu khi bấm Lưu và Trình duyệt
            </span>
          }
        />
      </div>

      <CustomerSection
        form={form as unknown as CreateOrderFormApi}
        formOptions={formOptions}
      />

      <form.Field name="items">
        {(itemsField) => (
          <>
            <OrderInfoSection
              form={form as unknown as CreateOrderFormApi}
              items={itemsField.state.value}
              productOptions={productOptions}
              selectedPdfFile={selectedPdfFile}
              onPdfFileChange={setSelectedPdfFile}
            />
            <ProductItemsSection
              itemsField={itemsField}
              productOptions={productOptions}
              onTechnicalFileUploaded={handleTechnicalFileUploaded}
            />
          </>
        )}
      </form.Field>

      {submitError ? <FieldError>{submitError}</FieldError> : null}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <div className="flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild type="button" variant="outline" size="lg">
              <Link href={ordersRoute}>
                <X className="size-4" />
                Hủy bỏ
              </Link>
            </Button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isSubmitting}
                onClick={handleReset}
              >
                <RefreshCcw className="size-4" />
                Làm lại
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={!canSubmit || isSubmitting}
                className="shadow-sm"
              >
                <Save className="size-4" />
                {isSubmitting ? "Đang lưu..." : "Lưu và Trình duyệt"}
              </Button>
            </div>
          </div>
        )}
      </form.Subscribe>
    </form>
  )
}

function CustomerSection({
  form,
  formOptions,
}: {
  form: CreateOrderFormApi
  formOptions: OrderFormOptions
}) {
  return (
    <SectionCard
      icon={<UserRound className="size-5" />}
      title="Thông tin khách hàng"
    >
      <form.Field name="clientId">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && field.state.meta.errors.length > 0
          const selectedClient = formOptions.clients.find(
            (client) => client.id === field.state.value
          )

          return (
            <div className="grid gap-x-7 gap-y-5 md:grid-cols-2">
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel>Tên khách hàng</RequiredFieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger
                    className="h-11 w-full"
                    aria-invalid={isInvalid}
                  >
                    <SelectValue placeholder="Chọn khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {formOptions.clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>

              <ReadonlyField
                label="Công ty"
                value={selectedClient?.companyName}
              />
              <ReadonlyField
                label="Mã số thuế"
                value={selectedClient?.taxCode}
              />
              <ReadonlyField
                label="Số điện thoại"
                value={selectedClient?.phoneNumber}
              />
              <ReadonlyField
                className="md:col-span-2"
                label="Địa chỉ"
                value={selectedClient?.address}
              />
            </div>
          )
        }}
      </form.Field>
    </SectionCard>
  )
}

function OrderInfoSection({
  form,
  items,
  onPdfFileChange,
  productOptions,
  selectedPdfFile,
}: {
  form: CreateOrderFormApi
  items: OrderFormInput["items"]
  onPdfFileChange: (file: File | null) => void
  productOptions: OrderProductOption[]
  selectedPdfFile: File | null
}) {
  const totals = useMemo(
    () => calculateDraftTotals(items, productOptions),
    [items, productOptions]
  )

  return (
    <SectionCard
      icon={<ClipboardList className="size-5" />}
      title="Thông tin đơn hàng"
    >
      <div className="grid gap-x-7 gap-y-5 lg:grid-cols-3">
        <form.Field name="code">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0

            return (
              <Field data-invalid={isInvalid}>
                <RequiredFieldLabel htmlFor={field.name}>
                  Mã số PO
                </RequiredFieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="PO-2024-NIKE-0045"
                  aria-invalid={isInvalid}
                  className="h-11"
                />
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
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
                  placeholder="PR-VN-11204"
                  aria-invalid={isInvalid}
                  className="h-11"
                />
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
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
                  className="h-11"
                  onBlur={field.handleBlur}
                  onChange={(value) => field.handleChange(value)}
                />
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="note">
          {(field) => (
            <Field className="lg:col-span-2">
              <FieldLabel htmlFor={field.name} className={labelClassName}>
                Ghi chú
              </FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Yêu cầu giao hàng, đóng gói, tiêu chuẩn..."
                className="min-h-24 resize-y"
              />
            </Field>
          )}
        </form.Field>

        <OrderPdfDropzone
          selectedFile={selectedPdfFile}
          onFileChange={onPdfFileChange}
        />

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
                  <SelectTrigger
                    className="h-11 w-full"
                    aria-invalid={isInvalid}
                  >
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
                {isInvalid ? (
                  <FieldError errors={field.state.meta.errors} />
                ) : null}
              </Field>
            )
          }}
        </form.Field>

        <form.Subscribe selector={(state) => state.values.vatRate}>
          {(vatRate) => (
            <>
              <ReadonlyMoneyField
                label="VAT (VND)"
                value={(totals.subTotal * Number(vatRate)) / 100}
              />
              <ReadonlyMoneyField
                label="Tổng sau VAT (VND)"
                value={
                  totals.subTotal + (totals.subTotal * Number(vatRate)) / 100
                }
                strong
              />
            </>
          )}
        </form.Subscribe>
      </div>
    </SectionCard>
  )
}

function ProductItemsSection({
  itemsField,
  onTechnicalFileUploaded,
  productOptions,
}: {
  itemsField: {
    handleChange: (value: OrderFormInput["items"]) => void
    state: {
      meta: {
        errors: Array<{ message?: string } | undefined>
        isTouched: boolean
      }
      value: OrderFormInput["items"]
    }
  }
  onTechnicalFileUploaded: (
    productId: string,
    uploadedFile: OrderProductFile
  ) => void
  productOptions: OrderProductOption[]
}) {
  const orderItems = itemsField.state.value
  const isInvalid =
    itemsField.state.meta.isTouched && itemsField.state.meta.errors.length > 0

  return (
    <SectionCard
      icon={<Package className="size-5" />}
      title="Thông tin thành phẩm"
      action={
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            itemsField.handleChange([
              ...orderItems,
              { productId: "", unit: "", quantity: 1 },
            ])
          }
        >
          <Plus className="size-4" />
          Thêm dòng sản phẩm
        </Button>
      }
      contentClassName="px-0 pb-0"
    >
      <div className="overflow-x-auto">
        <Table className="min-w-240">
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6">Sản phẩm</TableHead>
              <TableHead className="w-24">ĐVT</TableHead>
              <TableHead className="w-28">Số lượng</TableHead>
              <TableHead className="w-48">Đơn giá</TableHead>
              <TableHead className="w-44">Thành tiền</TableHead>
              <TableHead className="w-24 text-right">Files</TableHead>
              <TableHead className="w-14" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.map((orderItem, index) => {
              const selectedProduct = productOptions.find(
                (productOption) => productOption.id === orderItem.productId
              )
              const lineTotal =
                Number(selectedProduct?.defaultSalePrice ?? 0) *
                Number(orderItem.quantity || 0)

              return (
                <TableRow key={`${index}-${orderItem.productId || "empty"}`}>
                  <TableCell className="px-6">
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
                        itemsField.handleChange(nextItems)
                      }}
                    >
                      <SelectTrigger className="h-10 w-full min-w-64">
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
                  </TableCell>
                  <TableCell>
                    <Input
                      value={orderItem.unit}
                      onChange={(event) => {
                        const nextItems = [...orderItems]
                        nextItems[index] = {
                          ...orderItem,
                          unit: event.target.value,
                        }
                        itemsField.handleChange(nextItems)
                      }}
                      placeholder="bộ"
                      className="h-10"
                    />
                  </TableCell>
                  <TableCell>
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
                        itemsField.handleChange(nextItems)
                      }}
                      className="h-10 text-right"
                    />
                  </TableCell>
                  <TableCell>
                    <ReadonlyTableValue
                      value={formatCurrency(
                        selectedProduct?.defaultSalePrice ?? 0
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <ReadonlyTableValue
                      value={formatCurrency(lineTotal)}
                      strong
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    {selectedProduct ? (
                      <ProductFilesButton
                        product={selectedProduct}
                        onUploaded={onTechnicalFileUploaded}
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">--</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={orderItems.length === 1}
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() =>
                        itemsField.handleChange(
                          orderItems.filter(
                            (_, orderItemIndex) => orderItemIndex !== index
                          )
                        )
                      }
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      {isInvalid ? (
        <div className="px-6 py-4">
          <FieldError errors={itemsField.state.meta.errors} />
        </div>
      ) : null}
    </SectionCard>
  )
}

function ProductFilesButton({
  onUploaded,
  product,
}: {
  onUploaded: (productId: string, uploadedFile: OrderProductFile) => void
  product: OrderProductOption
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

      if (!technicalFile) {
        return
      }

      setError(null)
      setIsUploading(true)

      try {
        const formData = new FormData()
        formData.set("file", technicalFile)
        const uploadedFile = await uploadProductTechnicalFile(
          product.id,
          formData
        )
        onUploaded(product.id, uploadedFile)
      } catch {
        setError("Upload lỗi")
      } finally {
        setIsUploading(false)
      }
    },
  })

  return (
    <span className="inline-flex items-center justify-end gap-2">
      <input {...getInputProps()} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={isUploading}
        title={error ?? "Upload file kỹ thuật"}
        onClick={open}
        className={cn(error && "text-destructive hover:text-destructive")}
      >
        <Paperclip className="size-4" />
        {isUploading ? "..." : product.technicalFiles.length}
      </Button>
    </span>
  )
}

function OrderPdfDropzone({
  selectedFile,
  onFileChange,
}: {
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
      <FieldLabel className={labelClassName}>File đặt hàng (PDF)</FieldLabel>
      <div
        {...getRootProps()}
        className={cn(
          "flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-primary/35 bg-primary/5 px-4 py-4 text-center text-primary transition-colors",
          isDragActive && "border-primary bg-primary/10"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="size-5" />
        <p className="max-w-full truncate text-sm font-semibold">
          {selectedFile ? selectedFile.name : "Click để thay đổi file"}
        </p>
        <p className="text-xs text-primary/70">
          {selectedFile ? "PDF đã chọn" : "Chỉ nhận file PDF, tối đa 10 MB"}
        </p>
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
          Bỏ file
        </Button>
      ) : null}
    </Field>
  )
}

function SectionCard({
  action,
  children,
  contentClassName,
  icon,
  title,
}: {
  action?: ReactNode
  children: ReactNode
  contentClassName?: string
  icon: ReactNode
  title: string
}) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex-row items-center justify-between gap-4 px-6 py-6">
        <div className="flex min-w-0 items-center gap-4">
          <span className="text-primary">{icon}</span>
          <CardTitle className="text-xl leading-7">{title}</CardTitle>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </CardHeader>
      <CardContent className={cn("px-6 pb-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}

function ReadonlyField({
  className,
  label,
  value,
}: {
  className?: string
  label: string
  value?: string | null
}) {
  return (
    <Field className={className}>
      <FieldLabel className={labelClassName}>{label}</FieldLabel>
      <Input value={value || ""} readOnly className="h-11 bg-muted/10" />
    </Field>
  )
}

function ReadonlyMoneyField({
  label,
  strong = false,
  value,
}: {
  label: string
  strong?: boolean
  value: number
}) {
  return (
    <Field>
      <FieldLabel className={labelClassName}>{label}</FieldLabel>
      <div
        className={cn(
          "flex h-11 items-center justify-end rounded-md border border-border bg-muted/10 px-3 text-sm font-semibold text-foreground",
          strong && "text-primary"
        )}
      >
        {formatCurrency(value)}
      </div>
    </Field>
  )
}

function ReadonlyTableValue({
  strong = false,
  value,
}: {
  strong?: boolean
  value: string
}) {
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-end rounded-md border border-border bg-muted/10 px-3 text-sm text-foreground",
        strong && "font-semibold"
      )}
    >
      {value}
    </div>
  )
}

function calculateDraftTotals(
  orderItems: OrderFormInput["items"],
  productOptions: OrderProductOption[]
) {
  return {
    subTotal: orderItems.reduce((totalAmount, orderItem) => {
      const productOption = productOptions.find(
        (option) => option.id === orderItem.productId
      )

      return (
        totalAmount +
        Number(productOption?.defaultSalePrice ?? 0) *
          Number(orderItem.quantity || 0)
      )
    }, 0),
  }
}

type RequiredFieldLabelProps = {
  children: ReactNode
  htmlFor?: string
}

function RequiredFieldLabel({ children, htmlFor }: RequiredFieldLabelProps) {
  return (
    <FieldLabel htmlFor={htmlFor} className={labelClassName}>
      {children} <span className="text-destructive">*</span>
    </FieldLabel>
  )
}

const labelClassName =
  "text-[10px] leading-4 font-semibold tracking-[0.08em] text-muted-foreground uppercase"
