export enum ProductItemType {
  FG = "fg",
  WIP = "wip",
  RM = "rm",
  CONSUMABLE = "consumable",
}

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  LOCKED = "locked",
}

export type ProductOption = {
  id: string
  code: string
  name: string
}

export type ProductBomOption = ProductOption & {
  itemType: ProductItemType
  unit: ProductOption | null
}

export type ProductClient = {
  id: string
  code: string
  fullName: string
}

export type ProductRevision = {
  id: string
  productId: string
  revisionNo: string
  note: string | null
  createdAt: string
  updatedAt: string
}

export type Product = {
  id: string
  code: string
  name: string
  itemType: ProductItemType
  status: ProductStatus
  imageUrl: string | null
  note: string | null
  unit: ProductOption | null
  client: ProductClient | null
  currentRevision: ProductRevision | null
  createdAt: string
  updatedAt: string
}

export type ProductFormOptions = {
  clients: ProductClient[]
  operations: ProductOption[]
  products: ProductBomOption[]
  suppliers: ProductOption[]
  units: ProductOption[]
}

export type BomLine = {
  id: string
  productRevisionId: string
  parentItemId: string
  childItemId: string
  qty: string
  unitId: string
  unit: ProductOption | null
  scrapRate: string
  sortOrder: number
  note: string | null
  createdAt: string
  updatedAt: string
}

export type BomTreeNode = {
  id: string
  bomLineId: string | null
  productId: string
  parentItemId: string | null
  code: string
  name: string
  imageUrl: string | null
  itemType: ProductItemType
  qty: string
  unit: ProductOption
  level: number
  sortOrder: number
  hasRouting: boolean
  children: BomTreeNode[]
}

export type RoutingStep = {
  id: string
  productRevisionId: string
  itemId: string
  operationId: string
  operation: ProductOption | null
  stepNo: number
  isOutsideProcess: boolean
  defaultSupplierId: string | null
  defaultSupplier: ProductOption | null
  note: string | null
  createdAt: string
  updatedAt: string
}
