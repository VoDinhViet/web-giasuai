"use client"

import * as React from "react"
import { Pencil } from "lucide-react"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { updateClient } from "../../actions/update-client"
import type { Client } from "../../types"
import { ClientForm } from "../forms/client-form"

type EditClientDialogProps = {
  client: Client
}

export function EditClientDialog({ client }: EditClientDialogProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Chỉnh sửa ${client.fullName}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Chỉnh sửa</TooltipContent>
      </Tooltip>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-149">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa khách hàng</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin liên hệ, doanh nghiệp và địa chỉ khách hàng.
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          client={client}
          submitLabel="Cập nhật khách hàng"
          submittingLabel="Đang cập nhật..."
          submitErrorMessage="Không thể cập nhật khách hàng. Vui lòng thử lại."
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false)
            router.refresh()
          }}
          onSubmit={(value) => updateClient(client.id, value)}
        />
      </DialogContent>
    </Dialog>
  )
}
