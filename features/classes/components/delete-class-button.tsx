"use client"

import { useState, useTransition, type ComponentProps } from "react"
import type { Route } from "next"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteClass } from "../actions/delete-class"

type DeleteClassButtonProps = {
  classCode: string
  className?: string
  label?: string
  redirectTo?: Route | null
  size?: ComponentProps<typeof Button>["size"]
  variant?: ComponentProps<typeof Button>["variant"]
  onDeleted?: (classCode: string) => void
}

export function DeleteClassButton({
  classCode,
  className,
  label = "Xóa lớp",
  redirectTo = "/manage/classes",
  size = "sm",
  variant = "outline",
  onDeleted,
}: DeleteClassButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const isIconOnly = !label

  function handleDeleteClass() {
    setDeleteError(null)

    startTransition(async () => {
      const deleteClassResult = await deleteClass(classCode)

      if (!deleteClassResult.success) {
        setDeleteError(deleteClassResult.message)
        return
      }

      setIsOpen(false)
      onDeleted?.(classCode)

      if (redirectTo) {
        router.push(redirectTo)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size={size}
          className={className}
          aria-label={isIconOnly ? "Xóa lớp học" : undefined}
        >
          <Trash2 data-icon={label ? "inline-start" : undefined} />
          {label ? <span>{label}</span> : null}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa lớp học?</DialogTitle>
          <DialogDescription>
            Lớp {classCode} sẽ bị xóa khỏi danh sách quản lý. Thao tác này không
            thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        {deleteError ? (
          <p className="rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {deleteError}
          </p>
        ) : null}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isPending}>
              Hủy
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteClass}
          >
            {isPending ? "Đang xóa..." : "Xóa lớp"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
