import { createLoader, parseAsInteger, parseAsString } from "nuqs/server"

export const usersServerSearchParams = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
  role: parseAsString.withDefault("all"),
  isLocked: parseAsString.withDefault("all"),
}

export const loadUsersSearchParams = createLoader(usersServerSearchParams)

export type UsersSearchParams = Awaited<
  ReturnType<typeof loadUsersSearchParams>
>
