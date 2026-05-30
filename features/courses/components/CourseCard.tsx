'use client'

import type { MouseEvent, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconArrowRight,
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
import { Card } from '@/components/ui/card'
import type { Course } from '@/features/classes/types/course.type'
import { Route } from 'next'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatDate } from '@/lib/date'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter()

  const handleDelete = (e: MouseEvent) => {
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
    <div className="h-full *:data-[slot=card]:h-full">
      <Card size="none">
        <div className="relative w-full overflow-hidden rounded-t-xl">
          <AspectRatio ratio={16 / 9}>
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-muted" />
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/15" />

            <div className="absolute left-4 top-4">
              <Badge
                variant={course.isPublished ? 'success' : 'secondary'}
                size="xs"
                className={cn(
                  'backdrop-blur-md',
                  course.isPublished
                    ? 'bg-emerald-500 text-white ring-emerald-400/30'
                    : 'bg-white/15 text-white ring-white/20',
                )}
              >
                {course.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
              </Badge>
            </div>

            <div className="absolute right-4 top-4 flex translate-y-1 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon" onClick={handleDelete}>
                    <IconTrash size={18} stroke={2.5} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Xóa khóa học</TooltipContent>
              </Tooltip>
            </div>
          </AspectRatio>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Kho nội dung
              </p>
              <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-tight text-foreground">
                {course.title}
              </h3>
            </div>

            <p className="line-clamp-2 text-sm font-medium leading-6 text-muted-foreground">
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

          <div className="mt-auto space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <StatBox
                label="Cập nhật"
                value={formatDate(course.updatedAt)}
                icon={<IconClock size={14} />}
              />
              <StatBox
                label="Sử dụng"
                value={course.isPublished ? 'Sẵn sàng' : 'Bản nháp'}
                icon={
                  <IconCircleCheck
                    size={14}
                    className={
                      course.isPublished ? 'text-emerald-500' : 'text-muted-foreground'
                    }
                  />
                }
              />
            </div>

            <Button asChild>
              <Link href={`/manage/courses/${course.id}` as Route} className='w-full'>
                Xem chi tiết
                <IconArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: ReactNode
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2 text-foreground">
        {icon}
        <span className="truncate text-xs font-bold">{value}</span>
      </div>
    </div>
  )
}
