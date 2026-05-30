'use client'

import * as React from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import {
  IconBook2,
  IconClock,
  IconChevronRight,
  IconHome,
  IconPlayerPlay,
  IconLock,
  IconCheck,
  IconX,
  IconAward,
  IconHelpCircle,
  IconArrowRight,
  IconChevronLeft,
  IconVolume,
  IconSettings,
  IconMaximize,
  IconTerminal,
  IconCode,
  IconNotebook,
  IconDownload,
  IconSparkles,
  IconRefresh,
  IconCircleCheck
} from '@tabler/icons-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { getCourseDetail } from "@/features/courses/actions/get-course-detail"
import { getCourseOutline } from "@/features/courses/actions/get-course-outline"
import type { Course } from '@/features/classes/types/course.type'
import type { CourseOutline, SectionOutline, LessonOutline } from '@/features/courses/actions/get-course-outline'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

/* ─── Theory Session Mock ────────────────────────────────────────────────── */
interface TheoryItem {
  title: string;
  desc: string;
}

interface TheorySession {
  id: string;
  title: string;
  description: string;
  items: TheoryItem[];
}

const THEORY_SESSIONS: TheorySession[] = [
  {
    id: "session-1",
    title: "Kiến trúc Next.js 15 & NestJS Hiện đại",
    description: "Khám phá cách Next.js 15 và NestJS nâng cấp mô hình phát triển full-stack chuyên nghiệp, tối ưu hoá SEO và SSR.",
    items: [
      { title: "App Router & CLI", desc: "Cơ chế routing dựa trên file-system nâng cao kết hợp CLI mạnh mẽ giúp tự động hoá quy trình khởi tạo." },
      { title: "Server Actions & Module", desc: "Xử lý logic trực tiếp phía server tối ưu và chia module độc lập, gọn gàng, tăng cường độ an toàn dữ liệu." },
    ]
  },
  {
    id: "session-2",
    title: "Tối ưu hóa & Hiệu suất Hệ thống",
    description: "Các kỹ thuật nâng cao để đảm bảo ứng dụng luôn đạt điểm số Core Web Vitals tối đa, giảm thiểu độ trễ phản hồi.",
    items: [
      { title: "Streaming & Caching", desc: "Hiển thị giao diện tức thời thông qua Suspense trong khi tải dữ liệu ngầm ở backend song song." },
      { title: "Drizzle ORM", desc: "Tương tác cơ sở dữ liệu tốc độ cực hạn với type-safe tuyệt đối và quan hệ schema tối ưu." },
    ]
  }
];

/* ─── Quiz Questions Mock ────────────────────────────────────────────────── */
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Thành phần nào trong Next.js được sử dụng để quản lý layout của trang?",
    options: ["layout.tsx", "page.tsx", "route.ts", "loading.tsx"],
    correctAnswer: 0,
  },
  {
    id: 2,
    text: "Cách tốt nhất để fetch dữ liệu an toàn từ database trong Next.js App Router là gì?",
    options: ["Dùng Server Actions / Server Component", "Fetch client-side qua URL public", "Viết SQL chay ở client component", "Không cần bảo mật"],
    correctAnswer: 0,
  }
];

