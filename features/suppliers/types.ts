export type SupplierType = "INDIVIDUAL" | "COMPANY" | "HOUSEHOLD"

export type SupplierGroup = {
  id: string
  name: string
}

export type Supplier = {
  id: string
  code: string
  name: string
  supplierGroupId: string
  supplierGroup: SupplierGroup | null
  supplierType: SupplierType
  taxCode: string
  email: string | null
  phoneNumber: string | null
  representativeName: string | null
  representativePhone: string | null
  address: string | null
  note: string | null
  createdAt: string
  updatedAt: string
}
