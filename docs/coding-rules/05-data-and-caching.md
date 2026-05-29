# 5. Data Caching & Revalidation

## 5.1 Next.js 16 Caching Rules
*   **Dynamic by Default**: All fetches are dynamic by default. Cache is strictly opt-in.
*   **Use Caching Directive**: Place `"use cache";` inside the function or component.
*   **Session Isolation**: Next.js generates cache keys based on arguments. **Always pass `userId` as an argument to cached functions** to prevent session data leakage.

```typescript
// ✅ GOOD (Isolated by argument)
export async function getCachedUsers(userId: string) {
  "use cache";
  return db.user.findMany({ where: { ownerId: userId } })
}
```

## 5.2 Invalidation
*   **`revalidateTag(tag)`**: Purges the cache tag inside Server Actions.
*   **`updateTag(tag)`**: Purges and fetches fresh data in the same request (Read-Your-Writes).

```typescript
// ✅ GOOD (Invalidation in action)
import { revalidateTag } from "next/cache"

export async function toggleUserStatus(userId: string, active: boolean) {
  await db.user.update({ where: { id: userId }, data: { active } })
  revalidateTag("users")
}
```
