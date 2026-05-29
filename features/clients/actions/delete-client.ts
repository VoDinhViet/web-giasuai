"use server"

import { api } from "@/lib/api"

export async function deleteClient(clientId: string): Promise<void> {
  await api(`/api/clients/${clientId}`, {
    method: "DELETE",
  })
}
