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
- **Invalid state**: Derive invalid state with `field.state.meta.isTouched && field.state.meta.errors.length > 0`.
- **Field primitives**: Wrap controls with `Field`, `FieldLabel`, optional `FieldDescription`, and `FieldError`.
- **Field errors**: Render `<FieldError errors={field.state.meta.errors} />`; do not manually map errors to strings in the page unless the control needs custom copy.
- **Accessibility**: Keep `htmlFor`, `id`, `name`, and `aria-invalid` wired to the field name/state.
- **Submit handler**: Call `event.preventDefault()` and `form.handleSubmit()` in the form `onSubmit`.
- **No feature wrappers in UI primitives**: Do not add form-specific helper exports to `components/ui/field.tsx`. Keep required labels or small one-page helpers local to the feature component.
- **Feedback state**: Prefer a single feedback state such as `{ type: "error" | "success"; message: string }` when one area displays multiple form messages.

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
              field.state.meta.isTouched && field.state.meta.errors.length > 0

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

## 4.4 File Upload Fields

- File upload behavior usually differs by feature (preview, file type, max size, server upload timing, persisted asset URLs, replace/delete behavior). Do not create a generic `components/ui/file-upload.tsx` for all upload cases by default.
- Implement upload controls inside the owning feature/page or a domain-specific feature component, for example `features/products/components/media/product-image-field.tsx`.
- When an upload field belongs to a TanStack form, make it a real form field: use `<form.Field name="...">`, store `File | null` in `field.state.value`, and update it with `field.handleChange(file)`.
- Use `react-dropzone` for drag/drop upload interactions. Keep accept rules, max size, local preview, clear behavior, and rejection messages close to the upload control.
- Local previews should use `URL.createObjectURL(file)` and must revoke the URL on replace, clear, or unmount.
- Do not serialize `File` objects into localStorage, JSON payloads, or draft objects. Store only restorable metadata such as `fileName` if needed.

```tsx
// GOOD: feature-specific file field wired to TanStack Form
<form.Field name="logoFile">
  {(field) => {
    const isInvalid =
      field.state.meta.isTouched && field.state.meta.errors.length > 0

    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>Logo</FieldLabel>
        <LogoDropzone
          inputId={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={field.handleChange}
        />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    )
  }}
</form.Field>
```

## 4.5 Form Drafts

- Put feature-specific draft behavior in `features/<feature>/hooks`, for example `use-supplier-create-draft.ts`.
- Draft hooks should own reading, writing, clearing, and validating draft data.
- Validate draft data with a dedicated Zod schema before applying it to a form.
- Load valid draft values with `form.reset(...)`.
- Clear the draft after a successful create/update action.
- Use global storage utilities from `lib/storage.util.ts` for JSON storage access. Do not duplicate `localStorage.setItem(...JSON.stringify(...))` in pages.
