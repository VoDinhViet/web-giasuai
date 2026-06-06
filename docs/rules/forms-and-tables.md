# Forms And Tables Rules

## Forms

- Prefer `@tanstack/react-form` for interactive forms.
- Prefer `zod` schemas for validation.
- Put form schemas under `features/<feature>/schemas`.
- Put mutations under `features/<feature>/actions`.
- Use shadcn field primitives: `Field`, `FieldLabel`, `FieldError`, `FieldGroup`.
- Validate input at action/API boundaries.
- Do not trust calculated values from the client.

## Tables

- Use `@tanstack/react-table` for data tables.
- Render table markup with shadcn/ui `Table` primitives.
- Keep column definitions near table feature code, for example `users-table-columns.tsx`.
- Keep table, filter, and pagination as separate feature components when they are specific to one table.
- Prefer names like `users-table.tsx`, `users-table-filter.tsx`, and `users-table-pagination.tsx`.
- Keep the table component responsible for table markup and the table instance.
- Keep filter UI outside the table component when it wraps the table in a card/panel.
- Keep pagination as a separate component when it has enough logic or UI controls.
- Use existing shared table components only when the behavior is genuinely reusable.
- Empty states should use existing empty primitives/components.
- Avoid unnecessary intermediate wrapper components such as `UsersTablePanel` when the page can compose `Card`, filter, and table directly.

## Search Params

- Put search param parsers under `features/<feature>/lib`.
- Use `nuqs` for client-side query state.
- Keep pending state at the nearest useful parent when multiple controls need it.
- Avoid context/hook wrappers when `useQueryStates` directly in the component is enough.
- If filter and pagination both need the same transition pending state, keep `useTransition` in the nearest parent page component and pass `isPending` and `startTransition` down.
- Let filter and pagination call `useQueryStates` directly with the shared `startTransition`.
- Do not create a context/provider only to wrap `useQueryStates` for one table.
- Reset `page` to `1` when changing filters or page size.

```tsx
const [isPending, startTransition] = useTransition()

<UsersTableFilter
  isPending={isPending}
  startTransition={startTransition}
/>
<UsersTable
  users={users}
  pagination={pagination}
  isPending={isPending}
  startTransition={startTransition}
/>
```

```tsx
const [filters, setFilters] = useQueryStates(usersSearchParams, {
  shallow: false,
  startTransition,
})
```
