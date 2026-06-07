import { UserRole, type Permission } from "@/features/users/types"

export const WILDCARD_PERMISSION = "*"

export const permissionsByRole = {
  [UserRole.ADMIN]: [WILDCARD_PERMISSION],
  [UserRole.INSTRUCTOR]: [
    "classes:read",
    "classes:write",
    "courses:read",
    "courses:write",
    "users:read",
  ],
  [UserRole.LEARNER]: ["classes:read", "courses:read"],
} as const satisfies Record<UserRole, readonly Permission[]>
