import { Badge } from "@/components/ui/badge"

export function ImportStatusBadge({
  status,
}: {
  status: "Hợp lệ" | "Cảnh báo" | "Lỗi"
}) {
  if (status === "Hợp lệ") {
    return <Badge variant="secondary">Hợp lệ</Badge>
  }
  if (status === "Cảnh báo") {
    return (
      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-500/5">
        Cảnh báo
      </Badge>
    )
  }
  return <Badge variant="destructive">Lỗi</Badge>
}
