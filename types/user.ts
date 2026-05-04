export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type AppPermission =
  | "users.read"
  | "users.create"
  | "users.update"
  | "users.delete"
  | "classes.read"
  | "classes.statistics.read"
  | "classes.create"
  | "classes.update"
  | "classes.delete"
  | "classes.assign_course"
  | "courses.read"
  | "courses.create"
  | "courses.update"
  | "courses.delete"
  | "courses.publish";

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: UserRole;
  isLocked: boolean;
  permissions?: AppPermission[];
}
