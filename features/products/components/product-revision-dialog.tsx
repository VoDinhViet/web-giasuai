"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { Pencil, Plus, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
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
import { createProductRevision } from "../actions/create-product-revision"
import { updateProductRevision } from "../actions/update-product-revision"
import {
  createProductRevisionFormSchema,
  type CreateProductRevisionFormInput,
  updateProductRevisionFormSchema,
  type UpdateProductRevisionFormInput,
} from "../schemas/product.schema"
import type { ProductRevision } from "../types"

type CreateProductRevisionDialogProps = {
  productId: string
  revisions: ProductRevision[]
}

type EditProductRevisionDialogProps = {
  productId: string
  revision: ProductRevision
}

export function CreateProductRevisionDialog({
  productId,
  revisions,
}: CreateProductRevisionDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      revisionNo: "",
      copyFromRevisionId: "none",
      note: "",
    } satisfies CreateProductRevisionFormInput,
    validators: {
      onSubmit: createProductRevisionFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await createProductRevision(productId, value)
        setOpen(false)
        router.refresh()
      } catch {
        setSubmitError("Không thể tạo revision. Vui lòng thử lại.")
      }
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          <Plus className="size-4" />
          Tạo revision
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-135">
        <DialogHeader>
          <DialogTitle>Tạo revision</DialogTitle>
          <DialogDescription>
            Tạo revision mới cho sản phẩm. Có thể copy toàn bộ BOM - Routing từ
            một revision nguồn nếu cần kế thừa cấu trúc hiện có.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            form.handleSubmit()
          }}
          noValidate
        >
          <form.Field name="revisionNo">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Revision</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="R2"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : null}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="copyFromRevisionId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Copy BOM - Routing từ</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger className="w-full" aria-invalid={isInvalid}>
                      <SelectValue placeholder="Chọn revision nguồn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không copy</SelectItem>
                      {revisions.map((revision) => (
                        <SelectItem key={revision.id} value={revision.id}>
                          {revision.revisionNo}
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

          <form.Field name="note">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Ghi chú</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập ghi chú revision..."
                  className="min-h-24 resize-y"
                />
              </Field>
            )}
          </form.Field>

          {submitError ? <FieldError>{submitError}</FieldError> : null}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <RevisionDialogFooter
                canSubmit={canSubmit}
                isSubmitting={isSubmitting}
                pendingLabel="Đang tạo..."
                submitLabel="Tạo revision"
                onCancel={() => setOpen(false)}
              />
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function EditProductRevisionDialog({
  productId,
  revision,
}: EditProductRevisionDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      revisionNo: revision.revisionNo,
      note: revision.note ?? "",
    } satisfies UpdateProductRevisionFormInput,
    validators: {
      onSubmit: updateProductRevisionFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await updateProductRevision(productId, revision.id, value)
        setOpen(false)
        router.refresh()
      } catch {
        setSubmitError("Không thể cập nhật revision. Vui lòng thử lại.")
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
              aria-label={`Sửa revision ${revision.revisionNo}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Sửa revision</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-135">
        <DialogHeader>
          <DialogTitle>Cập nhật revision</DialogTitle>
          <DialogDescription>
            Chỉnh sửa mã revision và ghi chú. Thay đổi này không tự động copy
            hoặc thay đổi BOM - Routing.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            form.handleSubmit()
          }}
          noValidate
        >
          <form.Field name="revisionNo">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Revision</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="R2"
                    aria-invalid={isInvalid}
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
              <Field>
                <FieldLabel htmlFor={field.name}>Ghi chú</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Nhập ghi chú revision..."
                  className="min-h-24 resize-y"
                />
              </Field>
            )}
          </form.Field>

          {submitError ? <FieldError>{submitError}</FieldError> : null}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <RevisionDialogFooter
                canSubmit={canSubmit}
                isSubmitting={isSubmitting}
                pendingLabel="Đang cập nhật..."
                submitLabel="Cập nhật"
                onCancel={() => setOpen(false)}
              />
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function RevisionDialogFooter({
  canSubmit,
  isSubmitting,
  onCancel,
  pendingLabel,
  submitLabel,
}: {
  canSubmit: boolean
  isSubmitting: boolean
  onCancel: () => void
  pendingLabel: string
  submitLabel: string
}) {
  return (
    <div className="flex justify-end gap-3 border-t border-border pt-5">
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
        {isSubmitting ? pendingLabel : submitLabel}
      </Button>
    </div>
  )
}
