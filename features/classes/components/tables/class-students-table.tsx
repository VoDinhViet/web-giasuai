"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { SearchX } from "lucide-react"
import type { Route } from "next"
import Link from "next/link"

import { EmptyTable } from "@/components/shared/empty-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { ClassStudent, ClassStudentStatus } from "../../types"

type ClassStudentsTableProps = {
  students: ClassStudent[]
}

const columns: ColumnDef<ClassStudent>[] = [
  {
    accessorKey: "studentCode",
    header: "Mã HV",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.studentCode}
      </span>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Học viên",
    cell: ({ row }) => (
      <div className="min-w-0">
        <Link
          href={`/manage/students/${row.original.studentCode}` as Route}
          className="font-medium text-foreground hover:text-primary hover:underline"
        >
          {row.original.fullName}
        </Link>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "attendanceRate",
    header: () => <span className="block text-right">Điểm danh</span>,
    cell: ({ row }) => (
      <span className="block text-right font-medium text-foreground">
        {row.original.attendanceRate}%
      </span>
    ),
  },
  {
    accessorKey: "progressPercent",
    header: "Tiến độ",
    cell: ({ row }) => <ProgressValue value={row.original.progressPercent} />,
  },
  {
    accessorKey: "averageScore",
    header: () => <span className="block text-right">Điểm TB</span>,
    cell: ({ row }) => (
      <span className="block text-right font-medium text-foreground">
        {row.original.averageScore || "--"}
      </span>
    ),
  },
  {
    accessorKey: "lastActive",
    header: "Hoạt động cuối",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.lastActive ?? "--"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => <StudentStatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: () => <span className="block text-right">Thao tác</span>,
    cell: ({ row }) => (
      <div className="text-right">
        <Button type="button" variant="outline" size="sm" asChild>
          <Link href={`/manage/students/${row.original.studentCode}` as Route}>
            Chi tiết
          </Link>
        </Button>
      </div>
    ),
  },
]

export function ClassStudentsTable({ students }: ClassStudentsTableProps) {
  "use no memo"

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="min-w-230">
      <TableHeader className="bg-muted/20">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="border-border/60 hover:bg-transparent"
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  "h-11 border-r border-border/60 px-3 text-xs font-bold text-foreground last:border-r-0",
                  getColumnClassName(header.column.id)
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((studentRow) => (
            <TableRow
              key={studentRow.id}
              className="h-14 border-border/45 hover:bg-primary/5"
            >
              {studentRow.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "border-r border-border/50 px-3 py-2 last:border-r-0",
                    getColumnClassName(cell.column.id)
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="p-0 whitespace-normal"
            >
              <EmptyTable
                title="Chưa có học viên"
                description="Lớp học này chưa có học viên nào được ghi danh."
                icon={<SearchX className="size-5" />}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function getColumnClassName(columnId: string) {
  switch (columnId) {
    case "studentCode":
      return "w-28"
    case "fullName":
      return "w-64"
    case "attendanceRate":
      return "w-32"
    case "progressPercent":
      return "w-36"
    case "averageScore":
      return "w-28"
    case "lastActive":
      return "w-36"
    case "status":
      return "w-32"
    case "actions":
      return "w-28"
    default:
      return undefined
  }
}

function ProgressValue({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 overflow-hidden rounded bg-muted">
        <div
          className="h-full rounded bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-foreground">{value}%</span>
    </div>
  )
}

function StudentStatusBadge({ status }: { status: ClassStudentStatus }) {
  const statusMap = {
    GOOD: {
      label: "Ổn định",
      variant: "ghost",
      className: "bg-success-container/80 text-success ring-1 ring-success/20",
    },
    WARNING: {
      label: "Cần nhắc",
      variant: "outline",
      className: "border-primary/20 bg-primary/10 text-primary",
    },
    RISK: {
      label: "Rủi ro",
      variant: "destructive",
      className: "ring-1 ring-destructive/20",
    },
  } satisfies Record<
    ClassStudentStatus,
    {
      label: string
      variant: "destructive" | "ghost" | "outline"
      className: string
    }
  >

  const statusMeta = statusMap[status]

  return (
    <Badge variant={statusMeta.variant} className={statusMeta.className}>
      {statusMeta.label}
    </Badge>
  )
}
