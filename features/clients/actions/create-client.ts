"use server"

import { api } from "@/lib/api"
import {
  clientFormSchema,
  type ClientFormInput,
} from "../schemas/client.schema"
import { ClientType, type Client } from "../types"

export async function createClient(input: ClientFormInput): Promise<Client> {
  const reqDto = clientFormSchema.parse(input)

  return api<Client>("/api/clients", {
    method: "POST",
    body: {
      fullName: reqDto.fullName,
      email: reqDto.email,
      phoneNumber: reqDto.phoneNumber,
      clientType: reqDto.clientType,
      taxCode: reqDto.taxCode || undefined,
      companyName:
        reqDto.clientType === ClientType.COMPANY
          ? reqDto.companyName || undefined
          : undefined,
      address: reqDto.address || undefined,
    },
  })
}
