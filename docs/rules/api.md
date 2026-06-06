# API Rules

## Placement

- Put shared API helpers under `lib`, such as `lib/api.ts`.
- Put feature API calls and Server Actions under `features/<feature>/actions`.
- Put feature-only loaders, parsers, adapters, and query param helpers under `features/<feature>/lib`.
- Do not create feature wrappers around global utilities from `lib`.
- Route files under `app` should call feature actions/loaders; avoid putting API details directly in route files.

## Server Actions

- Server Actions are runtime boundaries.
- Validate all input inside the action with the feature schema, even when caller code already has TypeScript types.
- Name parsed request DTOs `reqDto`.
- Mutation actions should use `try/catch` and return `ActionResponse<T>` instead of forcing pages/components to catch API errors.
- Client components should consume action results and render feedback; they should not duplicate action-level API error handling.
- User-facing error messages must be Vietnamese and practical.
- Developer logs should be short English messages.

```ts
export async function createSupplier(
  input: SupplierFormInput
): Promise<ActionResponse<Supplier>> {
  try {
    const reqDto = supplierFormSchema.parse(input)

    const supplier = await api<Supplier>("/api/v1/suppliers", {
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
      message: "Đã tạo nhà cung cấp.",
    }
  } catch (createSupplierError) {
    console.error("Create supplier error:", createSupplierError)

    return {
      success: false,
      message: "Không thể tạo nhà cung cấp.",
    }
  }
}
```

## Request Bodies

- Always wrap mutation API `body` objects with `omitEmptyFields` from `@/lib/object.util` before sending JSON data.
- This applies to create, update, patch, upload metadata, and any mutation action that sends a JSON body.
- Do not map empty strings to `undefined` field by field.
- Put DTO fields directly inside `omitEmptyFields({ ... })`.
- Do not trust calculated values from the client; recalculate or validate at the server boundary.

```ts
body: omitEmptyFields({
  fullName: reqDto.fullName,
  phone: reqDto.phone,
  location: reqDto.location,
})
```

## Auth And Authorization

- Enforce permission checks at Server Action boundaries.
- Never rely only on client-side hiding for authorization.
- Do not expose secrets, tokens, passwords, password hashes, connection strings, or private keys in API responses.
- Use authenticated API helpers from `lib` rather than repeating auth header logic inside feature actions.

## Caching And Revalidation

- Fetches are dynamic by default; cache is opt-in.
- Use `"use cache";` inside cached functions/components only when data is safe to cache.
- Cached functions must include isolation arguments such as `userId` when data is user-specific.
- Use `revalidateTag(tag)` inside actions when a mutation should purge cached data.
- Use `updateTag(tag)` when the same request needs fresh read-after-write behavior.

```ts
export async function getCachedUsers(userId: string) {
  "use cache"

  return db.user.findMany({ where: { ownerId: userId } })
}
```

## Responses

- Query actions may return typed data directly when pages can handle empty/error states separately.
- Mutation actions should return `ActionResponse<T>` with `success`, optional `data`, and `message`.
- Keep response types in `types` when shared across features.
- Keep feature-only response types in `features/<feature>/types.ts`.

## Error Handling

- Log errors once at the action boundary.
- Use generic user-facing fallback messages unless product requirements need status-specific copy.
- Avoid leaking backend exception text to users.
- Avoid throwing mutation errors into client components when a recoverable `ActionResponse` is enough.

## Verification

- For API helpers, Server Actions, schemas, auth, routing, or module wiring changes, run:

```bash
pnpm typecheck
```

- If the change affects UI feedback or form behavior, also run:

```bash
pnpm lint
```
