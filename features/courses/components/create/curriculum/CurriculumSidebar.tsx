import React from 'react'
import {
  IconTrash,
  IconFolders,
  IconVideo,
  IconPlus,
  IconLoader2,
  IconDeviceFloppy,
  IconChevronRight,
  IconChevronLeft,
} from '@tabler/icons-react'
import { withForm, DefaultCurriculumValues } from './curriculum-form-config'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FieldApi } from '@tanstack/react-form'
import {
  CourseCurriculumSyncFormApi,
  CourseCurriculumSyncValues,
} from '@/features/courses/schemas/create-course.schema'
import { Section, CurriculumView } from '@/features/courses/types/curriculum'

/* ─── Interfaces ────────────────────────────────────────────────────────── */

export interface CurriculumSidebarProps {
  sections: Section[]
  activeView: CurriculumView
  setActiveView: (view: CurriculumView) => void
  isPending: boolean
  isSubmitting?: boolean
}

/* ─── Sub-Components ────────────────────────────────────────────────────── */

/**
 * Hiển thị một Chương (Section) trong danh sách đề cương
 */
const SectionNavItem = ({
  title,
  isActive,
  onSelect,
  onRemove,
}: {
  title: string
  isActive: boolean
  onSelect: () => void
  onRemove: () => void
}) => (
  <>
    <SidebarMenuButton
      size="lg"
      isActive={isActive}
      onClick={onSelect}
      className={cn(
        'h-11 px-3 rounded-lg transition-all duration-300 relative overflow-hidden',
        isActive
          ? 'bg-primary/10 text-primary font-bold'
          : 'bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
      )}
    >
      {/* Active Indicator Bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full animate-in fade-in slide-in-from-left-1 duration-300" />
      )}

      <span className="text-[13px] truncate">{title}</span>
      <IconChevronRight
        size={14}
        stroke={2}
        className={cn(
          'ml-auto transition-transform duration-300',
          isActive
            ? 'text-primary rotate-90'
            : 'text-zinc-300 group-hover/section:text-zinc-400',
        )}
      />
    </SidebarMenuButton>

    <SidebarMenuAction
      showOnHover
      onClick={(e) => {
        e.stopPropagation()
        onRemove()
      }}
    >
      <IconTrash size={14} stroke={1.5} />
    </SidebarMenuAction>
  </>
)

/**
 * Hiển thị một Bài học (Lesson) lồng bên trong một Chương
 */
const LessonNavItem = ({
  title,
  isActive,
  onSelect,
}: {
  title: string
  isActive: boolean
  onSelect: () => void
}) => (
  <SidebarMenuSubItem>
    <SidebarMenuSubButton
      isActive={isActive}
      onClick={onSelect}
      className={cn(
        'h-9 px-3 rounded-lg transition-all duration-300 relative overflow-hidden',
        isActive
          ? 'bg-primary/5 text-primary font-bold'
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
      )}
    >
      {/* Active Indicator Bar for Lesson */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary/60 rounded-r-full animate-in fade-in slide-in-from-left-1 duration-300" />
      )}

      <IconVideo
        size={14}
        stroke={1.5}
        className={cn(
          'mr-2 transition-colors',
          isActive ? 'text-primary' : 'text-zinc-400',
        )}
      />
      <span className="text-[12px] truncate">{title}</span>
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
)

/* ─── Main Component ────────────────────────────────────────────────────── */

export const CurriculumSidebar = withForm({
  defaultValues: DefaultCurriculumValues,
  props: {
    sections: [],
    activeView: { sIdx: 0, mIdx: -1 },
    setActiveView: (view) => { },
    isPending: false,
    isSubmitting: false,
  } as CurriculumSidebarProps,
  render: function Render({
    form,
    sections,
    activeView,
    setActiveView,
    isPending,
  }) {
    const router = useRouter()

    const handleAddNewLesson = (sectionIndex: number) => {
      const currentLessons = sections[sectionIndex].lessons || []
      form.setFieldValue(`courseSections[${sectionIndex}].lessons`, [
        ...currentLessons,
        { title: '', lessonParts: [] },
      ])
    }

    return (
      <Sidebar
        collapsible="none"
        className="w-[320px] border-r border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50"
      >
        {/* Header */}
        <SidebarHeader className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <IconFolders
                className="text-primary-foreground"
                size={20}
                stroke={1.5}
              />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-[14px] font-black text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">
                GiaSuAI
              </h2>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">
                Curriculum
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="h-10 w-full justify-start text-zinc-500 hover:text-primary hover:bg-primary/5 font-bold text-xs transition-all rounded-xl dark:hover:text-primary dark:hover:bg-primary/10"
            onClick={() => router.push('/manage/courses')}
          >
            <IconChevronLeft size={16} stroke={3} className="mr-2" />
            Về quản lý khóa học
          </Button>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="px-4 py-4 no-scrollbar">
          <form.AppField name="courseSections" mode="array">
            {(field) => (
              <SidebarGroup className="p-0">
                <SidebarGroupContent>
                  <SidebarMenu className="gap-3">
                    {sections.map((section, sectionIndex) => (
                      <SidebarMenuItem
                        key={sectionIndex}
                        className="group/section relative"
                      >
                        <SectionNavItem
                          title={section.title || `Chương ${sectionIndex + 1}`}
                          isActive={
                            activeView.sIdx === sectionIndex &&
                            activeView.mIdx === -1
                          }
                          onSelect={() =>
                            setActiveView({ sIdx: sectionIndex, mIdx: -1 })
                          }
                          onRemove={() => {
                            if (
                              confirm('Bạn có chắc chắn muốn xóa chương này?')
                            ) {
                              field.removeValue(sectionIndex)
                            }
                          }}
                        />

                        <SidebarMenuSub className="ml-4 mt-2 border-l border-zinc-200 dark:border-zinc-800 space-y-1 pl-2">
                          {section.lessons?.map((lesson, lessonIndex) => (
                            <LessonNavItem
                              key={lessonIndex}
                              title={
                                lesson.title || `Bài học ${lessonIndex + 1}`
                              }
                              isActive={
                                activeView.sIdx === sectionIndex &&
                                activeView.mIdx === lessonIndex
                              }
                              onSelect={() =>
                                setActiveView({
                                  sIdx: sectionIndex,
                                  mIdx: lessonIndex,
                                })
                              }
                            />
                          ))}

                          <SidebarMenuSubItem className="pt-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="w-full h-9 px-3 flex items-center justify-start text-[11px] font-bold text-zinc-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                              onClick={() => handleAddNewLesson(sectionIndex)}
                            >
                              <IconPlus
                                size={14}
                                stroke={2.5}
                                className="mr-2"
                              />
                              Thêm bài học
                            </Button>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                    ))}

                    <SidebarMenuItem className="mt-4 px-1">
                      <Button
                        variant="dashed"
                        className="w-full h-10"
                        onClick={() =>
                          field.pushValue({
                            title: '',
                            lessons: [],
                          })
                        }
                      >
                        <IconPlus size={18} stroke={2.5} className="mr-2" />
                        Thêm chương mới
                      </Button>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </form.AppField>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter >
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="w-full h-12"
                disabled={isSubmitting || isPending}
                onClick={() => form.handleSubmit()}
              >
                {isSubmitting || isPending ? (
                  <IconLoader2 className="animate-spin size-5" />
                ) : (
                  <>
                    <IconDeviceFloppy size={20} className="mr-2" stroke={2} />
                    Lưu thay đổi
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </SidebarFooter>
      </Sidebar>
    )
  },
})
