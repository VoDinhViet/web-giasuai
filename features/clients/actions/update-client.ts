"use server"

import { api } from "@/lib/api"
import { omitEmptyFields } from "@/lib/object.util"
import {
  clientFormSchema,
  type ClientFormInput,
} from "../schemas/client.schema"
import { ClientType, type Client } from "../types"

export async function updateClient(
  clientId: string,
  input: ClientFormInput
): Promise<Client> {
  const reqDto = clientFormSchema.parse(input)

  return api<Client>(`/api/clients/${clientId}`, {
    method: "PATCH",
    body: omitEmptyFields({
      fullName: reqDto.fullName,
      email: reqDto.email,
      phoneNumber: reqDto.phoneNumber,
      clientType: reqDto.clientType,
      taxCode: reqDto.taxCode,
      companyName:
        reqDto.clientType === ClientType.COMPANY
          ? reqDto.companyName
          : undefined,
      address: reqDto.address,
    }),
  })
}
