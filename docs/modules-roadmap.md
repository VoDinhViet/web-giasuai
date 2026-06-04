# Gia Sư AI Modules Roadmap

Tài liệu theo dõi module và luồng màn hình để dễ review từng phần.

## Module 00 - Dashboard quản trị hệ thống

- Status: Done
- Route: `/manage`
- Actors: Admin
- Goal: Xem tổng quan vận hành hệ thống Gia Sư AI trên một màn hình.
- Screens:
  - `/manage`: Bảng điều khiển admin
- Main flows:
  - Xem KPI lớp học, học viên, tiến độ, điểm danh.
  - Theo dõi sức khỏe vận hành, AI usage, ticket và cảnh báo hệ thống.
  - Mở nhanh các module chính như lớp học, người dùng, khóa học, AI Tutor, lộ trình AI, hỗ trợ.
  - Xem lớp cần theo dõi và hoạt động gần đây.
- Notes:
  - Dữ liệu hiện tổng hợp từ mock class/course/student và số vận hành mock.
  - Root `/` đã redirect về `/manage`.

## Module 01 - Hồ sơ cá nhân

- Status: Done
- Route: `/manage/profile`
- Actors: Student, Teacher, Admin
- Goal: Người dùng xem và chỉnh thông tin cơ bản.
- Screens:
  - `/manage/profile`: Hồ sơ cá nhân
- Main flows:
  - Xem thông tin tài khoản hiện tại.
  - Chỉnh họ tên, tên đăng nhập, email hiển thị.
  - Chuẩn bị khu vực ảnh đại diện.
- Notes:
  - Chưa nối API cập nhật profile.
  - Đã nối menu tài khoản ở topbar.
  - Form hiện chỉnh local để review UI trước khi gắn API update.
  - UI đã làm lại theo phong cách trẻ trung hơn: hero hồ sơ, thống kê học tập, mục tiêu tuần, lịch học và hoạt động gần đây.

## Module 02 - Chi tiết học viên

- Status: Done
- Route: `/manage/students/[studentId]`
- Actors: Teacher, Admin
- Goal: Theo dõi tiến độ, điểm mạnh/yếu, thời gian học trung bình của học viên.
- Screens:
  - `/manage/students/[studentId]`: Chi tiết học viên
- Main flows:
  - Mở chi tiết học viên từ bảng giám sát trong lớp học.
  - Xem điểm danh, tiến độ, điểm trung bình, lượt luyện AI.
  - Xem khóa học đang theo, điểm yếu cần theo dõi, ghi chú giáo viên và hoạt động gần đây.
- Notes:
  - Dữ liệu hiện lấy từ mock lớp học để review UI trước.
  - Chưa nối API chi tiết học viên.

## Module 03 - Dashboard học viên

- Status: Done
- Route: `/manage/student-dashboard`
- Actors: Student
- Goal: Thống kê giờ học, module hoàn thành, biểu đồ tiến bộ, lịch sử học tập.
- Screens:
  - `/manage/student-dashboard`: Dashboard học viên
- Main flows:
  - Xem tổng quan giờ học, module hoàn thành, chuỗi học và tiến bộ.
  - Xem biểu đồ tiến bộ tuần, mục tiêu hôm nay và module đang học.
  - Xem gợi ý AI, lịch học gần nhất và lịch sử học tập.
- Notes:
  - Dữ liệu dashboard hiện là mock để review UI trước.
  - Đã thêm menu sidebar `Dashboard học viên`.

## Module 04 - Tracking điểm yếu

- Status: Done
- Route: `/manage/weaknesses`
- Actors: Student, Teacher, Admin
- Goal: Theo dõi lỗ hổng kiến thức theo cá nhân và theo lớp.
- Screens:
  - `/manage/weaknesses`: Tracking điểm yếu
- Main flows:
  - Xem tổng hợp điểm yếu theo học viên, lớp, khóa học và mức ưu tiên.
  - Lọc nhanh theo `Tất cả`, `Ưu tiên cao`, `Cần theo dõi`, `Nâng cao`.
  - Mở chi tiết học viên từ từng tín hiệu điểm yếu.
  - Xem quy trình xử lý, nhóm lớp cần chú ý và học liệu gợi ý.
- Notes:
  - Dữ liệu hiện tổng hợp từ mock `students`.
  - Chưa nối API tracking điểm yếu.
  - Đã thêm menu sidebar `Tracking điểm yếu`.

## Module 05 - Tham gia lớp bằng code/mời

- Status: Done
- Route: `/manage/join-class`
- Actors: Student
- Goal: Học viên tham gia lớp bằng mã hoặc lời mời.
- Screens:
  - `/manage/join-class`: Tham gia lớp
- Main flows:
  - Nhập mã lớp hoặc mã lời mời để kiểm tra thông tin lớp.
  - Gửi yêu cầu tham gia kèm ghi chú cho giáo viên.
  - Xem và chấp nhận lời mời đang chờ.
  - Theo dõi lịch sử yêu cầu tham gia lớp.
- Notes:
  - Dữ liệu hiện là mock để review UI trước.
  - Chưa nối API gửi yêu cầu/chấp nhận lời mời.
  - Đã thêm menu sidebar `Tham gia lớp`.

## Module 06 - Phê duyệt học viên vào lớp

- Status: Done
- Route: `/manage/classes/[classCode]/enrollments`
- Actors: Teacher, Admin
- Goal: Giáo viên duyệt học viên xin vào lớp.
- Screens:
  - `/manage/classes/[classCode]/enrollments`: Phê duyệt học viên
