import {
  Building2,
  CheckCircle2,
  CirclePause,
  CircleX,
  type LucideIcon,
} from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Pagination } from "@/types/api"
import type { Supplier, SupplierGroup } from "../../types"
import { SuppliersTable } from "../tables/suppliers-table"

type SuppliersPageProps = {
  suppliers: Supplier[]
  pagination: Pagination
  supplierGroupOptions: SupplierGroup[]
}

export function SuppliersPage({
  suppliers,
  pagination,
  supplierGroupOptions,
}: SuppliersPageProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <SupplierStats pagination={pagination} />
      <SuppliersTable
        suppliers={suppliers}
        pagination={pagination}
        supplierGroupOptions={supplierGroupOptions}
      />
      <Alert className="border-primary/25 bg-primary/5 text-primary">
        <CheckCircle2 className="size-4" />
        <AlertTitle>Thông tin</AlertTitle>
        <AlertDescription className="text-primary/85">
          Quản lý thông tin nhà cung cấp giúp bạn dễ dàng theo dõi, đánh giá và
          lựa chọn nhà cung cấp phù hợp cho hoạt động mua hàng và sản xuất.
        </AlertDescription>
      </Alert>
    </div>
  )
}

function SupplierStats({ pagination }: { pagination: Pagination }) {
  const totalSuppliers = pagination.totalRecords
  const activeSuppliers = totalSuppliers
  const pausedSuppliers = 0
  const stoppedSuppliers = 0

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SupplierStatCard
        label="Tổng nhà cung cấp"
        value={totalSuppliers}
        description="Tất cả"
        icon={Building2}
        tone="primary"
      />
      <SupplierStatCard
        label="Đang hoạt động"
        value={activeSuppliers}
        description={formatPercent(activeSuppliers, totalSuppliers)}
        icon={CheckCircle2}
        tone="success"
      />
      <SupplierStatCard
        label="Tạm ngưng"
        value={pausedSuppliers}
        description={formatPercent(pausedSuppliers, totalSuppliers)}
        icon={CirclePause}
        tone="warning"
      />
      <SupplierStatCard
        label="Đã ngừng hợp tác"
        value={stoppedSuppliers}
        description={formatPercent(stoppedSuppliers, totalSuppliers)}
        icon={CircleX}
        tone="danger"
      />
    </div>
  )
}

type SupplierStatCardProps = {
  label: string
  value: number
  description: string
  icon: LucideIcon
  tone: "primary" | "success" | "warning" | "danger"
}

function SupplierStatCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: SupplierStatCardProps) {
  return (
    <Card className="min-h-32 gap-0 py-0">
      <CardContent className="flex min-h-32 items-center gap-5 px-6 py-5">
        <span
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded text-current",
            getSupplierStatToneClassName(tone)
          )}
        >
          <Icon className="size-7" />
        </span>
        <div className="min-w-0">
          <p className="text-sm leading-5 font-semibold text-foreground">
            {label}
          </p>
          <p className="mt-2 text-2xl leading-8 font-bold text-foreground">
            {value.toLocaleString("vi-VN")}
          </p>
          <p className="mt-1 text-xs leading-4 font-medium text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function getSupplierStatToneClassName(
  tone: SupplierStatCardProps["tone"]
) {
  switch (tone) {
    case "primary":
      return "bg-primary-fixed text-primary"
    case "success":
      return "bg-success-container/80 text-success"
    case "warning":
      return "bg-tertiary-fixed/80 text-tertiary"
    case "danger":
      return "bg-error-container/60 text-destructive"
  }
}

function formatPercent(value: number, total: number) {
  if (total === 0) {
    return "0%"
  }

  return `${((value / total) * 100).toLocaleString("vi-VN", {
    maximumFractionDigits: 2,
  })}%`
}
