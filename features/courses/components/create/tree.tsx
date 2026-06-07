import { 
  BookOpen, 
  FileSpreadsheet, 
  Clock, 
  PlayCircle, 
  HelpCircle, 
  FileText,
  FolderOpen
} from "lucide-react"

import { formatNumber } from "@/lib/number.util"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ImportStatusBadge } from "./status-badge"
import type {
  ChapterImportRow,
  CourseImportRow,
  LessonImportRow,
} from "./types"

function getLessonTypeIcon(type: string) {
  const lower = type.toLowerCase()
  if (lower.includes("video")) return PlayCircle
  if (lower.includes("quiz")) return HelpCircle
  if (lower.includes("exercise") || lower.includes("bài tập")) return FileText
  return BookOpen
}

export function CourseImportTree({
  courses,
  chapters,
  lessons,
}: {
  courses: CourseImportRow[]
  chapters: ChapterImportRow[]
  lessons: LessonImportRow[]
}) {
  return (
    <div className="space-y-6">
      {courses.map((course) => {
        const courseChapters = chapters
          .filter((chapter) => chapter.courseCode === course.courseCode)
          .sort(
            (firstChapter, secondChapter) =>
              firstChapter.order - secondChapter.order
          )

        return (
          <div
            key={course.courseCode}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-xs"
          >
            {/* Khóa học Header */}
            <div className="flex flex-col gap-4 border-b border-border bg-muted/20 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-bold tracking-wider uppercase bg-background border-border/80 text-muted-foreground">
                    Dòng {course.rowNumber}
                  </Badge>
                  <Badge variant="secondary" className="font-mono font-bold text-foreground">
                    {course.courseCode}
                  </Badge>
                  <ImportStatusBadge status={course.status} />
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted border text-muted-foreground shadow-2xs">
                    <FileSpreadsheet className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-base text-foreground leading-snug">
                      {course.courseName}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-muted-foreground/80">
                      <span className="font-semibold text-foreground/75">{course.category}</span>
                      {course.note ? ` · ${course.note}` : ""}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/85">Chương học</p>
                  <p className="text-lg font-bold text-foreground font-mono mt-0.5">{formatNumber(courseChapters.length)}</p>
                </div>
                <div className="h-8 w-px bg-border/60" />
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/85">Bài học</p>
                  <p className="text-lg font-bold text-foreground font-mono mt-0.5">
                    {formatNumber(courseChapters.reduce(
                      (total, chapter) =>
                        total +
                        lessons.filter(
                          (lesson) => lesson.chapterCode === chapter.chapterCode
                        ).length,
                      0
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion list các chương */}
            {courseChapters.length > 0 ? (
              <Accordion type="multiple" className="w-full">
                {courseChapters.map((chapter) => {
                  const chapterLessons = lessons.filter(
                    (lesson) => lesson.chapterCode === chapter.chapterCode
                  )

                  return (
                    <AccordionItem
                      key={chapter.chapterCode}
                      value={chapter.chapterCode}
                      className="px-5 border-b border-border/60 last:border-0"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-3 text-left">
                          <FolderOpen className="size-4 text-muted-foreground shrink-0" />
                          <div className="min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-sm text-foreground leading-none">
                                {chapter.chapterTitle}
                              </p>
                              <Badge variant="outline" className="font-mono text-[10px] py-0 px-1.5 text-muted-foreground border-border/70">
                                {chapter.chapterCode}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground/80 font-normal">
                              Thứ tự {chapter.order} · Dòng {chapter.rowNumber} {chapter.note ? `· ${chapter.note}` : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pr-2 shrink-0">
                          <span className="text-xs font-semibold text-muted-foreground/80 bg-muted/65 px-2 py-0.5 rounded border border-border/40">
                            {chapterLessons.length} bài
                          </span>
                          <ImportStatusBadge status={chapter.status} />
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="pb-5 pt-1">
                        {chapterLessons.length > 0 ? (
                          <div className="rounded-lg border overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                  <TableHead className="w-auto pl-4">Bài học</TableHead>
                                  <TableHead className="w-32">Loại bài</TableHead>
                                  <TableHead className="w-28">Thời lượng</TableHead>
                                  <TableHead className="w-24 text-right pr-4">Trạng thái</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {chapterLessons.map((lesson) => {
                                  const TypeIcon = getLessonTypeIcon(lesson.lessonType)

                                  return (
                                    <TableRow
                                      key={`${lesson.chapterCode}-${lesson.rowNumber}`}
                                    >
                                      <TableCell className="pl-4 py-3">
                                        <div className="flex items-start gap-2.5">
                                          <TypeIcon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                                          <div className="min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate">
                                              {lesson.lessonTitle}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground/80 mt-0.5">
                                              Dòng {lesson.rowNumber} · <span className="font-mono">{lesson.lessonCode || "Thiếu mã"}</span> {lesson.note ? `· ${lesson.note}` : ""}
                                            </p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      
                                      <TableCell className="py-3">
                                        <Badge variant="outline" className="text-[10px] font-medium border-border/70">
                                          {lesson.lessonType}
                                        </Badge>
                                      </TableCell>
                                      
                                      <TableCell className="py-3 text-xs text-muted-foreground/85">
                                        <div className="flex items-center gap-1">
                                          <Clock className="size-3.5 text-muted-foreground/60 shrink-0" />
                                          {lesson.duration}
                                        </div>
                                      </TableCell>
                                      
                                      <TableCell className="py-3 text-right pr-4">
                                        <ImportStatusBadge status={lesson.status} />
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-border/60 bg-muted/5 py-4 text-center text-xs text-muted-foreground/80 italic">
                            Chương này chưa có bài học.
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            ) : (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Chưa có chương nào được ghép với khóa học này.
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
