export enum UserRole {
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
  LEARNER = "LEARNER",
}

export type Permission = string

export interface Role {
  id: string
  code: string
  name: string
  description?: string
  isSystem?: boolean
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface User {
  id: string
  email: string
  username: string
  fullName: string
  role: UserRole
  permissions?: Permission[]
  isLocked: boolean
  createdAt: string
  profile: UserProfile | null
}

export interface UserProfile {
  userId: string
  phone: string | null
  location: string | null
  bio: string | null
  avatarUrl: string | null
  createdAt: string | null
  updatedAt: string | null
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type StatusFilter = "all" | UserStatus

export type UserFormMode = "create" | "edit"

export interface UserFormState {
  fullName: string
  email: string
  username: string
  password?: string
  role: UserRole
  isLocked: boolean
}
