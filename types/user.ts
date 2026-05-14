export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type Permission = "*" | "courses:read" | "courses:write";

export interface User {
  id: string;
  fullName?: string;
  username?: string;
  email?: string;
  role: UserRole;
  permissions?: Permission[];
}
