import { getRoles } from "@/features/users/actions/get-roles"
import { getUsers } from "@/features/users/actions/get-users"
import { UsersPage } from "@/features/users/components/users-page"
import { loadUsersSearchParams } from "@/features/users/lib/load-users-search-params"

export const dynamic = "force-dynamic"

export default async function UsersRoute({
  searchParams,
}: PageProps<"/manage/users">) {
  const usersSearchParams = await loadUsersSearchParams(searchParams)
  const [{ data: users, pagination }, roles] = await Promise.all([
    getUsers(usersSearchParams),
    getRoles(),
  ])

  return <UsersPage users={users} roles={roles} pagination={pagination} />
}
