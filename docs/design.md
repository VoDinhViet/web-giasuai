# Design Guidelines

## 1. Design Direction

- Phong cách chính: modern, clean, colorful, bright, friendly, professional, SaaS dashboard.
- Giao diện sáng, sạch, dễ nhìn; ưu tiên nền trắng, xám rất nhạt và pastel nhẹ.
- Không dùng một màu đơn điệu. Mỗi màn cần có 2-4 nhóm màu có mục đích rõ ràng.
- UI phải có độ tương phản tốt, không nhạt nhòa, không quá tối, không dùng màu quá chói.
- Dữ liệu vận hành cần dễ quét: KPI, cảnh báo, bảng, biểu đồ, hành động nhanh phải có phân cấp rõ.
- Dùng soft UI nhẹ: card trắng, shadow nhẹ, border mảnh, nền pastel nhạt cho card trạng thái.
- Glassmorphism chỉ dùng rất nhẹ nếu phù hợp, không dùng blur/glass quá dày gây khó đọc.
- Không dùng hero marketing, gradient/orb trang trí hoặc minh họa không phục vụ nghiệp vụ.

## 2. Color Palette

### Primary Palette

- Primary purple: `#6D38F5`
  - Dùng cho primary action, active sidebar, focus ring, icon nhấn chính.
- Primary soft: `#F3EFFF`
  - Dùng cho card tone `primary`, badge nhẹ, background trạng thái chính.
- Primary deep: `#2E1065`
  - Dùng cho chữ trên nền tím nhạt hoặc trạng thái cần nổi bật.

### Secondary Palette

- Blue: `#0EA5E9`
  - Dùng cho thông tin, AI, tiến trình, dashboard metrics.
- Blue soft: `#E0F2FE`
  - Dùng cho card tone `info`.
- Green: `#16A34A`
  - Dùng cho trạng thái tốt, đã xong, pass, healthy.
- Green soft: `#DCFCE7`
  - Dùng cho card tone `success`.
- Orange: `#F97316`
  - Dùng cho cảnh báo vừa, đang chờ, cần theo dõi.
- Orange soft: `#FFF7ED`
  - Dùng cho card tone `warning`.
- Red: `#F5222D`
  - Dùng cho lỗi, nguy cơ cao, quá hạn, destructive action.
- Red soft: `#FEE2E2`
  - Dùng cho card tone `danger`.
- Pink pastel: `#FCE7F3`
  - Dùng hạn chế cho điểm nhấn thân thiện, nhãn học tập, không dùng làm màu hệ thống chính.

### Neutral Palette

- Background: `#F5F7FB`
- Card: `#FFFFFF`
- Text primary: `#111827`
- Text secondary: `#64748B`
- Border: `#E5EBF5`
- Muted background: `#F2F5FB`

## 3. Color Usage

### Global Tokens

