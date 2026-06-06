"use client"

import { Lock, Unlock } from "lucide-react"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { toggleUserStatus } from "../../actions/toggle-user-status"

type UserLockButtonProps = {
  userId: string
  isLocked: boolean
}

export function UserLockButton({ userId, isLocked }: UserLockButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleToggleLock() {
    startTransition(async () => {
      await toggleUserStatus(userId)
    })
  }

  return (
    <Button
      type="button"
      variant={isLocked ? "default" : "outline"}
      disabled={isPending}
      onClick={handleToggleLock}
    >
      {isLocked ? <Unlock className="size-4" /> : <Lock className="size-4" />}
      {isLocked ? "Mở khóa" : "Khóa tài khoản"}
    </Button>
  )
}
