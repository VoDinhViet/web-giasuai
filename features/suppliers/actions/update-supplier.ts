"use server"

import { api } from "@/lib/api"
import {
  supplierFormSchema,
  type SupplierFormInput,
} from "../schemas/supplier.schema"
import type { Supplier } from "../types"

export async function updateSupplier(
  supplierId: string,
  input: SupplierFormInput
): Promise<Supplier> {
  const reqDto = supplierFormSchema.parse(input)

  return api<Supplier>(`/api/suppliers/${supplierId}`, {
    method: "PATCH",
    body: {
      name: reqDto.name,
      email: reqDto.email || null,
      phoneNumber: reqDto.phoneNumber || null,
      address: reqDto.address || null,
    },
  })
}
