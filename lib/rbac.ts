import { AppPermission, UserRole } from "@/types/user";

export const ROLE_PERMISSIONS: Record<UserRole, AppPermission[]> = {
  [UserRole.ADMIN]: [
    "users.read",
    "users.create",
    "users.update",
    "users.delete",
    "classes.read",
    "classes.statistics.read",
    "classes.create",
    "classes.update",
    "classes.delete",
    "classes.assign_course",
    "courses.read",
    "courses.create",
    "courses.update",
    "courses.delete",
    "courses.publish",
  ],
  [UserRole.TEACHER]: [
    "classes.read",
    "classes.statistics.read",
    "classes.create",
    "classes.update",
    "classes.assign_course",
    "courses.read",
    "courses.update",
    "courses.publish",
  ],
  [UserRole.STUDENT]: ["courses.read", "classes.read"],
};

export function getPermissionsForRole(role: UserRole): AppPermission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(
  permissions: AppPermission[] | undefined,
  permission: AppPermission
) {
  return permissions?.includes(permission) ?? false;
}

export function canAccess(
  role: UserRole | undefined,
  permissions: AppPermission[] | undefined,
  permission: AppPermission
) {
  if (permissions?.includes(permission)) {
    return true;
  }

  if (!role) {
    return false;
  }

  return getPermissionsForRole(role).includes(permission);
}

export function canAccessAny(
  role: UserRole | undefined,
  permissions: AppPermission[] | undefined,
  requiredPermissions: AppPermission[]
) {
  return requiredPermissions.some((permission) =>
    canAccess(role, permissions, permission)
  );
}
