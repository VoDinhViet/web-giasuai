# Verification Rules

- Run the smallest useful verification after code changes.
- For docs-only changes, no build is required.
- For UI component or page changes, run:

```bash
pnpm lint
```

- For shared types, routing, module wiring, Server Actions, schemas, auth, or config changes, also run:

```bash
pnpm typecheck
```

- Do not run `pnpm build` by default.
- Run build only when explicitly requested, before release/deploy, or when lint/typecheck cannot cover the changed area.
- Report exact commands run and whether they passed.
