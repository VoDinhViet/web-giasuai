"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { Plus, Save, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { createBomLine } from "../actions/create-bom-line"
import {
  createBomLineFormSchema,
  type CreateBomLineFormInput,
} from "../schemas/product.schema"
import { productItemTypeLabel } from "../constants/product-table-constants"
import {
  ProductItemType,
  type BomTreeNode,
  type ProductFormOptions,
} from "../types"

type AddBomNodeDialogProps = {
  productId: string
  revisionId: string
  parentNode: BomTreeNode
  formOptions: ProductFormOptions
}

export function AddBomNodeDialog({
  productId,
  revisionId,
  parentNode,
  formOptions,
}: AddBomNodeDialogProps) {
  const [open, setOpen] = useState(false)
  const [childItemType, setChildItemType] = useState<ProductItemType>(
    ProductItemType.WIP
  )
  const [productSearch, setProductSearch] = useState("")
  const [selectedChildItemId, setSelectedChildItemId] = useState("")
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()
  const canAddNode =
    parentNode.itemType === ProductItemType.FG ||
    parentNode.itemType === ProductItemType.WIP
  const childItemTypes = [
    ProductItemType.WIP,
    ProductItemType.RM,
    ProductItemType.CONSUMABLE,
  ] as const
  const productOptions = formOptions.products.filter(
    (product) => product.id !== parentNode.productId
  )
  const selectedChildItem =
    productOptions.find((product) => product.id === selectedChildItemId) ?? null
  const defaultValues: CreateBomLineFormInput = {
    childItemType: ProductItemType.WIP,
    childItemId: "",
    qty: "1",
    unitId: parentNode.unit?.id ?? "",
    note: "",
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createBomLineFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await createBomLine(productId, revisionId, parentNode.productId, value)
        setOpen(false)
        router.refresh()
      } catch {
        setSubmitError("Không thể thêm node BOM. Vui lòng thử lại.")
      }
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Thêm node dưới ${parentNode.code}`}
              disabled={!canAddNode}
              className="text-muted-foreground hover:text-foreground"
            >
              <Plus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          {canAddNode ? "Thêm node" : "Không thể thêm node"}
        </TooltipContent>
      </Tooltip>

      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-149">
        <DialogHeader>
          <DialogTitle>Thêm node BOM</DialogTitle>
          <DialogDescription>
            Chọn item con, số lượng và đơn vị cho {parentNode.code}.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault()
            form.handleSubmit()
          }}
          noValidate
        >
          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <form.Field name="childItemType">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Loại node con</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => {
                        const nextChildItemType =
                          value as CreateBomLineFormInput["childItemType"]

                        field.handleChange(nextChildItemType)
                        setChildItemType(nextChildItemType)
                        setProductSearch("")
                        setSelectedChildItemId("")
                        form.setFieldValue("childItemId", "")
                        form.setFieldValue("unitId", "")
                      }}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {childItemTypes.map((itemType) => (
                          <SelectItem key={itemType} value={itemType}>
                            {productItemTypeLabel[itemType]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="childItemId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                const normalizedSearch = productSearch.trim().toLowerCase()
                const filteredProductOptions = productOptions.filter(
                  (product) =>
                    product.itemType === childItemType &&
                    (normalizedSearch.length === 0 ||
                      product.code.toLowerCase().includes(normalizedSearch) ||
                      product.name.toLowerCase().includes(normalizedSearch))
                )

                return (
                  <Field data-invalid={isInvalid} className="sm:col-span-2">
                    <FieldLabel htmlFor={field.name}>Mã</FieldLabel>
                    <div className="relative">
                      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={productSearch}
                        onChange={(event) => {
                          setProductSearch(event.target.value)
                          setSelectedChildItemId("")
                          field.handleChange("")
                          form.setFieldValue("unitId", "")
                        }}
                        placeholder="Tìm mã hoặc tên item..."
                        className="pl-9"
                        aria-invalid={isInvalid}
                      />
                    </div>
                    <div className="max-h-44 overflow-y-auto rounded-md border border-border bg-background">
                      {filteredProductOptions.length > 0 ? (
                        filteredProductOptions.map((product) => {
                          const isSelected = product.id === field.state.value

                          return (
                            <button
                              key={product.id}
                              type="button"
                              className={cn(
                                "flex w-full flex-col px-3 py-2 text-left text-sm hover:bg-muted",
                                isSelected && "bg-muted"
                              )}
                              onClick={() => {
                                field.handleChange(product.id)
                                setSelectedChildItemId(product.id)
                                setProductSearch(product.code)

                                if (product.unit?.id) {
                                  form.setFieldValue("unitId", product.unit.id)
                                } else {
                                  form.setFieldValue("unitId", "")
                                }
                              }}
                            >
                              <span className="font-semibold text-foreground">
                                {product.code}
                              </span>
                              <span className="truncate text-xs text-muted-foreground">
                                {product.name}
                              </span>
                            </button>
                          )
                        })
                      ) : (
                        <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                          Không có item phù hợp.
                        </p>
                      )}
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <Field>
              <FieldLabel>Tên</FieldLabel>
              <Input value={selectedChildItem?.name ?? ""} disabled />
            </Field>

            <form.Field name="qty">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Số lượng</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      placeholder="1"
                      inputMode="decimal"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="unitId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Đơn vị</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Chọn đơn vị" />
                      </SelectTrigger>
                      <SelectContent>
                        {formOptions.units.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.code} - {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
                    placeholder="Nhập ghi chú cho node BOM..."
                    className="min-h-20 resize-y"
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          {submitError ? <FieldError>{submitError}</FieldError> : null}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="flex justify-end gap-3 border-t border-border pt-5">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => setOpen(false)}
                >
                  <X className="size-4" />
                  Hủy bỏ
                </Button>
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  <Save className="size-4" />
                  {isSubmitting ? "Đang thêm..." : "Thêm node"}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  )
}