- Main flows:
  - Mở màn duyệt từ nút `Duyệt học viên` trong chi tiết lớp.
  - Xem yêu cầu tham gia theo mã lớp hoặc lời mời.
  - Duyệt, từ chối hoặc nhắn học viên.
  - Xem điều kiện duyệt, mẫu phản hồi và thông tin lớp.
- Notes:
  - Dữ liệu hiện là mock để review UI trước.
  - Chưa nối API duyệt/từ chối yêu cầu.

## Module 07 - AI Tutor

- Status: Done
- Route: `/manage/ai-assistant`
- Actors: Student, Teacher, Admin
- Goal: Chat general và chat theo ngữ cảnh bài học.
- Screens:
  - `/manage/ai-assistant`: AI Tutor
- Main flows:
  - Chat tổng quát hoặc đổi mode theo `Chat tổng quát`, `Theo bài học`, `Theo lớp học`.
  - Gửi câu hỏi và xem phản hồi mock trong khung chat.
  - Chọn prompt gợi ý để đưa nhanh vào ô chat.
  - Xem ngữ cảnh đang dùng, lịch sử hội thoại và quota AI.
- Notes:
  - Dữ liệu hội thoại hiện là mock để review UI trước.
  - Chưa nối API chat AI, streaming response, lưu lịch sử hoặc quota thật.

## Module 08 - Sinh lộ trình AI

- Status: Done
- Route: `/manage/learning-paths`
- Actors: Student, Teacher, Admin
- Goal: Tạo lộ trình học cá nhân hoặc lộ trình cho lớp.
- Screens:
  - `/manage/learning-paths`: Sinh lộ trình AI
- Main flows:
  - Chọn phạm vi `Cá nhân` hoặc `Lớp học`.
  - Nhập mục tiêu, thời lượng và đối tượng cần sinh lộ trình.
  - Xem preview lộ trình theo tuần, task và tiến độ.
  - Xem dữ liệu AI dùng, lộ trình gần đây và nguyên tắc kiểm soát chất lượng.
- Notes:
  - Dữ liệu hiện là mock để review UI trước.
  - Chưa nối API sinh lộ trình AI hoặc lưu/xuất bản lộ trình thật.
  - Đã thêm menu sidebar `Lộ trình AI`.

## Module 09 - Kiểm tra năng lực đầu vào

- Status: Done
- Route: `/manage/placement-tests`
- Actors: Student, Teacher, Admin
- Goal: Làm bài test đầu vào và xem phân loại năng lực.
- Screens:
  - `/manage/placement-tests`: Kiểm tra năng lực đầu vào
- Main flows:
  - Chọn bài test theo mục tiêu phân loại.
  - Làm câu hỏi trắc nghiệm đầu vào.
  - Chấm điểm mock và xem kết quả phân loại năng lực.
  - Xem lộ trình gợi ý, lịch sử test và quy tắc phân loại.
- Notes:
  - Dữ liệu test hiện là mock để review UI trước.
  - Chưa nối API câu hỏi, chấm điểm, lưu kết quả hoặc sinh lộ trình thật.
  - Đã thêm menu sidebar `Test đầu vào`.

## Module 10 - Hỗ trợ và AI quota

- Status: Done
- Routes: `/manage/tickets`, `/manage/ai-usage`
- Actors: Admin
- Goal: Quản lý ticket hỗ trợ, chi phí API, lịch sử hội thoại và quota AI.
- Screens:
  - `/manage/tickets`: Hỗ trợ
  - `/manage/ai-usage`: AI quota
- Main flows:
  - Xem ticket hỗ trợ theo trạng thái, ưu tiên, kênh và người gửi.
  - Phản hồi ticket, chuyển trạng thái chờ hoặc đánh dấu đã xử lý.
  - Theo dõi request, token, chi phí AI và quota theo nhóm người dùng.
  - Xem phân bổ AI theo tính năng, lịch sử hội thoại và cảnh báo quota.
- Notes:
  - Dữ liệu hiện là mock để review UI trước.
  - Chưa nối API ticket, AI usage, quota thật hoặc lịch sử hội thoại thật.
  - Đã thêm menu sidebar `Hỗ trợ` và `AI quota`.

## API Integration 01 - Auth, Current User, User Management

- Status: In progress
- Backend source: `/home/workspace/giasuai/be-giasuai`
- Backend modules read:
  - `src/api/auth/auth.controller.ts`
  - `src/api/users/users.controller.ts`
  - `src/api/users/users.service.ts`
  - `src/api/users/dto/*`
- Connected endpoints:
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/refresh-token`
  - `POST /api/v1/auth/logout`
  - `GET /api/v1/users/me`
  - `PATCH /api/v1/users/me`
  - `GET /api/v1/users`
  - `GET /api/v1/users/stats`
  - `PATCH /api/v1/users/:userId/lock`
  - `POST /api/v1/users`
- FE updates:
  - Fixed refresh token endpoint to `/api/v1/auth/refresh-token`.
  - Aligned `User` types with backend `UserResDto` fields.
  - Connected profile save to `PATCH /api/v1/users/me` for `fullName`.
  - Locked profile `email` and `username` fields because backend does not allow changing them.
  - Connected user lock/unlock to `PATCH /api/v1/users/:userId/lock`.
  - Connected user stats cards to `GET /api/v1/users/stats`.
  - Removed admin edit entry from user detail because backend has no `PATCH /api/v1/users/:userId` endpoint.
- Pending:
  - Add UI for teacher verification through `PATCH /api/v1/users/:userId/verify-teacher`.
  - Add delete user flow through `DELETE /api/v1/users/:userId`.
  - Decide whether backend should add admin update user endpoint or FE should keep user detail read-only.
