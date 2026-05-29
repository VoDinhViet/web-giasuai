"use server"

import { api } from "@/lib/api"
import {
  supplierFormSchema,
  type SupplierFormInput,
} from "../schemas/supplier.schema"
import type { Supplier } from "../types"

export async function createSupplier(
  input: SupplierFormInput
): Promise<Supplier> {
  const reqDto = supplierFormSchema.parse(input)

  return api<Supplier>("/api/suppliers", {
    method: "POST",
    body: {
      name: reqDto.name,
      email: reqDto.email || undefined,
      phoneNumber: reqDto.phoneNumber || undefined,
      address: reqDto.address || undefined,
    },
  })
}
