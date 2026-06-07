"use client"

import * as React from "react"

import type { Permission, User } from "@/features/users/types"
import {
  getPermissions,
  has,
} from "@/lib/auth/permission"

type AuthContextValue = {
  user: User
  permissions: readonly Permission[]
  hasPermission: (permission: Permission) => boolean
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
  initialUser: User
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const currentUserPermissions = React.useMemo(
    () => getPermissions(initialUser),
    [initialUser]
  )

  const canUsePermission = React.useCallback(
    (permission: Permission) =>
      has(currentUserPermissions, permission),
    [currentUserPermissions]
  )

  const contextValue = React.useMemo<AuthContextValue>(
    () => ({
      user: initialUser,
      permissions: currentUserPermissions,
      hasPermission: canUsePermission,
    }),
    [canUsePermission, currentUserPermissions, initialUser]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const authContext = React.useContext(AuthContext)

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider.")
  }

  return authContext
}
