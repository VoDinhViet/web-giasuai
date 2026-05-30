# AGENTS.md

Huong dan cho coding agents lam viec trong du an `web-giasuai`.

## Tong quan

Day la Next.js App Router app cho he thong GiaSuAI. Code dung TypeScript strict, React 19, Next 16, Tailwind CSS v4, shadcn/radix-nova UI, Tabler icons, `nuqs` cho query params, `ofetch` cho API, va `iron-session` cho session cookie.

Mac dinh hay giu thay doi gon trong module lien quan. Khong refactor rong neu yeu cau chi la UI/behavior nho.

## Lenh thuong dung

- Cai deps: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`

Khong co script test rieng trong `package.json` hien tai. Khi can verify, uu tien `pnpm lint`; voi thay doi lon hoac lien quan routing/server actions thi chay them `pnpm build`.

## Cau truc du an

- `app/`: Next App Router routes, layouts, loading/error pages.
  - `app/(auth)/`: login/register/forgot-password.
  - `app/(authed)/`: khu vuc can dang nhap.
  - `app/(authed)/manage/*`: dashboard/quan tri.
- `features/`: domain modules. Moi module thuong co `actions/`, `components/`, `schemas/`, `params/`, `types/`, `constants/`.
- `components/ui/`: shadcn/radix UI primitives. Sua o day can can than vi anh huong toan app.
- `components/shared/`: components dung chung cap app.
- `lib/`: API client, session, RBAC, env, utils.
- `types/`: types dung chung nhieu feature.
- `public/`: static assets va templates.

Alias import: dung `@/` cho root project.

## Data flow va server actions

- Server actions nam trong `features/*/actions/*` va thuong bat dau bang `"use server"`.
- Dung `api` tu `@/lib/api` de goi backend. `api` tu dong gan `Authorization: Bearer <accessToken>` khi session co token.
- Env duoc validate trong `@/lib/env`; cac bien bat buoc hien tai:
  - `SESSION_COOKIE_PASSWORD` toi thieu 32 ky tu.
  - `API_URL` la URL hop le.
- Query params nen khai bao tap trung trong `features/*/params/*` bang `nuqs`, vi pages server va client components deu dang dung chung schema do.
- Khi filter params gui len API, pattern hien tai la loai bo `""`, `null`, `undefined`, va `"all"`.

## Auth va phan quyen

- Session dung `iron-session`, cookie name `giasuai-session`.
- Dung `getSession()` trong server code khi can doc user/session.
- Dung guards trong `@/lib/guards` cho route/server logic can auth:
  - `requireAuth()`
  - `requireRole()`
  - `requirePermission()`
  - `requireAnyPermission()`
- RBAC nam trong `@/lib/rbac`. Neu them permission moi, cap nhat `ROLE_PERMISSIONS` va type permission lien quan trong `types/user.ts`.

## UI conventions

- UI primitives uu tien lay tu `@/components/ui/*`.
- Icons uu tien `@tabler/icons-react`, vi `components.json` cau hinh `iconLibrary: "tabler"`.
- Dung `cn` tu `@/lib/utils` khi merge className.
- Giữ style theo Tailwind utility class hien co. Tranh them CSS rieng neu primitive/component da xu ly duoc.
- Components can browser state/event handlers phai co `"use client"`.
- Server pages nen fetch data tren server, roi truyen initial data xuong client page component khi can filter/pagination tu URL.
- Trong tables/lists, giu pagination/filter state qua `nuqs` de URL shareable va reload duoc.

## Form, schema, validation

- Validation dang dung `zod`.
- Form phuc tap co the dung `@tanstack/react-form`; kiem tra feature hien co truoc khi them pattern moi.
- Schema theo domain nen dat trong `features/<domain>/schemas`.

## Style code

- TypeScript strict dang bat. Tranh them `any`; neu file da co `any`, chi dung tiep khi pham vi nho va khong dang mo rong contract.
- Khong tao abstraction moi neu component/helper hien tai da du.
- Khong sua formatting toan file neu yeu cau chi can mot thay doi nho.
- Giữ log/debug console o muc toi thieu. Neu them log tam thoi de debug, xoa truoc khi ban giao.
- Project hien co co mot so comment tieng Viet; co the viet comment tieng Viet ngan gon khi thuc su can giai thich logic kho.

## Lam viec voi routes

- Route path co group folder nhu `app/(authed)/...`; khi dung shell can quote path co dau ngoac, vi du:
  - `sed -n '1,160p' 'app/(authed)/manage/classes/page.tsx'`
- Page server thuong parse `searchParams` bang cache tu `nuqs/server`, fetch data bang server actions, roi render component trong `features/*/components`.

## Khi sua UI

- Kiem tra component primitive trong `components/ui` truoc khi customize.
- Neu thay doi class trong primitive UI, xem xet anh huong toan app.
- Neu chi thay doi mot man hinh, sua component feature thay vi primitive.
- Giữ responsive behavior: cac filter bar/list/card hien dung flex-wrap, grid responsive, min-width ro rang.

## Checklist truoc khi ket thuc

1. Chay `pnpm lint` neu thay doi TypeScript/React/CSS class khong qua nho.
2. Chay `pnpm build` neu thay doi route, server action, env, auth, hoac data fetching.
3. Kiem tra `git status --short` de biet minh da sua file nao.
4. Khong revert thay doi co san cua user.
5. Bao ro lenh da chay va neu khong chay duoc thi noi ly do.

