import "server-only";

import { redirect } from "next/navigation";

import type { AppPermission, User, UserRole } from "@/types/user";
import { api } from "./api";
import { getSession } from "./session";
import { canAccess, canAccessAny, getPermissionsForRole } from "./rbac";

type GuardSession = Awaited<ReturnType<typeof getSession>>;

async function hydrateSessionAuthorization(session: GuardSession) {
  if (session.role || !session.accessToken) {
    return session;
  }

  try {
    const user = await api<User>("/api/v1/users/me");

    session.role = user.role;
    session.permissions = user.permissions ?? getPermissionsForRole(user.role);
    await session.save();
  } catch {
    // The caller will redirect when the session still lacks authorization data.
  }

  return session;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(role: UserRole | UserRole[]) {
  const session = await hydrateSessionAuthorization(await requireAuth());
  const roles = Array.isArray(role) ? role : [role];

  if (!session.role || !roles.includes(session.role)) {
    redirect("/manage");
  }

  return session;
}

export async function requirePermission(permission: AppPermission) {
  const session = await hydrateSessionAuthorization(await requireAuth());

  if (!canAccess(session.role, session.permissions, permission)) {
    redirect("/manage");
  }

  return session;
}

export async function requireAnyPermission(
  permissions: AppPermission[]
) {
  const session = await hydrateSessionAuthorization(await requireAuth());

  if (!canAccessAny(session.role, session.permissions, permissions)) {
    redirect("/manage");
  }

  return session;
}
