export enum OrderStatus {
  PENDING_APPROVAL = "pending_approval",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export type OrderClient = {
  id: string
  code: string
  fullName: string
  email: string | null
  phoneNumber: string | null
  taxCode: string | null
  companyName: string | null
  address: string | null
}

export type OrderProductFile = {
  id: string
  productId: string
  fileType: string
  originalName: string
  fileName: string
  mimeType: string | null
  fileSize: number | null
  filePath: string
  url: string
  createdAt: string
}

export type OrderItem = {
  id: string
  productId: string
  productCode: string
  productName: string
  unit: string
  quantity: number
  unitPrice: number
  lineTotal: number
  imageUrl: string | null
  technicalFiles: OrderProductFile[]
}

export type OrderFile = {
  id: string
  orderId: string
  fileType: string
  originalName: string
  fileName: string
  mimeType: string | null
  fileSize: number | null
  filePath: string
  url: string
  createdAt: string
}

export type Order = {
  id: string
  client: OrderClient
  code: string
  prNumber: string
  dueDate: string
  note: string | null
  vatRate: number
  subTotal: number
  vatAmount: number
  totalAfterVat: number
  status: OrderStatus
  approvedBy: string | null
  approvedAt: string | null
  rejectedBy: string | null
  rejectedAt: string | null
  rejectedReason: string | null
  items: OrderItem[]
  files: OrderFile[]
  createdAt: string
  updatedAt: string
}

export type OrderProductOption = {
  id: string
  code: string
  name: string
  unit: string | null
  defaultSalePrice: number
  technicalFiles: OrderProductFile[]
}

export type OrderFormOptions = {
  clients: OrderClient[]
  products: OrderProductOption[]
}

export type OrderStatusFilter = "all" | OrderStatus
