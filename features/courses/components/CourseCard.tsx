'use client'

/* ── Dependencies ────────────────────────────────────────────────────────── */

import Image from 'next/image'
import Link from 'next/link'
import {
  IconArrowRight,
  IconBook,
  IconCircleCheck,
  IconClock,
  IconTrash,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteCourseAction } from '../actions/course.actions'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Course } from '@/features/classes/types/course.type'
import { cn } from '@/lib/utils'
import { Route } from 'next'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/* ── Props ───────────────────────────────────────────────────────────────── */
interface CourseCardProps {
  course: Course
}

/* ── Main Component ──────────────────────────────────────────────────────── */

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter()

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      toast.promise(deleteCourseAction(course.id), {
        loading: 'Đang xóa...',
        success: (result) => {
          if (!result.success) throw new Error(result.message)
          router.refresh()
          return 'Khóa học đã được xóa!'
        },
        error: (err) => err.message || 'Lỗi khi xóa khóa học.',
      })
    }
  }

  return (
    <Card
      variant="flat"
      size="none"
      className="h-full flex flex-col group/card transition-all duration-300 hover:-translate-y-1"
    >
      {/* ── Thumbnail Section ────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover brightness-[0.82] transition-all duration-700 group-hover/card:scale-105 group-hover/card:brightness-100"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-zinc-200 to-zinc-300 transition-transform duration-700 group-hover/card:scale-105" />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />

          {/* ── Badges Overlay ────────────────────────────────────────── */}
          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <Badge
              variant="premium"
              size="xs"
              className={
                course.isPublished ? 'bg-emerald-500/90' : 'bg-zinc-900/70'
              }
            >
              {course.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
            </Badge>
          </div>

          {/* ── Management Actions ───────────────────────────────────── */}
          <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-1 group-hover/card:translate-y-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="glass" size="icon">
                  <Link href={`/courses/${course.id}/curriculum` as Route}>
                    <IconBook size={18} stroke={2.5} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Học liệu</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="glass"
                  size="icon"
                  className="hover:bg-red-600/80"
                  onClick={handleDelete}
                >
                  <IconTrash size={18} stroke={2.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Xóa khóa học</TooltipContent>
            </Tooltip>
          </div>

          {/* ── Content Overlay ──────────────────────────────────────── */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                  Kho nội dung
                </p>
                <p className="line-clamp-2 text-lg font-black leading-tight">
                  {course.title}
                </p>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>

      {/* ── Body Section ─────────────────────────────────────────────── */}
      <CardContent className="p-5 flex flex-col grow space-y-4">
        {/* ── Upper Content ─────────────────────────────────────────── */}
        <div className="space-y-4">
          <p className="line-clamp-2 text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
            {course.description || 'Khóa học chưa có mô tả.'}
          </p>

          <div className="flex flex-wrap gap-2">
            {course.tags.length > 0 ? (
              course.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" size="xs">
                  #{tag}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary" size="xs">
                Chưa gắn tag
              </Badge>
            )}
          </div>
        </div>
        {/* ── Lower Content ─────────────────────────────────────────── */}
        <div className="mt-auto space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="Cập nhật"
              value={
                course.updatedAt
                  ? new Date(course.updatedAt).toLocaleDateString('vi-VN')
                  : 'Vừa xong'
              }
              icon={<IconClock size={14} />}
            />
            <StatBox
              label="Sử dụng"
              value={course.isPublished ? 'Sẵn sàng' : 'Bản nháp'}
              icon={
                <IconCircleCheck
                  size={14}
                  className={
                    course.isPublished ? 'text-emerald-500' : 'text-zinc-400'
                  }
                />
              }
            />
          </div>
        </div>
      </CardContent>

      {/* ── Footer Section ───────────────────────────────────────────── */}
      <CardFooter className="px-5 pt-0 pb-5">
        <Button asChild size="lg" className="w-full">
          <Link href={`/courses/${course.id}` as Route}>
            Xem chi tiết
            <IconArrowRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ── UI Components ────────────────────────────────────────────────────────── */

function StatBox({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="stat-box">
      <p className="stat-box-label">{label}</p>
      <div className="stat-box-value">
        {icon}
        <span className="text-xs font-bold truncate">{value}</span>
      </div>
    </div>
  )
}
