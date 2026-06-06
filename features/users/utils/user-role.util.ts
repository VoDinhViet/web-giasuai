import { UserRole } from "../types"

const userRoleLabels = {
  [UserRole.ADMIN]: "Quản trị viên",
  [UserRole.INSTRUCTOR]: "Giảng viên",
  [UserRole.LEARNER]: "Học viên",
} satisfies Record<UserRole, string>

export function getUserRoleLabel(role: UserRole) {
  return userRoleLabels[role]
}
