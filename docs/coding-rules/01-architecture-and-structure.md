# 1. Architecture & Structure

## 1.1 Folder Organization
*   Feature-specific code -> `features/<feature-name>/` (actions, components, schemas)
*   Global composed components -> `components/shared/`
*   shadcn/ui primitives -> `components/ui/`
*   Shared utilities -> `lib/`

```
├── app/manage/users/page.tsx
├── components/shared/data-table.tsx
├── features/users/components/users-table.tsx
```

## 1.2 AI Tooling (CodeGraph)
*   **Ignore Database**: Add `.codegraph/` to `.gitignore`. Never commit it.
*   **Commands**:
    *   Init: `npx codegraph init`
    *   Sync: `npx codegraph sync`
    *   Reset: `npx codegraph index --force`
