# 4. Forms & Tables

## 4.1 DataTable & EmptyState
*   Keep DataTable props minimal. Do not pass `rowLabel`, `emptyTitle`, or `emptyDescription`.
*   Always render `<EmptyTable />` inside the empty block of `DataTable` for unified Vietnamese fallback.

```tsx
// ✅ GOOD
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  return <div>{data.length === 0 ? <EmptyTable /> : <TableGrid />}</div>
}
```

## 4.2 Shared DatePicker
*   Put reusable composite components under `components/shared/`.
*   Inherit standard HTML button props (`React.ComponentPropsWithoutRef<"button">`).

```tsx
// ✅ GOOD
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ date, onDateChange, className, ...props }, ref) => {
    return <button ref={ref} {...props}>{date ? format(date, "dd/MM/yyyy") : "Chọn ngày"}</button>
  }
)
```

## 4.3 Forms
*   **Validation**: Use `zod` schemas on both Client (Form) and Server (Actions) boundaries.
*   **UX**: Disable Gửi/Submit buttons while the form action is pending.

```tsx
// ✅ GOOD
export function CreateUserForm() {
  const [isPending, startTransition] = React.useTransition()
  const handleSubmit = (values: FormValues) => {
    startTransition(async () => { await createUser(values) })
  }
  return <form onSubmit={...}><Button type="submit" disabled={isPending}>Submit</Button></form>
}
```
