'use client'

import type { Route } from 'next'
import Link, { type LinkProps } from 'next/link'
import {
  IconChevronLeft,
  IconCertificate,
  IconSettings,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface LessonHeaderProps {
  courseTitle: string
  progress: number
  backUrl: LinkProps<Route>['href']
}

export function LessonHeader({
  courseTitle,
  progress,
  backUrl,
}: LessonHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-xl shrink-0"
        >
          <Link href={backUrl}>
            <IconChevronLeft size={20} />
          </Link>
        </Button>
        <div className="h-8 w-px bg-border shrink-0 hidden sm:block" />
        <div className="min-w-0">
          <h1 className="text-sm font-bold truncate text-foreground">
            {courseTitle}
          </h1>
          <div className="flex items-center gap-3 mt-0.5">
            <div className="w-32 hidden xs:block">
              <Progress value={progress} className="h-1" />
            </div>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              {progress}% HOÀN THÀNH
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl hidden md:flex font-bold gap-2"
        >
          <IconCertificate size={16} />
          <span>Chứng chỉ</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <IconSettings size={20} />
        </Button>
      </div>
    </header>
  )
}
