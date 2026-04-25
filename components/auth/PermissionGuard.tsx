"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { canAccess, canAccessAny } from "@/lib/rbac";
import type { AppPermission, UserRole } from "@/types/user";

interface PermissionGuardProps {
  children: ReactNode;
  permission?: AppPermission;
  permissions?: AppPermission[];
  role?: UserRole;
  roles?: UserRole[];
  fallback?: ReactNode;
}

export function PermissionGuard({
  children,
  permission,
  permissions,
  role,
  roles,
  fallback = null,
}: PermissionGuardProps) {
  const { myUser } = useAuth();

  const isAllowedByRole = role
    ? myUser?.role === role
    : roles?.length
      ? Boolean(myUser?.role && roles.includes(myUser.role))
      : true;

  const isAllowedByPermission = permission
    ? canAccess(myUser?.role, myUser?.permissions, permission)
    : permissions?.length
      ? canAccessAny(myUser?.role, myUser?.permissions, permissions)
      : true;

  const isAllowed = isAllowedByRole && isAllowedByPermission;

  if (!isAllowed) {
    return fallback;
  }

  return children;
}
