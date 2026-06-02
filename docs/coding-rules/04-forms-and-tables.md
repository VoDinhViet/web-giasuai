# 4. Forms & Tables

## 4.1 DataTable & EmptyState

- Keep DataTable props minimal. Do not pass `rowLabel`, `emptyTitle`, or `emptyDescription`.
- Always render `<EmptyTable />` inside the empty block of `DataTable` for unified Vietnamese fallback.

```tsx
// ✅ GOOD
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  return <div>{data.length === 0 ? <EmptyTable /> : <TableGrid />}</div>
}
```

## 4.2 Shared DatePicker

- Put reusable composite components under `components/shared/`.
- Inherit standard HTML button props (`React.ComponentPropsWithoutRef<"button">`).

```tsx
// ✅ GOOD
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ date, onDateChange, className, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {date ? format(date, "dd/MM/yyyy") : "Chọn ngày"}
      </button>
    )
  }
)
```

## 4.3 Forms

- **Validation**: Use `zod` schemas on both Client (Form) and Server (Actions) boundaries.
- **UX**: Disable Gửi/Submit buttons while the form action is pending.
- **TanStack Form field pattern**: Render every interactive field with `<form.Field name="..." children={(field) => ...} />`.
- **Invalid state**: Derive invalid state with `field.state.meta.isTouched && !field.state.meta.isValid`.
- **Field primitives**: Wrap controls with `Field`, `FieldLabel`, optional `FieldDescription`, and `FieldError`.
- **Accessibility**: Keep `htmlFor`, `id`, `name`, and `aria-invalid` wired to the field name/state.
- **Submit handler**: Call `event.preventDefault()` and `form.handleSubmit()` in the form `onSubmit`.

```tsx
// ✅ GOOD
export function BugReportForm() {
  const form = useForm({
    defaultValues: {
      title: "",
    },
    validators: {
      onSubmit: bugReportSchema,
    },
    onSubmit: async ({ value }) => {
      await createBugReport(value)
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="title"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                />
                <FieldDescription>
                  Provide a concise title for your bug report.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <Button type="submit">Submit</Button>
    </form>
  )
}
```
