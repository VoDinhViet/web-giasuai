"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteClient } from "../actions/delete-client"
import type { Client } from "../types"

type DeleteClientDialogProps = {
  client: Client
}

export function DeleteClientDialog({ client }: DeleteClientDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      await deleteClient(client.id)
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Xóa ${client.fullName}`}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Xóa</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa khách hàng</DialogTitle>
          <DialogDescription>
            Khách hàng {client.fullName} sẽ bị xóa khỏi danh sách. Thao tác này
            không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Đang xóa..." : "Xóa khách hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
