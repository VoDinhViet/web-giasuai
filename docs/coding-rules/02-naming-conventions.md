# 2. Naming Conventions

## 2.1 Component & File Name

- **File Name**: Lowercase kebab-case (e.g. `create-user-dialog.tsx`)
- **Component Name**: PascalCase (e.g. `CreateUserDialog`)
- **Export**: Named Export only (no Default Export).

```tsx
// ✅ GOOD
// File: components/shared/create-user-dialog.tsx
export function CreateUserDialog() { ... }
```

## 2.2 Variable Naming

- Avoid vague names (`data`, `item`, `value`, `temp`).
- Use entity-specific names (`users`, `userId`, `roleId`).

```typescript
// ✅ GOOD
const users = await getUsers()
const activeUser = users[0]
```

## 2.3 Utility Naming

- Suffix file name with `*.util.ts` (e.g. `number.util.ts`).
- Name utility files by a concrete domain, not by generic buckets. Use `date.util.ts`, `number.util.ts`, `string.util.ts`, `select-option.util.ts`, `user-gender.util.ts`.
- Avoid vague utility file names such as `helper.util.ts`, `common.util.ts`, `misc.util.ts`, `shared.util.ts`, and overly broad names such as `option.util.ts`.
- Function name: **Verb** + **Business Noun** (e.g. `formatCurrency`, `parseDate`, `createSelectOptionsFromLabelMap`, `validateEmployeeCode`).
- Feature-only utilities may include the feature noun when it clarifies ownership (e.g. `features/users/utils/user-gender.util.ts`).
- Prefer existing global utilities in `lib` before creating a feature utility. Do not create feature wrappers around global utilities.
- Exported utility functions must include a short JSDoc block with purpose, `@param`, and `@returns`.
