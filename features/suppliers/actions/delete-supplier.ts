"use server"

import { api } from "@/lib/api"

export async function deleteSupplier(supplierId: string): Promise<void> {
  await api(`/api/suppliers/${supplierId}`, {
    method: "DELETE",
  })
}
