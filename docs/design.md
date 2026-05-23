# Thiết Kế UI Quản Lý Nhân Sự

## 1. Mục Tiêu

Tài liệu này mô tả thiết kế giao diện cho màn hình `Quản lý nhân sự` dựa trên ảnh tham chiếu. UI dùng phong cách flat design, bố cục dashboard quản trị và ưu tiên triển khai bằng `shadcn/ui`, Tailwind CSS v4, React, TypeScript.

Màn hình cần tạo cảm giác gọn, rõ thông tin, thao tác nhanh và phù hợp hệ thống ERP sản xuất.

## 2. Công Nghệ Và Nguyên Tắc

- Dùng `shadcn/ui` components từ `@/components/ui`.
- Dùng `lucide-react` cho icon mới.
- Dùng semantic tokens: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`, `bg-primary`.
- Không sửa `components/ui` chỉ để phục vụ riêng màn hình này.
- Dùng Server Components mặc định. Chỉ thêm `"use client"` cho filter, search, pagination, dialog hoặc state tương tác.
- Text hiển thị cho người dùng dùng tiếng Việt có dấu.

## 3. Bố Cục Tổng Thể

Giao diện gồm 3 vùng chính:

1. `Sidebar`
   - Nằm bên trái, rộng khoảng `256px` trên desktop.
   - Nền tối, chữ sáng, active item dùng màu tím/xanh đậm giống ảnh.
   - Có logo `ERPPro`, nhãn công ty, nhóm menu theo module và nút `Thêm nhân sự` cố định gần cuối.

2. `Topbar`
   - Nằm phía trên vùng nội dung.
   - Cao khoảng `64px`.
   - Có ô tìm kiếm global bên trái, cụm icon thông báo/trợ giúp và thông tin tài khoản bên phải.

3. `Main content`
   - Nền xám rất nhạt.
   - Có breadcrumb, tiêu đề trang, nhóm action, các thẻ thống kê, toolbar lọc và bảng nhân sự.
   - Padding desktop: `24px`.
   - Padding mobile: `16px`.

## 4. Cấu Trúc Trang

```tsx
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <AppTopbar />
    <main>
      <PageHeader />
      <EmployeeStats />
      <EmployeeTableToolbar />
      <EmployeeTable />
    </main>
  </SidebarInset>
</SidebarProvider>
```

## 5. Component shadcn/ui Nên Dùng

- `Sidebar`, `SidebarProvider`, `SidebarInset`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`
- `Button`
- `Input`
- `Select`
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- `Dialog` hoặc `Sheet` cho form thêm/sửa nhân sự
- `Tooltip` cho icon-only actions
- `Skeleton` cho trạng thái loading
- `Separator` khi cần chia nhóm menu hoặc toolbar

Nếu thiếu component, thêm bằng:

```bash
pnpm.cmd dlx shadcn@latest add <component-name>
```

## 6. Sidebar

### Nội dung

- Logo:
  - `ERPPro`
  - `INDUSTRIAL OS`
- Nhóm `Quản lý bán hàng`:
  - Sản phẩm
  - Đơn hàng
  - Cửa hàng
- Nhóm `Quản lý sản xuất`:
  - Lệnh sản xuất
  - Công đoạn sản xuất
  - BOM & Kiểm tồn
  - Gia công ngoài
  - Lệnh vật tư
- Nhóm `Quản lý mua hàng`:
  - Đề xuất mua hàng
  - Danh mục mua hàng
- Nhóm `Hệ thống`:
  - Nhân sự
  - Cài đặt

### Style

- Sidebar background: `bg-zinc-950` hoặc token sidebar tối tương đương.
- Text chính: `text-zinc-100`.
- Text phụ/group label: `text-zinc-500`.
- Active menu:
  - Nền: `bg-primary/20`
  - Chữ/icon: `text-primary-foreground` hoặc `text-white`
  - Radius: `rounded-md`
- Menu item height: `36px`.
- Icon size: `16px`.

## 7. Topbar

### Thành phần

- `Input` tìm kiếm global:
  - Placeholder: `Tìm kiếm nhân viên, mã ID...`
  - Width desktop: `360px`
  - Icon: `Search`
