import type { UserGender, UserStatus } from "../types"

export const usersPageSize = 10

export const genderLabel: Record<UserGender, string> = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
}

export const statusLabel: Record<UserStatus, string> = {
  active: "Hoạt động",
  locked: "Đã khóa",
}
