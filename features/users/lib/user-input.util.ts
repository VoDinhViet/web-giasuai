import { UserGender, UserStatus } from "../types"
import { statusLabel } from "./user-table-constants"

const userGenderValues = [
  UserGender.MALE,
  UserGender.FEMALE,
  UserGender.OTHER,
] as const

export function normalizeUserGender(value?: string): UserGender | "" {
  const normalizedGender = value?.toUpperCase()

  if (userGenderValues.includes(normalizedGender as UserGender)) {
    return normalizedGender as UserGender
  }

  return ""
}

export function getGenderLabel(value?: string): string {
  const gender = normalizeUserGender(value)

  switch (gender) {
    case UserGender.MALE:
      return "Nam"
    case UserGender.FEMALE:
      return "Nữ"
    case UserGender.OTHER:
    default:
      return "Khác"
  }
}

export function normalizeUserStatus(value?: string): UserStatus {
  const normalizedStatus = value?.toUpperCase()

  if (normalizedStatus && normalizedStatus in statusLabel) {
    return normalizedStatus as UserStatus
  }

  return UserStatus.ACTIVE
}