- Icon buttons:
  - `Bell`
  - `CircleHelp`
- User block:
  - Tên: `Admin ERP`
  - Vai trò: `System Operator`
  - Avatar nhỏ bên phải.

### Style

- Nền: `bg-background`
- Border bottom: `border-border`
- Height: `64px`
- Topbar không dùng card.

## 8. Header Trang

### Breadcrumb

`Nhân sự > Quản lý nhân sự`

Style:

- Font size: `12px`
- Màu: `text-muted-foreground`
- Link active cuối dùng `text-foreground`.

### Title Và Action

- Title: `Danh sách nhân sự`
- Primary action: `Thêm nhân sự`
  - `Button`
  - Icon: `UserPlus`
  - Variant: default
- Secondary action: `Xuất Excel`
  - `Button`
  - Icon: `Download`
  - Variant: outline

Desktop hiển thị title bên trái, actions bên phải. Mobile xếp actions xuống dưới title.

## 9. Thẻ Thống Kê

Hiển thị 4 metric cards theo hàng ngang trên desktop, 2 cột trên tablet, 1 cột trên mobile.

| Tiêu đề | Giá trị | Icon | Màu nhấn |
| --- | ---: | --- | --- |
| Tổng nhân sự | 1,248 | Users | Blue |
| Đang hoạt động | 1,180 | UserCheck | Green |
| Đã khóa | 68 | UserX | Red |
| Chờ duyệt | 12 | ClipboardClock | Sky |

Style:

- Dùng container `div` hoặc `Card` nếu đã có `card` component.
- Nền: `bg-card`
- Border: `border border-border`
- Radius: `rounded-lg`
- Padding: `20px`
- Label: `text-xs uppercase text-muted-foreground`
- Value: `text-2xl font-semibold text-foreground`
- Icon wrapper: `size-9 rounded-md bg-primary/10`

## 10. Toolbar Bảng

Toolbar nằm trong khối bảng, phía trên table.

Thành phần:

- Search input:
  - Placeholder: `Tìm tên, email hoặc số điện thoại...`
  - Icon: `Search`
  - Chiếm phần rộng nhất.
- Select `Tất cả chức vụ`
- Select `Trạng thái`
- Button `Bộ lọc`
  - Variant: outline
  - Icon: `SlidersHorizontal`

Style:

- Toolbar padding: `16px`
- Gap: `12px`
- Desktop: một hàng.
- Mobile: input full width, filter controls xuống dòng.

## 11. Bảng Nhân Sự

### Cột

| Cột | Nội dung |
| --- | --- |
| Họ tên | Avatar initials, họ tên, mã nhân viên |
| Thông tin liên lạc | Email, số điện thoại |
| Ngày sinh / GT | Ngày sinh, giới tính |
| Chức vụ | Badge chức vụ |
| Trạng thái | Badge trạng thái |
| Thao tác | Sửa, khóa/mở khóa, menu thêm |

### Style

- Dùng `Table` từ `@/components/ui/table`.
- Header:
  - `text-xs uppercase text-muted-foreground`
  - Nền trắng hoặc `bg-card`
- Row height: khoảng `72px`.
- Border row: `border-border`.
- Không dùng zebra quá đậm; ưu tiên nền phẳng và khoảng trắng.
- Action buttons dùng icon-only `Button size="icon"` kèm `Tooltip`.

### Dữ Liệu Mẫu

- Nguyễn Văn Hùng - `ID: EMP001`
- Trần Thị Mai - `ID: EMP042`
- Lê Hoàng Phi - `ID: EMP098`

## 12. Badge

Badge nên là component nhỏ riêng trong feature nếu chưa có `Badge` shadcn.

### Trạng thái

- `Đang hoạt động`
  - Nền: xanh lá nhạt
  - Chữ: xanh lá đậm
- `Đã khóa`
  - Nền: đỏ nhạt
  - Chữ: đỏ đậm
- `Chờ duyệt`
  - Nền: xanh dương nhạt
  - Chữ: xanh dương đậm

### Chức vụ

- `Quản lý sản xuất`: xanh dương nhạt
- `Kỹ thuật QC`: cam nhạt
- `Vận hành kho`: tím nhạt

