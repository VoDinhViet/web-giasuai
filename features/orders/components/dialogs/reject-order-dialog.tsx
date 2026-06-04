"use client"

import { useState, type ReactNode } from "react"
import { useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea"
import { rejectOrder } from "../../actions/reject-order"
import {
  rejectOrderFormSchema,
  type RejectOrderFormInput,
} from "../../schemas/order.schema"
import type { Order } from "../../types"

type RejectOrderDialogProps = {
  disabled?: boolean
  order: Order
  trigger?: ReactNode
}

export function RejectOrderDialog({
  disabled = false,
  order,
  trigger,
}: RejectOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      rejectedReason: "",
    } satisfies RejectOrderFormInput,
    validators: {
      onSubmit: rejectOrderFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await rejectOrder(order.id, value)
        setOpen(false)
        router.refresh()
      } catch {
        setSubmitError("Không thể từ chối đơn hàng. Vui lòng thử lại.")
      }
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        {trigger ?? (
          <Button type="button" variant="outline" disabled={disabled}>
            <XCircle className="size-4" />
            Từ chối
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Từ chối đơn hàng?</DialogTitle>
          <DialogDescription>
            Nhập lý do để Kinh doanh biết cần điều chỉnh thông tin nào trước khi
            trình duyệt lại.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
          noValidate
        >
          <FieldGroup>
            <form.Field name="rejectedReason">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Lý do từ chối</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Ví dụ: cần kiểm tra lại ngày giao hoặc đơn giá..."
                      className="min-h-28 resize-y"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>

          {submitError ? <FieldError>{submitError}</FieldError> : null}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => setOpen(false)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Đang từ chối..." : "Từ chối"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  )
}
