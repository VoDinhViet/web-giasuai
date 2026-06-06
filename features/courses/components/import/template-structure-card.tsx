import { FileText } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import { SectionTitle } from "./section-title"
import { TemplateChecklistItem } from "./template-checklist-item"

export function TemplateStructureCard() {
  return (
    <Card data-tone="default">
      <CardHeader>
        <SectionTitle icon={FileText} title="Cấu trúc file mẫu" />
        <CardDescription>
          Nhập đúng mã liên kết để hệ thống ghép khóa, chương và bài học.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <TemplateChecklistItem
            title="Sheet AI module"
            description="Module ID, Tên module, Miêu tả nội dung"
          />
          <TemplateChecklistItem
            title="Cột AI lý thuyết"
            description="Kết quả cần đạt, Module phụ thuộc, Ghi chú"
          />
          <TemplateChecklistItem
            title="Cột thời lượng"
            description="Thời gian học, Thời gian làm bài tập"
          />
        </div>
      </CardContent>
    </Card>
  )
}
