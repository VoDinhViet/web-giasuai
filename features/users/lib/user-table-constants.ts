import { UserStatus } from "../types"

export const usersPageSize = 10

export const statusLabel: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "Hoạt động",
  [UserStatus.INACTIVE]: "Ngừng hoạt động",
}
