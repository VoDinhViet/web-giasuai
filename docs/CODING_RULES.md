# Coding Rules

## 1. Project Stack

- Use Next.js App Router with TypeScript and React.
- Use shadcn/ui components from `@/components/ui`.
- Use Tailwind CSS v4 with design tokens defined in `app/globals.css`.
- Use `cn` from `@/lib/utils` when merging conditional class names.
- Use path aliases from `components.json`, especially:
  - `@/components`
  - `@/components/ui`
  - `@/lib`
  - `@/hooks`

## 2. File And Folder Structure

- Put route files under `app`.
- Put reusable UI primitives under `components/ui`.
- Put shared app components under `components`.
- Put feature-specific code under `features/<feature-name>`.
- Put shared utilities under `lib`.
- Put shared types under `types`.
- Keep feature logic close to the feature folder when it is not reused globally.

## 3. shadcn/ui Rules

- Prefer existing shadcn/ui components before creating custom UI.
- Import shadcn/ui components from `@/components/ui/<component>`.
- Add missing shadcn/ui components with:

```bash
pnpm.cmd dlx shadcn@latest add <component-name>
```

- Do not manually copy shadcn component source from the website unless the CLI cannot be used.
- Do not change global shadcn component behavior for one screen only.
- If a one-off style is needed, pass `className` from the consuming component.
- When using shadcn/ui components, do not override built-in `bg-*` or `rounded-*` classes unless a clear product requirement needs it.
- Modify files in `components/ui` only when the change should apply globally.
- Keep shadcn component APIs compatible with their existing local usage.
- Use `data-slot`, `data-*`, variants, and `className` patterns already present in local shadcn components.

## 4. Styling Rules

- Prefer semantic tokens: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-muted-foreground`, `bg-card`.
- Avoid hardcoded colors unless matching an existing brand token or legacy local style.
- Use `className={cn(...)}` for conditional classes.
- Keep layouts responsive with Tailwind utilities.
- Prefer spacing, sizing, and radius patterns already used in the project.
- Prefer `rounded` or existing component radius defaults instead of large radius utilities such as `rounded-2xl`, unless a clear product requirement needs it.
- Do not create nested cards unless the UI pattern clearly requires it.
- Use visible focus states and do not remove accessibility styles from shadcn components.
- Keep dark mode in mind when adding colors.

## 5. Component Rules

- Use Server Components by default.
- Add `"use client"` only when the component uses hooks, browser APIs, form state, client-side routing state, or event handlers.
- Keep page components thin; move complex UI or behavior into feature components.
- Name components with PascalCase, but name their files with kebab-case (e.g., `create-user-dialog.tsx` containing `export function CreateUserDialog() {}`).
- Name files consistently using kebab-case.
- Keep props typed with clear names.
- Avoid vague variable names like `data`, `item`, `record`, `tmp`, `obj`, `val`, and `arr`.
- Use entity-specific names such as `userId`, `employeeId`, `roleId`, and `orderId`.

## 6. Form Rules

- Prefer `@tanstack/react-form` for interactive forms.
- Prefer `zod` schemas for validation.
- Put form schemas under `features/<feature>/schemas`.
- Put server actions under `features/<feature>/actions`.
- Use shadcn field primitives such as `Field`, `FieldLabel`, `FieldError`, and `FieldGroup` when building forms.
- Disable submit buttons while pending or submitting.
- Show field-level validation errors near the related input.
- Use `noValidate` on forms when custom validation handles errors.
- Do not trust calculated values from the client.

## 7. Buttons, Icons, And Actions

- Use `Button` from `@/components/ui/button`.
- Use `variant` and `size` before adding custom button classes.
- Use icon button sizes like `icon`, `icon-sm`, or `icon-lg` for icon-only actions.
- Prefer lucide icons for new UI because `components.json` configures `lucide` as the icon library.
- Keep existing Tabler icons unless changing that component for a specific reason.
- Add accessible labels for icon-only buttons with `aria-label` or visible context.

## 8. Data And API Rules

- Keep API access helpers in `lib` or feature-specific action files.
- Keep shared API response types in `types`.
- Validate input at boundaries.
- Do not expose secrets, tokens, passwords, password hashes, connection strings, or private keys.
- Do not run database migrations or destructive operations without explicit approval.
- Use parameterized APIs, ORM APIs, or query builders instead of raw string SQL from user input.

## 9. Authentication And Authorization

- Reuse existing session and RBAC utilities from `lib/session.ts` and `lib/rbac.ts`.
- Do not duplicate auth checks across components when a shared helper exists.
- Keep protected business actions on the server side.
- Redirect unauthenticated users from route-level or server action boundaries where appropriate.

## 10. Copy And Language

- User-facing text should be Vietnamese unless the existing screen uses another language.
- Vietnamese user-facing text must include proper accents.
- Use English for code, identifiers, file names, technical keywords, package names, and framework names.
- Code, identifiers, file names, and comments should be English.
- Keep UI copy short and action-oriented.
- Use consistent business terms across screens.

## 11. Accessibility

- Inputs must have labels or an accessible name.
- Error messages should be associated with the relevant field when possible.
- Icon-only buttons must have an accessible label.
- Dialogs, dropdowns, selects, and popovers should use shadcn/Radix primitives instead of custom keyboard handling.
- Do not remove keyboard navigation, focus rings, or ARIA behavior from shadcn components.

## 12. Verification

- For docs-only changes, no build is required.
- For UI component or page changes, run the smallest useful check:

```bash
pnpm.cmd lint
```

- For shared types, routing, module wiring, server actions, schemas, or auth changes, also run:

```bash
pnpm.cmd typecheck
pnpm.cmd build
```

- Report the exact commands run and whether they passed.
