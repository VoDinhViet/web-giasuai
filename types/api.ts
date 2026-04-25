export type ActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export type Nullable<T> = T | null;

export type PaginationInfo = {
  limit: number;
  currentPage: number;
  nextPage: Nullable<number>;
  previousPage: Nullable<number>;
  totalRecords: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationInfo;
};

export interface AuditFields {
  id: string;
  createdAt: string;
  updatedAt: string;
}
