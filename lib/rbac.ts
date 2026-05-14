import { type Permission, UserRole } from "@/types/user";

const permissionsByRole: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: ["*"],
  [UserRole.TEACHER]: ["courses:read", "courses:write"],
  [UserRole.STUDENT]: ["courses:read"],
};

export function getPermissionsForRole(role: UserRole): Permission[] {
  return permissionsByRole[role] ?? [];
}
