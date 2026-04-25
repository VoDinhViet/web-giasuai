import "server-only";

import { redirect } from "next/navigation";

import { AppPermission, UserRole } from "@/types/user";
import { getSession } from "./session";
import { canAccess, canAccessAny } from "./rbac";

export async function requireAuth() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(role: UserRole | UserRole[]) {
  const session = await requireAuth();
  const roles = Array.isArray(role) ? role : [role];

  if (!session.role || !roles.includes(session.role)) {
    redirect("/manage");
  }

  return session;
}

export async function requirePermission(permission: AppPermission) {
  const session = await requireAuth();

  if (!canAccess(session.role, session.permissions, permission)) {
    redirect("/manage");
  }

  return session;
}

export async function requireAnyPermission(
  permissions: AppPermission[]
) {
  const session = await requireAuth();

  if (!canAccessAny(session.role, session.permissions, permissions)) {
    redirect("/manage");
  }

  return session;
}
