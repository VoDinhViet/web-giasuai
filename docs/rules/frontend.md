# Frontend Rules

- Dùng Server Components mặc định.
- Chỉ thêm `"use client"` khi cần hooks, browser APIs, event handlers, hoặc client state.
- Dùng shadcn/ui từ `@/components/ui` trước khi tự tạo primitive mới.
- Dùng `cn` từ `@/lib/utils` cho conditional class names.
- Dùng semantic tokens: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-muted-foreground`, `bg-card`.
- Không sửa `components/ui` cho styling một màn hình.
- Không override `bg-*` hoặc `rounded-*` mặc định của shadcn component nếu không có yêu cầu sản phẩm rõ.
- Prefer `rounded` hoặc radius mặc định; tránh radius lớn nếu không có yêu cầu rõ.
- Dùng icon library đã có trong project; không hand-roll SVG icon.
- Text trong UI phải vừa container ở mobile và desktop.
- Không làm landing page nếu user yêu cầu app/tool/page thao tác nội bộ.
- UI text dùng tiếng Việt có dấu; code, identifier, file name, comment dùng English.
- Dùng shadcn `Label` cho label form/filter thay vì tự viết `label`/`span` cùng style lặp lại.
- Nếu style label dùng chung toàn app, cập nhật `components/ui/label.tsx` thay vì lặp `className` ở từng màn.
- Với table nội bộ, ưu tiên UI gọn: không thêm icon vào cell nếu icon không giúp thao tác hoặc đọc dữ liệu.
