"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { approveOrder } from "../../actions/approve-order"
import type { Order } from "../../types"

type ApproveOrderButtonProps = {
  disabled?: boolean
  order: Order
}

export function ApproveOrderButton({
  disabled = false,
  order,
}: ApproveOrderButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleApprove() {
    startTransition(async () => {
      await approveOrder(order.id)
      router.refresh()
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled || isPending}
      onClick={handleApprove}
    >
      <CheckCircle2 className="size-4" />
      {isPending ? "Đang duyệt..." : "Duyệt"}
    </Button>
  )
}
