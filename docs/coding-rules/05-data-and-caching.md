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

## 5.3 Server Actions

- Server Actions are runtime boundaries. Validate input inside the action with the feature Zod schema even when the caller already has TypeScript types.
- Put `try/catch` inside mutation actions and return `ActionResponse<T>` (`success`, `data`, `message`) instead of forcing pages to catch thrown API errors.
- Pages and client components should consume the action result and render feedback; they should not duplicate action-level API error handling.
- Always wrap mutation API `body` objects with `omitEmptyFields` from `@/lib/object.util` before sending data to the API. This is mandatory for create, update, patch, upload metadata, and any action that sends a JSON body.
- Do not map empty strings to `undefined` one by one in API bodies. Put the DTO fields inside `omitEmptyFields({ ... })` instead.

```ts
// GOOD
export async function createSupplier(
  input: SupplierFormInput
): Promise<ActionResponse<Supplier>> {
  try {
    const reqDto = supplierFormSchema.parse(input)
    const supplier = await api<Supplier>("/api/suppliers", {
      method: "POST",
      body: omitEmptyFields({
        name: reqDto.name,
        email: reqDto.email,
        phoneNumber: reqDto.phoneNumber,
      }),
    })

    return {
      success: true,
      data: supplier,
    }
  } catch (error) {
    console.error("Create supplier error:", error)

    return {
      success: false,
      message: "Không thể tạo nhà cung cấp. Vui lòng thử lại.",
    }
  }
}
```
