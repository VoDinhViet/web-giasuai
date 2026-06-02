import { UserGender } from "../types"

const genderLabels: Record<UserGender, string> = {
  [UserGender.MALE]: "Nam",
  [UserGender.FEMALE]: "Nữ",
  [UserGender.OTHER]: "Khác",
}

/**
 * Gets the Vietnamese display label for a user gender value.
 *
 * @param value - User gender value from form or API data.
 * @returns The gender display label.
 */
export function getGenderLabel(value?: string): string {
  const gender = value?.toUpperCase() as UserGender

  return genderLabels[gender] ?? "Khác"
}
