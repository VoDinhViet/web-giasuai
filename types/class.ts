import { User } from "./user";

export interface Class {
  id: string;
  name: string;
  code: string;
  inviteCode: string;
  teacherId: string;
  teacher: User;
  description: string;
  isActive: boolean;
  createdAt: string;
  studentCount?: number;
  thumbnail?: string;
}

export interface ClassStatistics {
  totalClasses: number;
  activeClasses: number;
  pausedClasses: number;
  totalStudents: number;
}