- Luôn dùng semantic tokens trong UI: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary`.
- Không hardcode màu trong feature page bằng `bg-blue-*`, `text-red-*`, hex hoặc inline style.
- Màu raw chỉ định nghĩa trong `app/globals.css` hoặc trong primitive UI có chủ đích.
- Page chỉ truyền semantic prop như `tone="success"`, `variant="outline"`; không tự thêm màu qua `className`.

### Buttons

- Primary button: dùng cho hành động chính của màn như tạo mới, lưu, gửi, sinh AI.
- Outline button: dùng cho hành động phụ như xem chi tiết, lọc, chuyển trang.
- Destructive button: chỉ dùng cho xóa, từ chối, khóa, hủy nghiêm trọng.
- Hover/focus phải rõ: đổi nền nhẹ, border/focus ring rõ, không cần animation mạnh.
- Button nên có icon lucide khi hành động quen thuộc: `Plus`, `Save`, `Send`, `Eye`, `Edit`, `Trash`, `Bot`.

### Cards

- Card mặc định: trắng, border nhẹ, shadow nhẹ, bo góc mềm.
- Card tone:
  - `default`: nội dung chung.
  - `primary`: KPI chính, module quan trọng.
  - `info`: AI, dữ liệu, phân tích.
  - `success`: hoàn thành, active, healthy.
  - `warning`: chờ xử lý, cần theo dõi.
  - `danger`: rủi ro, quá hạn, lỗi.
- Không đặt card trang trí lồng card quá sâu. Card lồng chỉ dùng cho item lặp lại trong danh sách.
- Không để card trống quá nhiều; chiều cao nên theo content, grid dùng `items-start` khi cần.

### Sidebar

- Sidebar dùng nền navy đậm để tạo tương phản với vùng nội dung sáng.
- Active item dùng `bg-sidebar-primary` và `text-sidebar-primary-foreground`.
- Menu item bo góc mềm, hover rõ nhưng không quá sáng.
- Group label nhỏ, uppercase, màu giảm opacity.

### Header

- Header trang dùng nền card hoặc trắng trong, border dưới nhẹ.
- Page title rõ, breadcrumb nhỏ bên dưới.
- Account menu, notification, help dùng icon button đồng bộ.

### Status

- Success: xanh lá, dùng cho `Đang hoạt động`, `Đã duyệt`, `Hoàn thành`.
- Warning: cam, dùng cho `Đang chờ`, `Cần theo dõi`, `Sắp đến hạn`.
- Danger: đỏ, dùng cho `Nguy cơ cao`, `Quá hạn`, `Đã khóa`, `Từ chối`.
- Info: xanh dương, dùng cho `AI`, `Dữ liệu`, `Đang phân tích`.

## 4. Layout

- App shell: sidebar trái, content phải, nền sáng.
- Content route dùng `px-4 py-6 sm:px-6 lg:px-8`.
- Dashboard layout khuyến nghị:
  - Hàng 1: page header + action chính.
  - Hàng 2: KPI cards 4-6 item.
  - Hàng 3: vùng chính 2 cột, ví dụ chart/table bên trái, alert/shortcut bên phải.
  - Hàng 4: danh sách chi tiết hoặc bảng dữ liệu.
- Spacing mặc định: `gap-5`; section dày dữ liệu dùng `gap-3` hoặc `gap-4`.
- Grid card cần `items-start` nếu card cao theo content.
- Mobile: card xếp 1 cột, action xuống dòng, text không tràn container.

## 5. Typography

- Font chính: sans/system hoặc Geist.
- Page title: rõ, đậm, không quá lớn trong app dashboard.
- Section title: `text-base` hoặc `text-lg`, `font-semibold`.
- KPI value: lớn hơn label, đậm, dễ scan.
- Description/helper text: `text-sm`, dùng `text-muted-foreground`.
- Table metadata/badge: `text-xs`.
- Không scale font theo viewport, không dùng negative letter spacing.

## 6. Components

### Required UI Primitives

- Dùng shadcn/ui primitives từ `@/components/ui`.
- Feature page không tự style màu trực tiếp; ưu tiên component prop:
  - `Button variant="default|outline|secondary|destructive|ghost"`
  - `Card tone="default|primary|info|success|warning|danger"`
  - `Input`, `Textarea`, `Select`, `Table` dùng style từ primitive.
- Nếu cần màu mới, thêm token hoặc prop trong primitive trước, rồi feature page gọi ra dùng.

### Card

- Dùng cho KPI, panel thông tin, danh sách item, dashboard section.
- Card tone dùng để phân biệt nhóm chức năng và trạng thái.
- Card không nên dùng `className` để đổi `bg-*`, `border-*`, `shadow-*`, `rounded-*` trong feature page.

### Table

- Header sáng nhẹ, text rõ, row hover nhẹ.
- Action trong row dùng `Button variant="outline"` hoặc icon button có tooltip.
- Không để bảng quá dày màu; dùng màu ở badge/status/action.

### Forms

- Input, textarea, select bo góc mềm, nền trắng, focus ring tím nhẹ.
- Label rõ, placeholder cụ thể theo nghiệp vụ.
- Validate ở boundary, không tin dữ liệu client.

### Icons

- Dùng lucide icons.
- Icon có màu theo tone của parent component.
- Icon action quen thuộc ưu tiên icon thay vì text dài.

## 7. Complete UI Example

Mẫu dashboard admin theo phong cách mong muốn:

- Top section:
  - `Card tone="primary"`
  - Title: `Tổng quan hệ thống Gia Sư AI`
  - Description ngắn về vận hành lớp học, người dùng, AI usage, support.
  - Actions: `Button` primary `AI quota`, `Button variant="outline"` `Xem hỗ trợ`.

- KPI row:
  - `Card tone="info"`: `Lớp đang học`, icon `GraduationCap`.
  - `Card tone="primary"`: `Học viên`, icon `Users`.
  - `Card tone="warning"`: `Tiến độ TB`, icon `TrendingUp`.
  - `Card tone="success"`: `Điểm danh TB`, icon `CheckCircle2`.

- Main content:
  - Left: `Card` chứa biểu đồ hoặc danh sách lớp cần theo dõi.
  - Right: `Card tone="danger"` cho cảnh báo hệ thống, `Card tone="info"` cho lối tắt AI/support.

- Detail section:
  - `Table` hoặc danh sách `Card size="sm"` cho lớp/học viên/ticket.
  - Badge trạng thái dùng tone semantic: success/warning/danger/info.

- Sidebar:
  - Nền navy đậm.
  - Active item tím.
  - Group menu rõ: Home, Pages, Academic, AI Tools, Operations.

## 8. Do / Don't

### Do

- Dùng màu có mục đích.
- Dùng semantic tokens và primitive props.
- Dùng nhiều tone nhẹ để tạo phân cấp.
- Giữ dashboard sáng, rõ, dễ scan.
- Giữ spacing thoáng nhưng không để card trống quá lớn.

### Don't

- Không hardcode màu trong feature page.
- Không dùng một màu tím cho toàn bộ giao diện.
- Không dùng màu chói hoặc gradient nặng.
- Không thêm shadow quá đậm.
- Không lạm dụng hiệu ứng blur/glass.
- Không override `components/ui` bằng `className` màu ở từng màn nếu có thể thêm prop vào primitive.
