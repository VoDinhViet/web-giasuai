import { getClients } from "@/features/clients/actions/get-clients"
import { ClientsPage } from "@/features/clients/components/clients-page"
import { loadClientsSearchParams } from "@/features/clients/lib/load-clients-search-params"

export const dynamic = "force-dynamic"

export default async function ClientsRoute({
  searchParams,
}: PageProps<"/manage/clients">) {
  const clientsSearchParams = await loadClientsSearchParams(searchParams)
  const { data: clients, pagination } = await getClients(clientsSearchParams)

  return <ClientsPage clients={clients} pagination={pagination} />
}