Ưu tiên class token hóa theo semantic color khi có thể. Nếu dùng màu hardcode cho badge nghiệp vụ, giữ trong component feature và không đưa vào global.

## 13. Pagination

Nằm cuối bảng:

- Text trái: `Hiển thị 1 - 10 trong tổng số 1,248 nhân viên`
- Điều hướng phải:
  - Previous icon
  - Page buttons `1`, `2`, `3`
  - Ellipsis
  - Next icon

Style:

- Active page dùng `bg-primary text-primary-foreground`.
- Button size nhỏ, chiều cao `32px`.

## 14. Responsive

### Desktop `>= 1024px`

- Sidebar cố định bên trái.
- Stats 4 cột.
- Toolbar 1 hàng.
- Table đầy đủ cột.

### Tablet `768px - 1023px`

- Sidebar có thể thu gọn hoặc dùng `Sheet`.
- Stats 2 cột.
- Toolbar cho phép wrap.
- Ẩn bớt thông tin phụ nếu thiếu ngang.

### Mobile `< 768px`

- Sidebar mở bằng `Sheet`.
- Header actions xếp dọc hoặc chia 2 nút full width.
- Stats 1 cột.
- Table chuyển thành dạng list cards hoặc table scroll ngang.
- Không để text trong button/action bị tràn.

## 15. Trạng Thái UI

- Loading:
  - Dùng `Skeleton` cho metric cards và table rows.
- Empty:
  - Hiển thị title ngắn: `Chưa có nhân sự`
  - Mô tả: `Thêm nhân sự đầu tiên để bắt đầu quản lý danh sách.`
  - CTA: `Thêm nhân sự`
- Error:
  - Hiển thị thông báo ngắn trong vùng bảng.
  - Có nút `Thử lại`.
- Searching:
  - Giữ toolbar ổn định, chỉ cập nhật vùng table.

## 16. Form Thêm Và Sửa Nhân Sự

Ưu tiên dùng `Sheet` bên phải cho màn hình desktop và full-screen sheet trên mobile.

Trường thêm mới:

- Họ tên
- Email
- Mật khẩu
- Số điện thoại
- Ngày sinh
- Giới tính
- Chức vụ
- Địa chỉ

Trường chỉnh sửa:

- Họ tên
- Số điện thoại
- Ngày sinh
- Giới tính
- Chức vụ
- Địa chỉ

Quy tắc:

- Dùng `@tanstack/react-form` và `zod`.
- Dùng `Field`, `FieldLabel`, `FieldError`, `FieldGroup`.
- Disable submit khi đang gửi.
- Email và mật khẩu chỉ nhập ở luồng thêm mới.

## 17. Accessibility

- Icon-only buttons phải có `aria-label`.
- Search input cần accessible name hoặc label ẩn.
- Select/filter dùng shadcn/Radix primitives.
- Giữ focus ring mặc định của shadcn.
- Badge không được là nguồn thông tin duy nhất nếu trạng thái quan trọng; text trạng thái phải hiển thị rõ.

## 18. Gợi Ý File Triển Khai

```txt
app/(dashboard)/nhan-su/page.tsx
features/employees/components/employee-page-header.tsx
features/employees/components/employee-stats.tsx
features/employees/components/employee-table-toolbar.tsx
features/employees/components/employee-table.tsx
features/employees/components/employee-form-sheet.tsx
features/employees/schemas/employee.schema.ts
features/employees/actions/employee.actions.ts
```

Tên folder route có thể điều chỉnh theo routing hiện có của dự án.

## 19. Checklist Hoàn Thiện

- Sidebar đúng module và active `Nhân sự`.
- Header có breadcrumb, title, `Xuất Excel`, `Thêm nhân sự`.
- Có 4 metric cards như ảnh.
- Toolbar có search, chức vụ, trạng thái, bộ lọc.
- Bảng hiển thị avatar initials, thông tin liên lạc, badge chức vụ, badge trạng thái và actions.
- Có loading, empty, error states.
- Responsive tốt trên desktop, tablet, mobile.
- Chạy `pnpm.cmd lint` sau khi triển khai UI.
