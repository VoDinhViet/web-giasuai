import { UserGender } from "../types"

const genderLabels: Record<UserGender, string> = {
  [UserGender.MALE]: "Nam",
  [UserGender.FEMALE]: "Nữ",
  [UserGender.OTHER]: "Khác",
}

export function getGenderLabel(value?: string): string {
  const gender = value?.toUpperCase() as UserGender

  return genderLabels[gender] ?? "Khác"
}
