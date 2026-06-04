"use server"

import { createRequire } from "node:module"
import type ExcelJS from "exceljs"

import type { ActionResponse } from "@/types/api"

const require = createRequire(import.meta.url)
const NodeExcelJS = require("exceljs/lib/exceljs.nodejs.js") as typeof ExcelJS

type CourseImportTemplate = {
  filename: string
  contentType: string
  contentBase64: string
}

const courseTemplateRows = [
  [
    "VL11_M1_1",
    "Sóng cơ - Khái niệm và sự hình thành",
    "Trình bày khái niệm sóng cơ, bản chất của sự lan truyền dao động trong môi trường vật chất, phân tích điều kiện để sóng cơ hình thành và truyền đi. Bao gồm: khái niệm sóng và điều kiện hình thành sóng.",
    "- Nêu được khái niệm sóng cơ\n- Hiểu được bản chất sóng truyền dao động, không truyền vật chất\n- Trình bày được các điều kiện để sóng cơ hình thành và lan truyền\n- Vận dụng giải thích được một số hiện tượng thực tế",
    "",
    "có thể gắn video mô phỏng, ví dụ gợn sóng nước, domino",
    15,
    10,
  ],
  [
    "VL11_M1_2",
    "Phân loại và tính chất của sóng",
    "Trình bày cách phân loại sóng theo môi trường truyền; phân biệt sóng dọc và sóng ngang; giới thiệu một số tính chất cơ bản của sóng như sự truyền năng lượng, phản xạ sóng.",
    "- Phân loại được sóng theo môi trường truyền\n- Phân biệt được sóng dọc và sóng ngang\n- Nêu được các tính chất cơ bản của sóng\n- Nhận dạng và vận dụng kiến thức vào bài tập, hiện tượng thực tế",
    "VL11_M1_1",
    "có thể làm quiz phân loại, kéo-thả sóng dọc/ngang",
    "",
    "",
  ],
  [
    "VL11_M2_1",
    "Phân loại sóng theo môi trường truyền (Sóng Điện từ)",
    "Giới thiệu sóng điện từ và khả năng truyền trong chân không.",
    "Phân biệt được sóng cơ và sóng điện từ.",
    "VL11_M1_1",
    "Chủ đề: Sóng",
    10,
    10,
  ],
  [
    "",
    "Điều kiện tạo thành sóng",
    "Điều kiện để một dao động có thể lan truyền thành sóng.",
    "Nêu được các điều kiện để sóng hình thành và truyền đi.",
    "VL11_M1_1",
    "Chủ đề: Sóng",
    10,
    5,
  ],
  [
    "",
    "Sóng dọc",
    "Khái niệm, đặc điểm và ví dụ của sóng dọc.",
    "Phân biệt được sóng dọc và mô tả phương dao động của phần tử môi trường.",
    "VL11_M1_2",
    "Chủ đề: Sóng",
    10,
    10,
  ],
  [
    "",
    "Sóng ngang",
    "Khái niệm, đặc điểm và ví dụ của sóng ngang.",
    "Nhận biết được sóng ngang và môi trường truyền phù hợp.",
    "VL11_M1_2",
    "Chủ đề: Sóng",
    10,
    10,
  ],
  [
    "",
    "Một số tính chất của sóng",
    "Các tính chất như phản xạ, khúc xạ, nhiễu xạ sóng.",
    "Hiểu và vận dụng được các tính chất cơ bản của sóng.",
    "VL11_M1_5, VL11_M1_6",
    "Chủ đề: Sóng",
    10,
    5,
  ],
]

const courseTemplateHeaderRow = [
  "Module ID",
  "Tên module",
  "Miêu tả nội dung",
  "Kết quả cần đạt",
  "Module phụ thuộc (tiên quyết)",
  "Ghi chú",
  "Thời gian học",
  "Thời gian làm bài tập",
]

const courseTemplateColumnWidths = [13, 45, 50, 50, 32, 32, 15, 22]

const thinBorder: Partial<ExcelJS.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
}

const mutedBorder: Partial<ExcelJS.Borders> = {
  top: { style: "thin", color: { argb: "FFD9D9D9" } },
  left: { style: "thin", color: { argb: "FFD9D9D9" } },
  bottom: { style: "thin", color: { argb: "FFD9D9D9" } },
  right: { style: "thin", color: { argb: "FFD9D9D9" } },
}

function styleHeaderCell(cell: ExcelJS.Cell) {
  cell.font = { bold: true }
  cell.alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  }
  cell.border = thinBorder
}

function styleBodyCell(cell: ExcelJS.Cell, isNumberCell: boolean) {
  cell.alignment = {
    horizontal: isNumberCell ? "right" : "left",
    vertical: "middle",
    wrapText: true,
  }
  cell.border = mutedBorder
}

function createCourseImportWorkbook() {
  const workbook = new NodeExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("AI module")

  worksheet.columns = courseTemplateColumnWidths.map((width) => ({ width }))
  worksheet.views = [{ state: "frozen", ySplit: 2 }]

  worksheet.mergeCells("C1:E1")
  worksheet.getCell("C1").value = "AI LÝ THUYẾT"
  worksheet.getCell("H1").value = "AI BÀI TẬP"
  worksheet.getRow(1).height = 18
  worksheet.getRow(2).height = 22

  courseTemplateHeaderRow.forEach((header, headerIndex) => {
    worksheet.getCell(2, headerIndex + 1).value = header
  })

  worksheet.getRow(1).eachCell({ includeEmpty: true }, styleHeaderCell)
  worksheet.getRow(2).eachCell(styleHeaderCell)

  courseTemplateRows.forEach((row) => {
    const worksheetRow = worksheet.addRow(row)
    worksheetRow.height = 78
    worksheetRow.eachCell({ includeEmpty: true }, (cell, cellNumber) => {
      styleBodyCell(cell, cellNumber >= 7)
    })
  })

  return workbook
}

export async function getCourseImportTemplate(): Promise<
  ActionResponse<CourseImportTemplate>
> {
  try {
    const workbook = createCourseImportWorkbook()
    const buffer = await workbook.xlsx.writeBuffer()

    return {
      success: true,
      data: {
        filename: "course-import-template.xlsx",
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        contentBase64: Buffer.from(buffer).toString("base64"),
      },
    }
  } catch (getCourseImportTemplateError) {
    console.error(
      "Get course import template error:",
      getCourseImportTemplateError
    )

    return {
      success: false,
      message: "Không thể tạo file mẫu tạo khóa học.",
    }
  }
}
