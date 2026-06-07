"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

import { useAppForm } from "@/components/form/app-form"
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
import { FieldError } from "@/components/ui/field"
import { inviteUserToClass } from "../../actions/invite-user-to-class"
import {
  inviteUserToClassSchema,
  type InviteUserToClassInput,
} from "../../schemas/class.schema"
import type { ClassEnrollment } from "../../types"

type InviteUserToClassDialogProps = {
  classCode: string
  onInvited: (enrollment: ClassEnrollment) => void
}

const inviteUserDefaultValues: InviteUserToClassInput = {
  email: "",
  note: "",
}

export function InviteUserToClassDialog({
  classCode,
  onInvited,
}: InviteUserToClassDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useAppForm({
    defaultValues: inviteUserDefaultValues,
    validators: {
      onSubmit: inviteUserToClassSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      const inviteUserResult = await inviteUserToClass({
        classCode,
        input: value,
      })

      if (!inviteUserResult.success || !inviteUserResult.data) {
        setSubmitError(inviteUserResult.message ?? "Không thể gửi lời mời.")
        return
      }

      onInvited(inviteUserResult.data)
      form.reset(inviteUserDefaultValues)
      setIsOpen(false)
    },
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        setIsOpen(nextOpen)
        setSubmitError(null)
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <Mail className="size-4" />
          Mời học viên
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
          noValidate
        >
          <DialogHeader>
            <DialogTitle>Mời học viên vào lớp</DialogTitle>
            <DialogDescription>
              Gửi lời mời bằng email. Khi học viên xác nhận, yêu cầu sẽ nằm
              trong danh sách phê duyệt của lớp {classCode}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  label="Email học viên"
                  placeholder="hocvien@example.com"
                  type="email"
                />
              )}
            </form.AppField>
            <form.AppField name="note">
              {(field) => (
                <field.TextareaField
                  label="Ghi chú"
                  placeholder="Ghi chú mục tiêu học hoặc lịch phù hợp..."
                  rows={4}
                />
              )}
            </form.AppField>
          </div>

          {submitError ? <FieldError>{submitError}</FieldError> : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Hủy
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  <Mail data-icon="inline-start" />
                  {isSubmitting ? "Đang gửi..." : "Gửi lời mời"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
