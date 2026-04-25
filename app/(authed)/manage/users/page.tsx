import { UserClientPage } from "@/features/users/components/UserClientPage";
import { getUsers } from "@/features/users/actions/get-users";
import { usersSearchParams } from "@/features/users/schemas/users-search-schema";
import { createSearchParamsCache } from "nuqs/server";

const searchParamsCache = createSearchParamsCache(usersSearchParams);

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UsersManagePage({ searchParams }: PageProps) {
  const params = searchParamsCache.parse(await searchParams);
  const result = await getUsers(params);

  return <UserClientPage users={result.data} pagination={result.pagination} />;
}
