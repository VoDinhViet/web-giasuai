# Coding Rules Guidelines

Mọi thành viên phát triển bắt buộc phải tuân thủ nghiêm ngặt các quy tắc dưới đây.

---

## 📚 Danh mục Quy tắc Coding

### 🗺️ [1. Kiến trúc dự án và Công cụ AI](file:///home/workspace/2605-quanlysanxuat/web-quanlysanxuat/docs/coding-rules/01-architecture-and-structure.md)

- Kiến trúc thư mục: `app/`, `features/<feature>/`, `components/shared/`, `components/ui/`, `lib/`, `types/`.
- Feature code tách theo `actions/`, `components/`, `constants/`, `hooks/`, `lib/`, `schemas/`, `utils/`.
- Quy định sử dụng công cụ hỗ trợ AI **CodeGraph** và cấu hình Git.

### 🏷️ [2. Quy ước Đặt tên (Naming Conventions)](file:///home/workspace/2605-quanlysanxuat/web-quanlysanxuat/docs/coding-rules/02-naming-conventions.md)

- Đặt tên tệp tin (kebab-case) và component (PascalCase). Named Export duy nhất.
- Đặt tên biến nghiệp vụ rõ nghĩa (tránh `data`, `item`).
- Đặt tên tệp tiện ích (`*.util.ts`) và quy tắc đặt tên hàm.

### 🎨 [3. Kiểu dáng, shadcn/ui và Phát triển Component](file:///home/workspace/2605-quanlysanxuat/web-quanlysanxuat/docs/coding-rules/03-styling-and-components.md)

- Nguyên tắc viết inline helpers mặc định (Keep Helpers Inline).
- Quy tắc tùy biến an toàn thư viện shadcn/ui primitives.
- Sử dụng màu sắc Semantic Tokens (`bg-background`, `border-border`).

### 📋 [4. Biểu mẫu, Bảng dữ liệu và Component dùng chung](file:///home/workspace/2605-quanlysanxuat/web-quanlysanxuat/docs/coding-rules/04-forms-and-tables.md)

- Thiết kế DataTable tối giản, dùng chung `<EmptyTable />` toàn cục.
- Xây dựng `<DatePicker />` toàn cục kế thừa props HTML button.
- Cấu trúc form tương tác với Zod và xử lý pending state.

### ⚡ [5. Caching & Revalidation](file:///home/workspace/2605-quanlysanxuat/web-quanlysanxuat/docs/coding-rules/05-data-and-caching.md)

- Lưu cache Server Actions bằng chỉ thị `"use cache";` của Next.js 16.
- Bảo mật: Cô lập cache bằng tham số `userId` (Session Isolation).
- Làm tươi cache bằng `revalidateTag` và `updateTag`.

### 🔒 [6. Bảo mật, Tiêu chuẩn Ngôn ngữ và Xác minh](file:///home/workspace/2605-quanlysanxuat/web-quanlysanxuat/docs/coding-rules/06-security-and-standards.md)

- Xác thực phiên làm việc và phân quyền RBAC ở Server Action boundaries.
- Chuẩn ngôn ngữ: Tiếng Việt có dấu cho Client UI, Tiếng Anh hoàn toàn cho Code/Comments/Files.
- Quy trình pre-push bắt buộc chạy `pnpm lint` và `pnpm typecheck` locally.

### 🎨 [7. Quy chuẩn Thiết kế và Thẩm mỹ (Design Guidelines)](file:///home/workspace/2605-quanlysanxuat/web-quanlysanxuat/docs/design.md)

- Sử dụng màu sắc Semantic Tokens và Dark Mode thống nhất.
- Typography, Font size scale và bo góc (Borders & Radius) tiêu chuẩn.
- Hiệu ứng chuyển động mượt mà (Micro-animations & Transitions).
