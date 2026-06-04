import { UserRole } from "../types"

const userRoleLabels = {
  [UserRole.ADMIN]: "Quản trị viên",
  [UserRole.TEACHER]: "Giáo viên",
  [UserRole.STUDENT]: "Học viên",
} satisfies Record<UserRole, string>

export function getUserRoleLabel(role: UserRole) {
  return userRoleLabels[role]
}
