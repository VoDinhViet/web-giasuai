import type { User as CoreUser } from "@/types/user"

export type UserStatus = "active" | "locked"
export type StatusFilter = "all" | UserStatus
export type UserGender = "male" | "female" | "other"

export type User = CoreUser

export type UserFormMode = "create" | "edit"

export type UserFormState = {
  fullName: string
  email: string
  password?: string
  phoneNumber?: string
  birthDate?: string
  gender?: UserGender
  roleId?: string
  address?: string
}
