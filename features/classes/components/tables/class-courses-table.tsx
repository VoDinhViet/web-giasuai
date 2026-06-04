"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { SearchX } from "lucide-react"

import { EmptyTable } from "@/components/shared/empty-table"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { ClassCourse } from "../../types"

type ClassCoursesTableProps = {
  courses: ClassCourse[]
}

const columns: ColumnDef<ClassCourse>[] = [
  {
    accessorKey: "courseCode",
    header: "Mã khóa",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.courseCode}
      </span>
    ),
  },
  {
    accessorKey: "courseName",
    header: "Khóa học",
    cell: ({ row }) => (
      <span className="block max-w-96 truncate font-semibold text-foreground">
        {row.original.courseName}
      </span>
    ),
  },
  {
    accessorKey: "required",
    header: "Loại",
    cell: ({ row }) => <CourseTypeBadge required={row.original.required} />,
  },
  {
    accessorKey: "completedLessons",
    header: () => <span className="block text-right">Bài học</span>,
    cell: ({ row }) => (
      <span className="block text-right font-medium text-foreground">
        {row.original.completedLessons}/{row.original.lessonCount}
      </span>
    ),
  },
  {
    id: "progress",
    header: "Tiến độ",
    cell: ({ row }) => {
      const progress = Math.round(
        (row.original.completedLessons /
          Math.max(row.original.lessonCount, 1)) *
          100
      )

      return <ProgressValue value={progress} />
    },
  },
]

export function ClassCoursesTable({ courses }: ClassCoursesTableProps) {
  "use no memo"

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: courses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="min-w-170">
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
          table.getRowModel().rows.map((courseRow) => (
            <TableRow
              key={courseRow.id}
              className="h-14 border-border/45 hover:bg-primary/5"
            >
              {courseRow.getVisibleCells().map((cell) => (
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
                title="Chưa có khóa học"
                description="Lớp học này chưa được gắn khóa học hoặc học liệu nào."
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
    case "courseCode":
      return "w-32"
    case "courseName":
      return "w-80"
    case "required":
      return "w-32"
    case "completedLessons":
      return "w-28"
    case "progress":
      return "w-40"
    default:
      return undefined
  }
}

function CourseTypeBadge({ required }: { required: boolean }) {
  if (required) {
    return (
      <Badge
        variant="outline"
        className="border-primary/20 bg-primary/10 text-primary"
      >
        Bắt buộc
      </Badge>
    )
  }

  return <Badge variant="ghost">Bổ trợ</Badge>
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
