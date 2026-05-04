'use client'

import React, { useTransition } from 'react'
import { useStore } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  CourseCurriculumSyncValues,
  courseCurriculumSyncSchema,
} from '../../schemas/course-curriculum.schema'
import {
  useAppForm,
  DefaultCurriculumValues,
} from './curriculum/curriculum-form-config'
import { syncCourseCurriculumAction } from '../../actions/course.actions'
import { CurriculumSidebar } from './curriculum/CurriculumSidebar'
import { SectionEditor } from './curriculum/SectionEditor'
import { ModuleEditor } from './curriculum/ModuleEditor'
import { SidebarProvider } from '@/components/ui/sidebar'

interface CurriculumStepProps {
  courseId: string
  initialData?: any
}

export function CourseCurriculumSync({
  courseId,
  initialData,
}: CurriculumStepProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useAppForm({
    defaultValues: DefaultCurriculumValues,
    validators: {
      onChange: courseCurriculumSyncSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Curriculum Submit JSON:', value)
      const formData = new FormData()

      const sections = value.courseSections.map((section: any, si: number) => ({
        title: section.title || '',
        lessons: (section.lessons || []).map((lesson: any, li: number) => ({
          title: lesson.title || '',
          lessonParts: (lesson.lessonParts || []).map(
            (part: any, ssi: number) => {
              let fileValue = part.file === '' ? undefined : part.file

              if (part.file instanceof File) {
                formData.append(`file_s${si}_l${li}_ss${ssi}`, part.file)
                fileValue = undefined // Do not send empty object in JSON
              }

              return {
                title: part.title || '',
                file: fileValue,
              }
            },
          ),
        })),
      }))

      formData.append('courseSections', JSON.stringify(sections))
      formData.append('courseId', courseId)

      startTransition(async () => {
        try {
          const result = await syncCourseCurriculumAction(courseId, formData)
          if (result.success) {
            toast.success(result.message || 'Đã đồng bộ đề cương thành công!')
            router.refresh()
          } else {
            toast.error(result.message || 'Đã có lỗi xảy ra.')
          }
        } catch (error) {
          toast.error('Không thể kết nối đến máy chủ.')
        }
      })
    },
  })

  const [activeView, setActiveView] = React.useState<{
    sIdx: number
    mIdx: number
  }>({ sIdx: 0, mIdx: -1 })

  const sections = useStore(form.store, (s) => s.values.courseSections) || []
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting)

  return (
    <SidebarProvider>
      <div className="flex w-full h-full overflow-hidden bg-white dark:bg-zinc-950">
        <CurriculumSidebar
          sections={sections}
          activeView={activeView}
          setActiveView={setActiveView}
          form={form}
          isPending={isPending}
          isSubmitting={isSubmitting}
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 lg:p-12 h-full max-w-5xl mx-auto">
            <div className="min-h-full">
              {activeView.mIdx === -1 ? (
                <SectionEditor form={form as any} sIdx={activeView.sIdx} />
              ) : (
                <ModuleEditor
                  form={form as any}
                  sIdx={activeView.sIdx}
                  mIdx={activeView.mIdx}
                />
              )}
            </div>

            <div className="mt-20 text-center">
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">
                GiaSuAI Curriculum Engine
              </p>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
