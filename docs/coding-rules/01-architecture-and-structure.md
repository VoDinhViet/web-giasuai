# 1. Architecture & Structure

## 1.1 Folder Organization

- Route files -> `app/`
- Feature-specific code -> `features/<feature-name>/`
- Global composed components -> `components/shared/`
- shadcn/ui primitives -> `components/ui/`
- Global pure utilities, framework helpers, API, auth, session, and integration helpers -> `lib/`
- Shared domain types -> `types/`

```
├── app/
│   └── (authed)/manage/users/page.tsx
├── components/
│   ├── shared/
│   │   └── data-table.tsx
│   └── ui/
│       └── button.tsx
├── features/
│   └── users/
│       ├── actions/
│       │   └── get-users.ts
│       ├── components/
│       │   └── users-table.tsx
│       ├── constants/
│       │   └── user-table-constants.ts
│       ├── hooks/
│       │   └── use-roles.ts
│       ├── lib/
│       │   └── load-users-search-params.ts
│       ├── schemas/
│       │   └── user.schema.ts
│       ├── utils/
│       │   └── user-gender.util.ts
│       └── types.ts
├── lib/
│   ├── date.util.ts
│   ├── enum.util.ts
│   ├── number.util.ts
│   ├── select-option.util.ts
│   ├── string.util.ts
│   ├── api.ts
│   ├── session.ts
│   └── utils.ts
├── types/
│   └── user.ts
```

## 1.2 Folder Responsibility

- `features/<feature>/actions`: Server Actions and feature data mutations/queries.
- `features/<feature>/components`: Feature-specific React components.
- `features/<feature>/constants`: Feature-specific labels, options, table constants, and static configuration.
- `features/<feature>/hooks`: Feature-specific React hooks.
- `features/<feature>/lib`: Feature-specific loaders, parsers, adapters, and integration code.
- `features/<feature>/schemas`: Zod schemas and form input types.
- `features/<feature>/utils`: Feature-only pure utility functions that cannot be covered by global utilities in `lib`. File names must end with `*.util.ts`.
- `lib`: Global pure utilities, framework helpers, API, auth, session, RBAC, integration helpers, and compatibility entrypoints such as `lib/utils.ts`. Keep `cn` implemented directly in `lib/utils.ts`. Check this folder before creating any feature utility.

Use existing global utilities in `lib` first. Do not create feature wrappers around global utilities. Create a feature utility only when the behavior depends on that feature's domain types, labels, cache tags, or business rules. Promote a helper to `lib` when at least two features can reuse it.

## 1.3 AI Tooling (CodeGraph)

- **Ignore Database**: Add `.codegraph/` to `.gitignore`. Never commit it.
- **Commands**:
  - Init: `npx codegraph init`
  - Sync: `npx codegraph sync`
  - Reset: `npx codegraph index --force`

## 1.4 App Router Page Props

- Use generated `PageProps<"/route">` for every `app/**/page.tsx` that receives `params` or `searchParams`.
- The route string must be the URL path, not the file-system path. Omit route groups such as `(auth)` and `(authed)`.
- Do not hand-write `params` or `searchParams` prop types in route files.

```tsx
// GOOD
export default async function UsersRoute({
  searchParams,
}: PageProps<"/manage/users">) {
  const usersSearchParams = await loadUsersSearchParams(searchParams)
}

export default async function ProductRoute({
  params,
}: PageProps<"/manage/products/[productId]">) {
  const { productId } = await params
}
```
