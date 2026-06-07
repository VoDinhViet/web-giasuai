export type Nullable<T> = T | null

/** Các trường audit chung: id, createdAt, updatedAt */
export interface AuditFields {
  id: string
  createdAt: string
  updatedAt: string
}
