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
    <Card className="h-full">
      <CardHeader>
        <SectionTitle icon={FileText} title="Cấu trúc file mẫu" />
        <CardDescription>
          Nhập đúng liên kết mã để ghép nối tự động khóa học, chương và bài học.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <TemplateChecklistItem
            title="Dữ liệu Khóa học"
            description="Mã khóa, tên khóa học, phân loại, ghi chú"
          />
          <TemplateChecklistItem
            title="Dữ liệu Chương"
            description="Mã chương, tên chương, thứ tự, mã khóa liên kết"
          />
          <TemplateChecklistItem
            title="Dữ liệu Bài học"
            description="Mã bài học, tên bài, loại bài, thời lượng, mã chương"
          />
        </div>
      </CardContent>
    </Card>
  )
}
