# Architecture Rules

## Stack

- Next.js App Router, TypeScript, React, Tailwind CSS v4, shadcn/ui.
- Route files stay under `app`.
- Use Server Components by default.
- Add `"use client"` only when hooks, browser APIs, event handlers, or client-side state are required.

## Folders

- `app/`: App Router route files, layouts, loading states.
- `features/<feature>/`: feature-specific actions, components, constants, hooks, lib, schemas, utils, and types.
- `components/ui/`: shadcn/ui primitives only.
- `components/shared/`: shared composed components used across features.
- `components/`: app-level shared components such as sidebar/topbar.
- `lib/`: global utilities, API client, auth/session helpers, framework helpers, integration helpers.
- `types/`: shared cross-feature types.

## Feature Shape

- Put Server Actions in `features/<feature>/actions`.
- Put schemas in `features/<feature>/schemas`.
- Put feature constants in `features/<feature>/constants`.
- Put feature-only utilities in `features/<feature>/utils` only when global `lib` utilities cannot represent the behavior.
- Group feature components by role when a feature grows: `pages`, `forms`, `tables`, `dialogs`, `actions`, or domain groups.
- For compact features, feature components may stay directly under `features/<feature>/components` with clear names such as `users-page.tsx`, `users-table.tsx`, `users-table-filter.tsx`, and `users-table-pagination.tsx`.
- Do not add a folder layer only to satisfy a generic pattern when the feature is still small and names are already clear.

## App Router Props

- For route pages that receive `params` or `searchParams`, use generated `PageProps<"/route">`.
- Route string must be URL path, not file path.
- Omit route groups such as `(auth)` and `(authed)`.
- Do not hand-write `params` or `searchParams` prop types.

```tsx
export default async function UsersRoute({
  searchParams,
}: PageProps<"/manage/users">) {
  // ...
}
```

## List Pages

- Keep App Router route files as Server Components when loading list data.
- Parse `searchParams` with a feature loader from `features/<feature>/lib`.
- Load list data and summary stats with `Promise.all` when independent.
- Pass typed data into the feature page component.
- Use `export const dynamic = "force-dynamic"` when the page depends on fresh query/auth state.

```tsx
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
```
