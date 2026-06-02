"use client"

import type { ReactNode } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type DeleteConfirmationDialogProps = {
  description: string
  disabled?: boolean
  error?: string | null
  isPending: boolean
  itemLabel?: string
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
  pendingLabel: string
  title: string
  tooltip: string
  trigger: ReactNode
}

export function DeleteConfirmationDialog({
  description,
  disabled,
  error,
  isPending,
  itemLabel,
  onConfirm,
  onOpenChange,
  open,
  pendingLabel,
  title,
  tooltip,
  trigger,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild disabled={disabled}>
            {trigger}
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>

      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl p-0 sm:max-w-105"
      >
        <div className="grid justify-items-center px-6 pt-8 pb-6 text-center">
          <span className="mb-5 flex size-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <Trash2 className="size-11" />
          </span>

          <DialogTitle className="text-xl leading-7 font-semibold text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-2 max-w-70 text-sm leading-5 text-muted-foreground">
            {description}
          </DialogDescription>

          {itemLabel ? (
            <p className="mt-4 max-w-76 truncate text-xs font-semibold text-foreground">
              {itemLabel}
            </p>
          ) : null}

          {error ? (
            <p className="mt-3 text-xs leading-5 text-destructive">{error}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 pb-6">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            className="h-11 border-destructive/60 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={onConfirm}
            className="h-11"
          >
            {isPending ? pendingLabel : "Xóa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
