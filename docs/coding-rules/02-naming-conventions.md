# 2. Naming Conventions

## 2.1 Component & File Name
*   **File Name**: Lowercase kebab-case (e.g. `create-user-dialog.tsx`)
*   **Component Name**: PascalCase (e.g. `CreateUserDialog`)
*   **Export**: Named Export only (no Default Export).

```tsx
// ✅ GOOD
// File: components/shared/create-user-dialog.tsx
export function CreateUserDialog() { ... }
```

## 2.2 Variable Naming
*   Avoid vague names (`data`, `item`, `value`, `temp`).
*   Use entity-specific names (`users`, `userId`, `roleId`).

```typescript
// ✅ GOOD
const users = await getUsers()
const activeUser = users[0]
```

## 2.3 Utility Naming
*   Suffix file name with `*.util.ts` (e.g. `number.util.ts`).
*   Function name: **Verb** + **Business Noun** (e.g. `formatCurrency`, `validateEmployeeCode`).
