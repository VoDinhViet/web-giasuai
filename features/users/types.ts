import type { AuditFields, Nullable } from "@/types/common"

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

export interface User extends AuditFields {
  email: string
  username: string
  fullName: string
  role: UserRole
  permissions?: Permission[]
  isLocked: boolean
  profile: Nullable<UserProfile>
}

export interface UserProfile {
  userId: string
  phone: Nullable<string>
  location: Nullable<string>
  bio: Nullable<string>
  avatarUrl: Nullable<string>
  createdAt: Nullable<string>
  updatedAt: Nullable<string>
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
