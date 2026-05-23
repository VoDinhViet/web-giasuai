import { getUsers } from "@/features/users/actions/get-users"
import { UsersPage as UsersFeaturePage } from "@/features/users/components/users-page"
import { loadUsersSearchParams } from "@/features/users/lib/load-users-search-params"

type UsersRoutePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const dynamic = "force-dynamic"

export default async function UsersPage({
  searchParams,
}: UsersRoutePageProps) {
  const usersSearchParams = await loadUsersSearchParams(searchParams)
  const { data: users, pagination } = await getUsers(usersSearchParams)

  return <UsersFeaturePage users={users} pagination={pagination} />
}
