import { User } from "@/types/user";
import { Nullable, AuditFields } from "@/types/api";

export interface Class extends AuditFields {
  name: string;
  code: string;
  inviteCode: string;
  teacherId: Nullable<string>;
  description: Nullable<string>;
  isActive: boolean;
  
  // Optional relation if joined in API
  teacher?: User;
  
  // Computed fields often used in UI
  studentCount?: number;
  courseCount?: number;
}

export interface CreateClassInput {
  name: string;
  code: string;
  inviteCode: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateClassInput extends Partial<CreateClassInput> {
  id: string;
}
