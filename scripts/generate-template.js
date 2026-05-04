const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const data = [
  ['STT', 'Chương (Chapter)', 'Phiên học (Session)', 'Tên bài học (Lesson)', 'Lý thuyết (Theory)', 'Mô phỏng (Simulation Link)', 'Mã bài tập trắc nghiệm (Quiz Code)', 'Link Video', 'Mã tài liệu đính kèm (Khớp với file zip)'],
  [1, 'Chương 1: Khởi đầu', 'Session 1', 'Bài 1: Giới thiệu AI', 'Nội dung lý thuyết cơ bản về AI...', 'https://lab.giasuai.com/ai-1', 'QUIZ_AI_01', 'https://youtube.com/v1', 'DOC_AI_01'],
  [2, 'Chương 1: Khởi đầu', 'Session 1', 'Bài 2: Các khái niệm', 'Chi tiết về Machine Learning...', '', 'QUIZ_ML_01', 'https://youtube.com/v2', ''],
];

const worksheet = XLSX.utils.aoa_to_sheet(data);

// Cấu hình độ rộng cột
worksheet['!cols'] = [
  { wch: 5 },  // STT
  { wch: 25 }, // Chương
  { wch: 15 }, // Session
  { wch: 30 }, // Tên bài học
  { wch: 40 }, // Lý thuyết
  { wch: 30 }, // Mô phỏng
  { wch: 25 }, // Quiz
  { wch: 30 }, // Link Video
  { wch: 20 }, // Mã tài liệu
];

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Curriculum');

const publicDir = path.join(process.cwd(), 'public', 'templates');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const filePath = path.join(publicDir, 'lesson_template.xlsx');
XLSX.writeFile(workbook, filePath);

console.log(`Template updated with Theory, Simulation and Quiz columns at: ${filePath}`);