export default function StudentCourseStudyPage() {
  const params = useParams()
  const courseId = params?.courseId as string

  const [course, setCourse] = React.useState<Course | null>(null)
  const [courseOutline, setCourseOutline] = React.useState<CourseOutline | null>(null)
  const [loading, setLoading] = React.useState(true)

  // Active Lesson & Steps State
  const [activeLessonId, setActiveLessonId] = React.useState<string | null>(null)
  const [activeStep, setActiveStep] = React.useState<string>("theory")
  
  // Lesson Progress / Interactive States
  const [currentSessionIdx, setCurrentSessionIdx] = React.useState(0)
  const [quizIdx, setQuizIdx] = React.useState(0)
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null)
  const [isQuizSubmitted, setIsQuizSubmitted] = React.useState(false)

  // Interactive IDE Sandbox State
  const [sandboxTab, setSandboxTab] = React.useState<"editor" | "console" | "preview">("editor")
  const [editorCode, setEditorCode] = React.useState<string>("")
  const [consoleLogs, setConsoleLogs] = React.useState<string[]>([
    "System: Sandbox initialized successfully.",
    "Ready for compilation."
  ])
  const [isRunningCode, setIsRunningCode] = React.useState(false)

  // Personal Notebook State
  const [personalNotes, setPersonalNotes] = React.useState<string>("")

  // Load Course and Outline
  React.useEffect(() => {
    if (!courseId) return
    setLoading(true)
    Promise.all([
      getCourseDetail(courseId).catch(() => null),
      getCourseOutline(courseId).catch(() => null)
    ]).then(([courseData, outlineData]) => {
      if (!courseData) {
        notFound()
        return
      }
      setCourse(courseData)
      setCourseOutline(outlineData)
      
      // Auto-set the first lesson as active
      const firstLesson = outlineData?.sections?.[0]?.lessons?.[0]
      if (firstLesson) {
        setActiveLessonId(firstLesson.id)
      }
      setLoading(false)
    })
  }, [courseId])

  // Initialize Code & Notes when lesson changes
  const activeLesson = courseOutline?.sections
    .flatMap(s => s.lessons)
    .find(l => l.id === activeLessonId)

  React.useEffect(() => {
    if (!activeLesson) return
    // Mock code generator based on lesson
    setEditorCode(`import React from 'react';\n\nexport default function ${activeLesson.title.replace(/[^a-zA-Z0-9]/g, "") || "App"}() {\n  return (\n    <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl space-y-2">\n      <h1 className="text-xl font-bold text-primary">${activeLesson.title}</h1>\n      <p className="text-sm text-muted-foreground">Thời gian học ước tính: ${activeLesson.durationText}</p>\n      <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold">Bắt đầu học ngay</button>\n    </div>\n  );\n}`)
    
    // Load notes from localStorage
    const savedNote = localStorage.getItem(`note-${courseId}-${activeLesson.id}`)
    setPersonalNotes(savedNote || "")

    // Reset Sandbox state
    setSandboxTab("editor")
    setConsoleLogs([
      `System: Initialized sandbox for lesson "${activeLesson.title}"`,
      "Ready to execute..."
    ])
  }, [activeLessonId, courseId])

  // Auto-save notes
  const handleSaveNotes = () => {
    if (!activeLesson) return
    localStorage.setItem(`note-${courseId}-${activeLesson.id}`, personalNotes)
    toast.success("Đã tự động lưu ghi chú bài học vào trình duyệt!")
  }

  // Export Notes
  const handleExportNotes = () => {
    if (!activeLesson) return
    const blob = new Blob([`Ghi chú bài học: ${activeLesson.title}\nKhóa học: ${course?.title || ""}\n\n${personalNotes}`], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ghi-chu-${activeLesson.id}.txt`
    link.click()
    toast.success("Đã tải tệp ghi chú thành công!")
  }

  // Compile Code simulator
  const handleRunCode = () => {
    setIsRunningCode(true)
    setSandboxTab("console")
    setConsoleLogs(prev => [...prev, "> pnpm run dev", "> Starting development server...", "> Compiling modules..."])

    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        "> ✓ Compiled successfully in 840ms",
        "> [Vite] Hot Module Replacement enabled",
        "> [React Engine] Rendered dynamic study node correctly.",
        "System: Done! Check the Preview tab to see visual interface."
      ])
      setIsRunningCode(false)
      setSandboxTab("preview")
      toast.success("Biên dịch mã nguồn thành công!")
    }, 1200)
  }

  if (loading || !course) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground font-semibold">Đang chuẩn bị không gian học tập chuyên nghiệp...</p>
        </div>
      </div>
    )
  }

  // Calculate Course Progress Percent
  const totalLessons = courseOutline?.totalLessons || 0
  const completedLessons = courseOutline?.sections.reduce(
    (sum, s) => sum + s.lessons.filter(l => l.isCompleted).length,
    0
  ) || 0
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Handle accordion expand
  const activeChapterIndex = courseOutline?.sections.findIndex(section => 
    section.lessons.some(lesson => lesson.id === activeLessonId)
  ) || 0
  const defaultExpanded = [`chapter-${activeChapterIndex}`]

  return (
    <div className="mx-auto max-w-[1440px] w-full px-4 py-6 sm:px-6 lg:px-8 space-y-6 pb-20">
      {/* Dynamic Header */}
      <div className="bg-linear-to-r from-primary/10 via-background to-background border border-primary/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs">
        <div className="space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/manage" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <IconHome size={14} />
                    <span>Trang chủ</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <IconChevronRight size={12} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/manage/courses" className="text-muted-foreground hover:text-primary transition-colors font-medium">Thư viện</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <IconChevronRight size={12} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[240px] truncate font-bold text-foreground">
                  {course.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">{course.title}</h1>
            <Badge variant="success" className="rounded-full px-3 py-0.5 text-[10px] tracking-wider uppercase bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              Đang học
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-medium max-w-2xl">Chào mừng bạn! Hãy tiếp tục hành trình học tập, hoàn thiện các thử thách và nhận chứng chỉ danh giá.</p>
        </div>

        {/* Dynamic Streak Widget */}
        <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-border p-4 rounded-2xl shrink-0 shadow-xs">
          <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
            <IconSparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Streak hiện tại</div>
            <div className="text-lg font-black text-foreground mt-1">3 ngày liên tiếp 🔥</div>
          </div>
        </div>
      </div>

      {/* Split-Screen Main Container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        
        {/* Left Column: Interactive Study Space */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-border bg-white dark:bg-zinc-950 overflow-hidden shadow-xs">
            {/* Header displaying selected Lesson Title */}
            <CardHeader className="border-b border-border bg-muted/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <span className="size-1.5 bg-primary rounded-full animate-ping" />
                  Không gian tương tác
                </span>
                <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                  {activeLesson?.title || "Vui lòng chọn bài học từ danh mục"}
                </h2>
              </div>
              
              {/* Tabs for Theory, Video/Practice, and Quiz */}
              <Tabs value={activeStep} onValueChange={setActiveStep} className="shrink-0">
                <TabsList>
                  <TabsTrigger value="theory">Lý thuyết</TabsTrigger>
                  <TabsTrigger value="practice">Thực hành</TabsTrigger>
                  <TabsTrigger value="quiz">Trắc nghiệm & Quiz</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            {/* Main Interactive Contents */}
            <CardContent className="p-6 min-h-[520px] flex flex-col justify-between">
              {activeLesson ? (
                <>
                  {/* STEP 1: THEORY */}
                  {activeStep === "theory" && (
                    <div className="space-y-8 animate-in fade-in duration-300 flex-1 flex flex-col justify-between">
                      <div className="space-y-8">
                        {/* Session Mini-Progress */}
                        <div className="flex gap-2">
                          {THEORY_SESSIONS.map((_, idx) => (
                            <div 
                              key={idx} 
                              className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                idx <= currentSessionIdx ? 'bg-primary' : 'bg-zinc-100 dark:bg-zinc-900'
                              )}
                            />
                          ))}
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-4">
                          <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            MỤC HỌC {currentSessionIdx + 1} / {THEORY_SESSIONS.length}
                          </span>
                          <h3 className="text-2xl font-black tracking-tight text-foreground">
                            {THEORY_SESSIONS[currentSessionIdx].title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                            {THEORY_SESSIONS[currentSessionIdx].description}
                          </p>
                        </div>

                        {/* Beautiful Info Box */}
                        <div className="p-4 rounded-xl border border-primary/10 bg-primary/5 flex gap-3 text-xs leading-relaxed text-foreground">
                          <IconHelpCircle size={18} className="text-primary shrink-0" />
                          <div>
                            <span className="font-bold text-primary">Lời khuyên của GiaSuAI:</span> Đọc kỹ các khái niệm cơ bản này trước khi chuyển sang phần thực hành viết code và chạy thử nghiệm ở bước sau.
                          </div>
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {THEORY_SESSIONS[currentSessionIdx].items.map((item, idx) => (
                            <div key={idx} className="p-5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 hover:border-primary transition-colors group space-y-2">
                              <h4 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                                <IconArrowRight size={14} className="text-zinc-300 group-hover:translate-x-1 transition-transform" />
                                {item.title}
                              </h4>
                              <p className="text-muted-foreground leading-relaxed text-xs">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Navigation */}
                      <div className="flex items-center justify-between pt-10 border-t border-border mt-12">
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentSessionIdx(prev => prev - 1)}
                          disabled={currentSessionIdx === 0}
                        >
                          <IconChevronLeft size={16} />
                          Mục trước
                        </Button>

                        {currentSessionIdx === THEORY_SESSIONS.length - 1 ? (
                          <Button
                            onClick={() => {
                              setActiveStep("practice")
                              setCurrentSessionIdx(0)
                            }}
                          >
                            Sang Thực hành
                            <IconChevronRight size={16} />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => setCurrentSessionIdx(prev => prev + 1)}
                          >
                            Mục sau
                            <IconChevronRight size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PRACTICE & IDE SANDBOX */}
                  {activeStep === "practice" && (
                    <div className="space-y-8 animate-in fade-in duration-300 flex-1 flex flex-col justify-between">
                      <div className="space-y-6">
                        {/* Video Panel */}
                        <div className="aspect-video relative group bg-zinc-950 overflow-hidden shadow-lg rounded-2xl border border-border">
                          {/* Video Placeholder */}
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                            <button className="relative size-16 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-2xl hover:scale-105 transition-all group/play z-10">
                              <IconPlayerPlay size={20} fill="currentColor" />
                            </button>
                            <div className="absolute top-6 left-6 text-left">
                              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Video Bài Giảng</span>
                              <h4 className="text-white font-bold text-sm">{activeLesson.title}</h4>
                            </div>
                          </div>

                          {/* Controls bar */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="space-y-2">
                              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer relative group/progress">
                                <div className="absolute inset-y-0 left-0 w-1/3 bg-primary" />
                              </div>
                              <div className="flex items-center justify-between text-white/80 text-[10px] font-bold">
                                <div className="flex items-center gap-3">
                                  <IconPlayerPlay size={12} className="cursor-pointer hover:text-white" />
                                  <span>03:40 / {activeLesson.durationText}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <IconVolume size={12} />
                                  <IconSettings size={12} />
                                  <IconMaximize size={12} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive IDE Mock Sandbox */}
                        <div className="border border-border rounded-2xl overflow-hidden shadow-xs">
                          {/* IDE Header */}
                          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <IconTerminal size={16} className="text-primary" />
                              <span className="text-xs font-bold text-zinc-300 font-mono">GiasuAI Sandbox CLI</span>
                            </div>
                            
                            {/* Inner sandbox tab selectors */}
                            <div className="flex items-center gap-2">
                              <Tabs value={sandboxTab} onValueChange={(v) => setSandboxTab(v as any)}>
                                <TabsList className="bg-zinc-800 border-none p-0.5 h-8">
                                  <TabsTrigger value="editor" className="text-[10px] py-1 px-2.5 font-bold data-[state=active]:bg-zinc-950 data-[state=active]:text-white">
                                    <IconCode size={11} className="mr-1" /> Editor
                                  </TabsTrigger>
                                  <TabsTrigger value="console" className="text-[10px] py-1 px-2.5 font-bold data-[state=active]:bg-zinc-950 data-[state=active]:text-white">
                                    <IconTerminal size={11} className="mr-1" /> Console
                                  </TabsTrigger>
                                  <TabsTrigger value="preview" className="text-[10px] py-1 px-2.5 font-bold data-[state=active]:bg-zinc-950 data-[state=active]:text-white">
                                    <IconMaximize size={11} className="mr-1" /> Preview
                                  </TabsTrigger>
                                </TabsList>
                              </Tabs>
                              
                              <Button
                                size="sm"
                                disabled={isRunningCode}
                                onClick={handleRunCode}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] h-7 px-3 gap-1 rounded-md"
                              >
                                <IconRefresh size={10} className={cn(isRunningCode && "animate-spin")} />
                                {isRunningCode ? "Đang chạy..." : "Chạy code"}
                              </Button>
                            </div>
                          </div>

                          {/* IDE Workspace Area */}
                          <div className="bg-zinc-950 min-h-[220px] p-4 font-mono text-xs relative">
                            {sandboxTab === "editor" && (
                              <textarea
                                value={editorCode}
                                onChange={(e) => setEditorCode(e.target.value)}
                                className="w-full min-h-[190px] bg-transparent text-zinc-300 border-none outline-none resize-none leading-relaxed focus:ring-0 focus:outline-none"
                              />
                            )}

                            {sandboxTab === "console" && (
                              <div className="space-y-1 text-zinc-400">
                                {consoleLogs.map((log, idx) => (
                                  <p 
                                    key={idx} 
                                    className={cn(
                                      log.startsWith("Error") ? "text-rose-400" :
                                      log.startsWith("Success") || log.startsWith("System") ? "text-emerald-400" : "text-zinc-500"
                                    )}
                                  >
                                    {log}
                                  </p>
                                ))}
                              </div>
                            )}

                            {sandboxTab === "preview" && (
                              <div className="bg-white text-zinc-900 p-6 rounded-xl border border-zinc-100 flex items-center justify-center min-h-[190px]">
                                <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl space-y-2 text-center w-full max-w-sm">
                                  <h1 className="text-lg font-black text-primary">{activeLesson.title}</h1>
                                  <p className="text-[11px] text-zinc-500 font-semibold">Sandbox Preview Rendered successfully!</p>
                                  <Badge variant="success" className="mx-auto rounded-full bg-emerald-500/10 text-emerald-600">Đã đồng bộ</Badge>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer controls */}
                      <div className="flex items-center justify-between pt-10 border-t border-border mt-12">
                        <Button
                          variant="ghost"
                          onClick={() => setActiveStep("theory")}
                        >
                          <IconChevronLeft size={16} />
                          Quay lại Lý thuyết
                        </Button>
                        <Button
                          onClick={() => setActiveStep("quiz")}
                        >
                          Làm bài trắc nghiệm
                          <IconChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: QUIZ TEST */}
                  {activeStep === "quiz" && (
                    <div className="space-y-8 animate-in fade-in duration-300 flex-1 flex flex-col justify-between">
                      <div className="space-y-8">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            CÂU HỎI {quizIdx + 1} / {QUIZ_QUESTIONS.length}
                          </span>
                          <span className="text-lg font-black text-foreground">
                            {quizIdx + 1} <span className="text-muted-foreground font-bold text-xs">/ {QUIZ_QUESTIONS.length}</span>
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground leading-relaxed">
                          {QUIZ_QUESTIONS[quizIdx].text}
                        </h3>

                        <div className="grid gap-3">
                          {QUIZ_QUESTIONS[quizIdx].options.map((option, idx) => {
                            const isCorrect = idx === QUIZ_QUESTIONS[quizIdx].correctAnswer
                            const isSelected = idx === selectedOption

                            return (
                              <button
                                key={idx}
                                disabled={isQuizSubmitted}
                                onClick={() => setSelectedOption(idx)}
                                className={cn(
                                  "w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left !no-underline hover:!no-underline cursor-pointer",
                                  !isQuizSubmitted && isSelected && "border-primary bg-primary/5 text-primary",
                                  !isQuizSubmitted && !isSelected && "border-zinc-100 dark:border-zinc-900 bg-transparent hover:border-zinc-200 dark:hover:border-zinc-800",
                                  isQuizSubmitted && isCorrect && "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
                                  isQuizSubmitted && isSelected && !isCorrect && "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400",
                                  isQuizSubmitted && !isSelected && !isCorrect && "opacity-40 border-zinc-100 dark:border-zinc-900"
                                )}
                              >
                                <span className="font-bold text-[13px]">{option}</span>
                                {isQuizSubmitted && isCorrect && <IconCheck className="text-emerald-500 shrink-0" size={18} />}
                                {isQuizSubmitted && isSelected && !isCorrect && <IconX className="text-rose-500 shrink-0" size={18} />}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Footer controls */}
                      <div className="flex items-center justify-between pt-10 border-t border-border mt-12">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setActiveStep("practice")
                            setIsQuizSubmitted(false)
                            setSelectedOption(null)
                            setQuizIdx(0)
                          }}
                        >
                          <IconChevronLeft size={16} />
                          Quay lại Thực hành
                        </Button>

                        {!isQuizSubmitted ? (
                          <Button
                            disabled={selectedOption === null}
                            onClick={() => setIsQuizSubmitted(true)}
                          >
                            Nộp câu trả lời
                          </Button>
                        ) : (
                          <>
                            {quizIdx < QUIZ_QUESTIONS.length - 1 ? (
                              <Button
                                onClick={() => {
                                  setQuizIdx(prev => prev + 1)
                                  setIsQuizSubmitted(false)
                                  setSelectedOption(null)
                                }}
                              >
                                Câu tiếp theo
                                <IconArrowRight size={16} />
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  toast.success("Chúc mừng bạn đã hoàn thành bài học xuất sắc!")
                                  setIsQuizSubmitted(false)
                                  setSelectedOption(null)
                                  setQuizIdx(0)
                                }}
                              >
                                Hoàn thành bài học
                                <IconCheck size={16} />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 space-y-3">
                  <IconBook2 size={40} className="text-zinc-300" />
                  <h4 className="text-lg font-bold text-foreground">Chọn bài học để học tập</h4>
                  <p className="text-sm text-muted-foreground max-w-sm">Chọn bất cứ bài học nào từ danh mục Đề cương bên phải để bắt đầu hành trình học tập.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Curriculum Accordion & Notebook Sidebar */}
        <div className="space-y-6">
          {/* Progress Widget */}
          <Card className="rounded-2xl border-border bg-white dark:bg-zinc-950 p-6 space-y-4 shadow-xs">
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">TIẾN ĐỘ HỌC TẬP</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-foreground">{progressPercent}%</span>
                <span className="text-xs text-muted-foreground font-medium">Hoàn thành</span>
              </div>
            </div>
            <Progress value={progressPercent} className="h-2 bg-zinc-100 dark:bg-zinc-900" />
            <p className="text-[11px] font-semibold text-muted-foreground">
              Đã hoàn thành {completedLessons} trên tổng số {totalLessons} bài học.
            </p>
          </Card>

          {/* Curriculum Chapters Accordion */}
          <Card className="rounded-2xl border-border bg-white dark:bg-zinc-950 p-6 space-y-5 shadow-xs">
            <div className="space-y-1">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                NỘI DUNG HỌC TẬP
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                ĐỀ CƯƠNG CHI TIẾT
              </p>
            </div>
            
            <Accordion type="multiple" defaultValue={defaultExpanded} className="w-full space-y-1">
              {courseOutline?.sections.map((section, idx) => (
                <AccordionItem
                  key={section.id || idx}
                  value={`chapter-${idx}`}
                  className="border-none"
                >
                  <AccordionTrigger className="hover:no-underline py-2.5 px-2 rounded-lg hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 transition-all text-zinc-600 dark:text-zinc-400 [&[data-state=open]]:bg-zinc-50 dark:[&[data-state=open]]:bg-zinc-900/40">
                    <ChapterHeader index={idx} title={section.title} />
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2 px-1">
                    <div className="space-y-1.5 pl-2 border-l border-zinc-100 dark:border-zinc-800 ml-3.5 mt-1">
                      {section.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          disabled={lesson.isLocked}
                          onClick={() => {
                            setActiveLessonId(lesson.id)
                            setActiveStep("theory")
                            setCurrentSessionIdx(0)
                            setQuizIdx(0)
                            setSelectedOption(null)
                            setIsQuizSubmitted(false)
                          }}
                          className={cn(
                            "flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-200 border w-full text-left !no-underline hover:!no-underline",
                            lesson.isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                            activeLessonId === lesson.id 
                              ? "bg-primary border-primary text-primary-foreground shadow-xs" 
                              : "bg-white border-zinc-100 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
                          )}
                        >
                          <div className="flex flex-col gap-0.5 min-w-0 pr-2 !no-underline hover:!no-underline">
                            <div className="flex items-center gap-2 !no-underline hover:!no-underline">
                              {activeLessonId === lesson.id ? (
                                <IconPlayerPlay size={10} stroke={3} className="fill-current shrink-0 animate-pulse" />
                              ) : (
                                lesson.isCompleted && <IconCheck size={12} stroke={3} className="text-emerald-500 shrink-0" />
                              )}
                              <span className={cn(
                                "text-[12.5px] leading-snug transition-colors tracking-tight line-clamp-1 !no-underline hover:!no-underline",
                                activeLessonId === lesson.id ? "font-bold" : "font-semibold"
                              )}>
                                {lesson.title}
                              </span>
                            </div>
                            <span className={cn(
                              "text-[10px] font-medium !no-underline hover:!no-underline",
                              activeLessonId === lesson.id ? "text-primary-foreground/80" : "text-zinc-400"
                            )}>
                              {lesson.durationText}
                            </span>
                          </div>

                          {lesson.isLocked && activeLessonId !== lesson.id && (
                            <IconLock size={12} stroke={1.5} className="ml-auto text-zinc-400 dark:text-zinc-500 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Sổ tay cá nhân / Personal Study Notebook Widget */}
          {activeLesson && (
            <Card className="rounded-2xl border-border bg-white dark:bg-zinc-950 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-extrabold uppercase text-foreground flex items-center gap-1.5">
                    <IconNotebook size={14} className="text-primary" />
                    Sổ tay cá nhân
                  </h3>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase">Bài ghi chú trực tuyến</p>
                </div>
                <div className="flex gap-1.5">
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-7 rounded-lg"
                    onClick={handleExportNotes}
                    title="Tải về tệp txt"
                  >
                    <IconDownload size={12} />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-7 rounded-lg"
                    onClick={handleSaveNotes}
                    title="Lưu ngay"
                  >
                    <IconCircleCheck size={12} className="text-emerald-500" />
                  </Button>
                </div>
              </div>
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Ghi chú nhanh kiến thức bài học tại đây (được tự động lưu)..."
                className="w-full h-32 p-3 text-xs rounded-xl border border-border bg-zinc-50/50 dark:bg-zinc-900/30 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary resize-none leading-relaxed"
              />
              <p className="text-[10px] text-muted-foreground/80 font-medium">Ghi chú tự động đồng bộ vào bộ nhớ duyệt của riêng bạn.</p>
            </Card>
          )}
        </div>

      </div>
    </div>
  )
}

/* ─── ChapterHeader Subcomponent ────────────────────────────────────────── */
const ChapterHeader = ({ index, title }: { index: number; title: string }) => (
  <div className="flex items-center gap-2 text-left min-w-0 pr-2">
    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter shrink-0">
      {index + 1 < 10 ? `0${index + 1}` : index + 1}
    </span>
    <h3 className="text-[11.5px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-tight truncate">
      {title}
    </h3>
  </div>
)
