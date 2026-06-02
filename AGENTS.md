# AGENTS.md

## Language

- Respond to the user in Vietnamese.
- Use Vietnamese with proper accents for Vietnamese text.
- Use English for code, identifiers, file names, technical keywords, package names, and framework names.
- Keep code, identifiers, file names, and comments in English.
- Keep explanations short, practical, and lead with the result.

## Project Context

- This is a Next.js App Router project using TypeScript, React, Tailwind CSS v4, and shadcn/ui.
- shadcn/ui config is in `components.json`.
- Detailed project coding rules are in `docs/coding-rules.md`.
- Prefer existing project patterns before adding new abstractions.

## Workflow

- Read this file before making changes.
- For code or UI work, also read `docs/coding-rules.md`.
- Inspect nearby files and existing patterns before editing.
- Keep changes scoped to the user's request.
- Do not create commits unless explicitly asked.
- Do not revert user changes.
- Ask concise questions only when missing information changes behavior, data model, security, or public API.

## Implementation Rules

- Use Server Components by default.
- Add `"use client"` only when hooks, browser APIs, event handlers, or client-side state are needed.
- For App Router `page.tsx` props, use generated `PageProps<"/route">` with the exact URL path and omit route groups such as `(authed)`. Do not hand-write `params` or `searchParams` prop types.
- Put route files under `app`.
- Put reusable UI primitives under `components/ui`.
- Put shared components under `components`.
- Put feature-specific code under `features/<feature-name>`.
- Put feature constants under `features/<feature-name>/constants`.
- Use existing global utilities from `lib` first.
- Put feature-only utilities under `features/<feature-name>/utils` only when global utilities in `lib` cannot represent the feature-specific behavior.
- Do not create feature wrappers around global utilities.
- Put reusable pure utilities, framework helpers, API, auth, session, and integration helpers under `lib`.
- Put shared types under `types`.

## shadcn/ui Rules

- Use shadcn/ui components from `@/components/ui`.
- Prefer existing shadcn/ui components before creating custom UI.
- Use `cn` from `@/lib/utils` for conditional class names. Keep `cn` implemented directly in `lib/utils.ts` as the shadcn/ui compatibility entrypoint.
- Use Tailwind semantic tokens such as `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-muted-foreground`, and `bg-card`.
- When using shadcn/ui components, do not override built-in `bg-*` or `rounded-*` classes unless a clear product requirement needs it.
- Prefer `rounded` or existing component radius defaults instead of large radius utilities such as `rounded-2xl`, unless a clear product requirement needs it.
- Do not modify `components/ui` for one-screen-only styling.
- Add missing shadcn/ui components with:

```bash
pnpm.cmd dlx shadcn@latest add <component-name>
```

## Forms

- Prefer `@tanstack/react-form` for interactive forms.
- Prefer `zod` schemas for validation.
- Put schemas under `features/<feature>/schemas`.
- Put server actions under `features/<feature>/actions`.
- Use shadcn field primitives such as `Field`, `FieldLabel`, `FieldError`, and `FieldGroup`.
- Validate input at boundaries.
- Do not trust calculated values from the client.

## Naming

- Use clear business names.
- Name components using PascalCase (e.g., `CreateUserDialog`) but name their files using kebab-case (e.g., `create-user-dialog.tsx`).
- Avoid vague names like `data`, `item`, `record`, `result`, `tmp`, `obj`, `val`, and `arr`.
- Use entity-specific identifiers such as `userId`, `employeeId`, `roleId`, and `orderId`.
- Use `reqDto` for a single request DTO parameter.

## Safety

- Never expose secrets, tokens, passwords, password hashes, connection strings, or private keys.
- Do not run database migrations, destructive commands, or broad rewrites without explicit approval.
- Use parameterized APIs, ORM APIs, or query builders instead of raw string SQL from user input.

## Verification

- Run the smallest useful verification after code changes.
- For docs-only changes, no build is required.
- For UI component or page changes, run:

```bash
pnpm.cmd lint
```

- For shared types, routing, module wiring, server actions, schemas, auth, or configuration changes, also run:

```bash
pnpm.cmd typecheck
```

- Do not run `pnpm.cmd build` by default after every change. Run build only when explicitly requested, before release/deploy, or when a change touches build configuration, Next.js configuration, package dependencies, runtime environment, or another area where lint/typecheck cannot give enough confidence.

- Report exact commands run and whether they passed.

## Windows

- Prefer `pnpm.cmd` for pnpm scripts on Windows.
- Prefer PowerShell-native commands.
- Use `-LiteralPath` for file operations when paths may contain special characters.
