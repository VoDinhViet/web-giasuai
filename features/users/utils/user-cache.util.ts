import { revalidateTag } from "next/cache"

export const usersCacheTag = "users"

/**
 * Revalidates cached user list data.
 *
 * @returns Nothing.
 */
export function revalidateUsersCache() {
  revalidateTag(usersCacheTag, { expire: 0 })
}
