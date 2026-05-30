'use client'

import Link from 'next/link'
import Image from 'next/image'
import { IconArrowRight, IconEdit } from '@tabler/icons-react'

import { Class } from '@/types/class'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { InfoItem } from '@/components/shared/InfoItem'
import { formatDate } from '@/lib/date'

import { EditClassDialog } from './EditClassDialog'
import { CLASS_STATUS_LABEL } from '../constants/class.constant'

interface ClassCardProps {
  classData: Class
}

const DEFAULT_THUMBNAIL =
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop'
const DEFAULT_EMPTY_VALUE = '--'

type ClassStatus = 'active' | 'inactive'

export function ClassCard({ classData }: ClassCardProps) {
  const status: ClassStatus = classData.isActive ? 'active' : 'inactive'
  const thumbnailSrc = classData.thumbnail || DEFAULT_THUMBNAIL
  const description = classData.description || DEFAULT_EMPTY_VALUE
  const teacherName = classData.teacher?.fullName || DEFAULT_EMPTY_VALUE
  const infoItems = [
    { label: 'Mã lớp', value: classData.code || DEFAULT_EMPTY_VALUE },
    { label: 'Giảng viên', value: teacherName },
    { label: 'Sĩ số', value: `${classData.studentCount || 0} học sinh` },
    { label: 'Ngày tạo', value: formatDate(classData.createdAt) },
  ]

  return (
    <div className="h-full *:data-[slot=card]:h-full">
      <Card size="none">
        <div className="relative w-full overflow-hidden rounded-t-lg">
          <AspectRatio ratio={16 / 9}>
            <div className="relative h-full w-full">
              <Image
                src={thumbnailSrc}
                alt={classData.name}
                fill
                sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover brightness-[0.7] grayscale-[0.2] transition-all duration-700 ease-in-out group-hover/card:brightness-100 group-hover/card:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </div>
          </AspectRatio>

          <div className="absolute right-3 top-3 z-10">
            <Badge variant={classData.isActive ? 'success' : 'secondary'}>
              {CLASS_STATUS_LABEL[status]}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-4">
          <div className="space-y-1.5">
            <CardHeader>
              <div className="line-clamp-1">
                <CardTitle>{classData.name}</CardTitle>
              </div>
              <div className="min-h-10 line-clamp-2 whitespace-normal break-words">
                <CardDescription>{description}</CardDescription>
              </div>
            </CardHeader>
          </div>

          <CardContent>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {infoItems.map((item) => (
                <InfoItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </CardContent>

          <div className="mt-auto grid grid-cols-[minmax(5.25rem,0.38fr)_1fr] gap-2">
            <EditClassDialog
              classData={classData}
              trigger={
                <Button variant="outline">
                  <IconEdit size={14} />
                  Sửa
                </Button>
              }
            />

            <Button asChild>
              <Link href={`/manage/classes/${classData.id}`}>
                Chi tiết
                <IconArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
