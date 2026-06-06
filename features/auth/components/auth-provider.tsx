"use client"

import * as React from "react"

import { UserRole, type Permission, type User } from "@/features/users/types"

const permissionsByRole: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: ["*"],
  [UserRole.INSTRUCTOR]: ["courses:read", "courses:write"],
  [UserRole.LEARNER]: ["courses:read"],
}

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
    () => permissionsByRole[initialUser.role] ?? [],
    [initialUser.role]
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
