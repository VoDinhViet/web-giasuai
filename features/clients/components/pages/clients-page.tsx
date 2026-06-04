import type { Pagination } from "@/types/api"
import type { Client } from "../../types"
import { ClientsTable } from "../tables/clients-table"

type ClientsPageProps = {
  clients: Client[]
  pagination: Pagination
}

export function ClientsPage({ clients, pagination }: ClientsPageProps) {
  return <ClientsTable clients={clients} pagination={pagination} />
}
