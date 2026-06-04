import { getUserStats } from "@/features/users/actions/get-user-stats"
import { getUsers } from "@/features/users/actions/get-users"
import { UsersPage } from "@/features/users/components/pages/users-page"
import { loadUsersSearchParams } from "@/features/users/lib/load-users-search-params"

export const dynamic = "force-dynamic"

export default async function UsersRoute({
  searchParams,
}: PageProps<"/manage/users">) {
  const usersSearchParams = await loadUsersSearchParams(searchParams)
  const [{ data: users, pagination }, stats] = await Promise.all([
    getUsers(usersSearchParams),
    getUserStats(),
  ])

  return <UsersPage users={users} pagination={pagination} stats={stats} />
}
