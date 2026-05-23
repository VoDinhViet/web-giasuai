"use client"

import * as React from "react"

import type { Permission, User } from "@/types/user"

type AuthContextValue = {
  user: User
  permissions: Permission[]
  hasPermission: (permission: Permission) => boolean
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
  initialUser: User
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const currentUserPermissions = React.useMemo(
    () => initialUser.permissions ?? [],
    [initialUser.permissions]
  )

  const hasPermission = React.useCallback(
    (permission: Permission) =>
      currentUserPermissions.includes("*") ||
      currentUserPermissions.includes(permission),
    [currentUserPermissions]
  )

  const contextValue = React.useMemo<AuthContextValue>(
    () => ({
      user: initialUser,
      permissions: currentUserPermissions,
      hasPermission,
    }),
    [currentUserPermissions, hasPermission, initialUser]
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
