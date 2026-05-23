export type ActionResponse<T = unknown> =
  | {
      success: true;
      data?: T;
      message?: string;
    }
  | {
      success: false;
      message: string;
    };

export interface Pagination {
  limit: number;
  currentPage: number;
  nextPage: number;
  previousPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
