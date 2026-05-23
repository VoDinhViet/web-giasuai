export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type Permission = string;

export type Role = {
  id: string;
  code: string;
  name: string;
  description?: string;
  isSystem?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface User {
  id: string;
  email: string;
  fullName: string;
  roleId?: string;
  status?: string;
  role: Role;
  permissions?: Permission[];
  createdAt?: string;
  updatedAt?: string;

  // Optional fields for UI compatibility
  userId?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
  position?: string;
  address?: string;
  password?: string;
}
