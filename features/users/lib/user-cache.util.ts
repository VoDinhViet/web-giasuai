import { revalidateTag } from "next/cache"

export const usersCacheTag = "users"

export function revalidateUsersCache() {
  revalidateTag(usersCacheTag, { expire: 0 })
}
