# 6. Security, Standards & Verification

## 6.1 Authorization
*   Always enforce permission checks at Server Action boundaries. Never rely only on client-side UI hiding.

## 6.2 Language Standards
*   **User Interface (Client UI)**: 100% Vietnamese (proper accents, grammatically correct).
*   **Source Code**: 100% English (variable names, functions, comments, file names, folders).

```typescript
// ✅ GOOD
const userData = await fetchUsers()
return <div>Chỉnh sửa thông tin cá nhân</div>
```

## 6.3 Pre-push Verification
Always run verification checks locally before pushing code:
*   UI/Component changes:
    ```bash
    pnpm lint
    ```
*   Actions, Types, Wiring, Routing, Auth, Config changes:
    ```bash
    pnpm typecheck
    ```
