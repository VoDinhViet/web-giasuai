import type { User as CoreUser } from "@/types/user"

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type StatusFilter = "all" | UserStatus
export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

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
