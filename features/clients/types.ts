export enum ClientType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
}

export type ClientTypeFilter = "all" | ClientType

export type Client = {
  id: string
  fullName: string
  code: string
  email: string
  phoneNumber: string
  clientType: ClientType | string
  taxCode?: string
  companyName?: string
  address?: string
}
