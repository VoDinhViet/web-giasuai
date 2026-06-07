"use client"

import type { ReactNode } from "react"

import { useAuth } from "@/features/auth/components/auth-provider"
import { can, type PermissionInput } from "@/lib/auth/permission"

type CanProps = {
  children: ReactNode
  fallback?: ReactNode
  permission?: PermissionInput
}

export function Can({ children, fallback = null, permission }: CanProps) {
  const { user } = useAuth()

  if (!can(user, permission)) {
    return fallback
  }

  return children
}
