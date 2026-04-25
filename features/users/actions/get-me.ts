"use server";

import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import { getPermissionsForRole } from "@/lib/rbac";
import type { User } from "@/types/user";

export async function getMe(): Promise<User | null> {
  try {
    const [user, session] = await Promise.all([
      api<User>("/api/v1/users/me"),
      getSession(),
    ]);

    const role = user.role ?? session.role;

    if (!role) {
      return null;
    }

    return {
      ...user,
      role,
      permissions:
        user.permissions ??
        session.permissions ??
        getPermissionsForRole(role),
    };
  } catch {
    return null;
  }
}
