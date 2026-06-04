"use server"

import { createRequire } from "node:module"
import type ExcelJS from "exceljs"

import type { ActionResponse } from "@/types/api"
import type {
  ChapterImportRow,
  CourseImportPreview,
  CourseImportRow,
  LessonImportRow,
} from "../types"

const require = createRequire(import.meta.url)
const NodeExcelJS = require("exceljs/lib/exceljs.nodejs.js") as typeof ExcelJS

const expectedHeaderRow = [
  "Module ID",
  "Tên module",
  "Miêu tả nội dung",
  "Kết quả cần đạt",
  "Module phụ thuộc (tiên quyết)",
  "Ghi chú",
  "Thời gian học",
  "Thời gian làm bài tập",
]

function getCellText(cell: ExcelJS.Cell) {
  return cell.text.trim()
}

function getMissingFields(row: string[]) {
  const missingFields: string[] = []

  if (!row[1]) missingFields.push("Tên module")
  if (!row[2]) missingFields.push("Miêu tả nội dung")
  if (!row[3]) missingFields.push("Kết quả cần đạt")

  return missingFields
}

function createRowNote(missingFields: string[], fallbackNote: string) {
  if (missingFields.length > 0) {
    return `Thiếu ${missingFields.join(", ")}`
  }

  return fallbackNote || "Sẵn sàng tạo"
}

function validateHeaderRow(worksheet: ExcelJS.Worksheet) {
  return expectedHeaderRow.every((header, index) => {
    const cellValue = getCellText(worksheet.getCell(2, index + 1))

    return cellValue === header
  })
}

function parseCourseImportWorksheet(
  worksheet: ExcelJS.Worksheet
): CourseImportPreview {
  const courses: CourseImportRow[] = []
  const chapters: ChapterImportRow[] = []
  const lessons: LessonImportRow[] = []
  const chapterOrderByCourse = new Map<string, number>()
  let currentCourseCode = ""

  worksheet.eachRow((worksheetRow, rowNumber) => {
    if (rowNumber <= 2) return

    const row = Array.from({ length: expectedHeaderRow.length }, (_, index) =>
      getCellText(worksheetRow.getCell(index + 1))
    )
    const hasContent = row.some((cellValue) => cellValue)

    if (!hasContent) return

    const moduleId = row[0]
    const moduleName = row[1]
    const description = row[2]
    const outcome = row[3]
    const prerequisiteModule = row[4]
    const note = row[5]
    const studyTime = row[6]
    const exerciseTime = row[7]
    const missingFields = getMissingFields(row)
    const rowNote = createRowNote(missingFields, note)

    if (moduleId) {
      currentCourseCode = moduleId
      courses.push({
        rowNumber,
        courseCode: moduleId,
        courseName: moduleName || moduleId,
        category: note || "AI module",
        status: missingFields.length > 0 ? "Cảnh báo" : "Hợp lệ",
        note: rowNote,
      })
    }

    const courseCode = currentCourseCode || moduleId || `ROW-${rowNumber}`
    if (!currentCourseCode && !moduleId) {
      currentCourseCode = courseCode
      courses.push({
        rowNumber,
        courseCode,
        courseName: moduleName || courseCode,
        category: note || "AI module",
        status: "Cảnh báo",
        note: "Dòng không có Module ID",
      })
    }

    const nextChapterOrder = (chapterOrderByCourse.get(courseCode) || 0) + 1
    const chapterCode = moduleId || `${courseCode}-R${rowNumber}`
    chapterOrderByCourse.set(courseCode, nextChapterOrder)

    chapters.push({
      rowNumber,
      courseCode,
      chapterCode,
      chapterTitle: moduleName || "Chưa có tên module",
      order: nextChapterOrder,
      status: missingFields.length > 0 ? "Lỗi" : "Hợp lệ",
      note: rowNote,
    })

    lessons.push({
      rowNumber,
      chapterCode,
      lessonCode: chapterCode,
      lessonTitle: outcome || description || moduleName || "Chưa có nội dung",
      lessonType: prerequisiteModule ? `Tiên quyết: ${prerequisiteModule}` : "AI lý thuyết",
      duration: studyTime ? `${studyTime} phút` : "Chưa nhập",
      status: missingFields.length > 0 ? "Lỗi" : "Hợp lệ",
      note: exerciseTime ? `${rowNote} · Bài tập ${exerciseTime} phút` : rowNote,
    })
  })

  return { courses, chapters, lessons }
}

export async function parseCourseImportFile(
  formData: FormData
): Promise<ActionResponse<CourseImportPreview>> {
  try {
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return {
        success: false,
        message: "Vui lòng chọn file Excel trước khi đọc lại.",
      }
    }

    if (!file.name.toLowerCase().endsWith(".xlsx")) {
      return {
        success: false,
        message: "Hiện chỉ hỗ trợ file .xlsx.",
      }
    }

    const workbook = new NodeExcelJS.Workbook()
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))
    const loadWorkbook = workbook.xlsx.load as (
      this: typeof workbook.xlsx,
      data: unknown
    ) => Promise<ExcelJS.Workbook>
    await loadWorkbook.call(workbook.xlsx, buffer)

    const worksheet = workbook.getWorksheet("AI module") || workbook.worksheets[0]

    if (!worksheet) {
      return {
        success: false,
        message: "File Excel không có sheet dữ liệu.",
      }
    }

    if (!validateHeaderRow(worksheet)) {
      return {
        success: false,
        message: "File Excel không đúng cấu trúc mẫu.",
      }
    }

    const preview = parseCourseImportWorksheet(worksheet)

    if (preview.courses.length === 0) {
      return {
        success: false,
        message: "File Excel chưa có dòng dữ liệu hợp lệ.",
      }
    }

    return {
      success: true,
      data: preview,
      message: "Đã đọc file Excel.",
    }
  } catch (parseCourseImportFileError) {
    console.error("Parse course import file error:", parseCourseImportFileError)

    return {
      success: false,
      message: "Không thể đọc file Excel.",
    }
  }
}
