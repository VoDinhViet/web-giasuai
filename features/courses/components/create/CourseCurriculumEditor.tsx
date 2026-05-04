"use client";

import * as React from "react";
import { useStore } from "@tanstack/react-form";
import {
  IconPlus,
  IconTrash,
  IconChevronRight,
  IconChevronLeft,
  IconFolders,
  IconCode,
  IconVideo,
  IconDeviceFloppy,
  IconListCheck,
  IconFileText,
  IconInfoCircle,
  IconSettings,
  IconLoader2,
  IconGripVertical,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/field";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";

import { useAppForm } from "../../utils/course-general-form-config";
import {
  courseCurriculumSchema,
  type CourseCurriculumFormValues,
} from "../../schemas/course-curriculum.schema";
import {
  deleteCourseAction,
  syncCourseCurriculumAction,
} from "../../actions/course.actions";
import { SessionUploader } from "./curriculum/SessionUploader";
import { SimulationUploader } from "./curriculum/SimulationUploader";

/* ─── 1. KIỂU DỮ LIỆU & UTILS ────────────────────────────────────────────── */

type CourseFormApi = CourseCurriculumFormApi;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
    {children}
  </p>
);

const Hint = ({
  color,
  icon: Icon,
  children,
}: {
  color: "amber" | "purple" | "blue";
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  const styles = {
    amber: "bg-amber-50/50 border-amber-100 text-amber-900",
    purple: "bg-purple-50/50 border-purple-100 text-purple-900",
    blue: "bg-blue-50/50 border-blue-100 text-blue-900",
  };
  return (
    <div
      className={cn(
        "flex gap-2.5 p-3 rounded-lg border items-start text-xs leading-normal mt-2",
        styles[color],
      )}
    >
      <Icon size={14} className="shrink-0 mt-0.5" stroke={2.5} />
      {children}
    </div>
  );
};

/* ─── 2. UI COMPONENTS ────────────────────────────────────────────────────── */

function NavButton({
  isActive,
  onClick,
  label,
  icon: Icon,
  variant = "primary",
  index,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
  icon: React.ElementType;
  variant?: "primary" | "secondary";
  index?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 w-full rounded-xl transition-all duration-300 text-left",
        variant === "primary"
          ? "h-11 px-4 text-[13px] font-bold"
          : "h-10 px-4 ml-2 text-[12px] font-semibold",
        isActive
          ? "bg-zinc-950 text-white shadow-lg shadow-zinc-950/20 dark:bg-white dark:text-zinc-950"
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100",
      )}
    >
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
          isActive
            ? "bg-white/10 dark:bg-zinc-950/10"
            : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700",
        )}
      >
        <Icon
          size={14}
          stroke={isActive ? 2.5 : 2}
          className={cn(
            "transition-transform duration-300 group-hover:scale-110",
            isActive ? "text-white dark:text-zinc-950" : "text-zinc-500",
          )}
        />
      </div>

      <span className="truncate flex-1">
        {label || (variant === "primary" ? `Chương ${index}` : `Bài học ${index}`)}
      </span>

      {isActive && (
        <IconChevronRight
          size={14}
          stroke={3}
          className="animate-in fade-in slide-in-from-left-2 duration-300"
        />
      )}
    </button>
  );
}

/* ─── 3. SUB-EDITORS ──────────────────────────────────────────────────────── */

interface BaseEditorProps {
  sIdx: number;
  mIdx?: number;
  form: CourseFormApi;
}

function SectionEditor({ sIdx, form }: BaseEditorProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
          <IconFolders size={20} stroke={2.5} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Cấu trúc Phần {sIdx + 1}
          </h2>
          <p className="text-xs text-zinc-500">
            Quản lý các module bài học trong phần này.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <SectionLabel>Tên phần nội dung</SectionLabel>
        <form.AppField name={`courseSections[${sIdx}].title`}>
          {(field: any) => (
            <field.Input
              placeholder="Ví dụ: Chương 1: Giới thiệu tổng quan..."
              className="h-12 text-base font-bold shadow-sm"
            />
          )}
        </form.AppField>
      </div>
    </div>
  );
}

function ModuleEditor({ sIdx, mIdx, form }: Required<BaseEditorProps>) {
  const lessonName = `courseSections[${sIdx}].lessons[${mIdx}]`;
  const simulationType = useStore(
    form.store,
    (s: any) =>
      (s.values.courseSections as any)[sIdx]?.lessons[mIdx]?.simulationType,
  );
  const [activeTab, setActiveTab] = React.useState<"docs" | "quiz" | "sim">(
    "docs",
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <IconFileText size={20} stroke={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                Thiết lập Module
              </h2>
              <p className="text-xs text-zinc-500">
                Cấu hình chi tiết cho bài học này.
              </p>
            </div>
          </div>

          <div className="flex bg-zinc-100 p-1 rounded-lg">
            {(["VIDEO", "CODE"] as const).map((type) => (
              <button
                key={type}
                onClick={() =>
                  form.setFieldValue(
                    `${lessonName}.simulationType` as any,
                    type,
                  )
                }
                className={cn(
                  "px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                  simulationType === type
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-600",
                )}
              >
                {type === "VIDEO" ? "Video" : "Thực hành"}
              </button>
            ))}
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <SectionLabel>Tên bài học (Module)</SectionLabel>
          <form.AppField name={`${lessonName}.title` as any}>
            {(field: any) => (
              <field.Input
                placeholder="Nhập tên bài học..."
                className="h-12 text-base font-bold shadow-sm"
              />
            )}
          </form.AppField>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-100">
          {[
            { id: "docs", label: "Tài liệu", icon: IconFileText },
            { id: "quiz", label: "Câu hỏi", icon: IconListCheck },
            { id: "sim", label: "Mô phỏng", icon: IconCode },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-xs font-bold transition-all border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-400 hover:text-zinc-900",
              )}
            >
              <tab.icon size={16} stroke={2.5} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "docs" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <SectionLabel>Danh sách tài liệu</SectionLabel>
              <Button
                variant="ghost"
                className="h-6 px-2 text-[10px] font-bold text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  const currentSessions = (form.getFieldValue(
                    `${lessonName}.sessions` as any,
                  ) || []) as any[];
                  form.setFieldValue(`${lessonName}.sessions` as any, [
                    ...currentSessions,
                    { title: "", theoryContent: null },
                  ]);
                }}
              >
                <IconPlus size={12} stroke={3} className="mr-1" /> THÊM TÀI LIỆU
              </Button>
            </div>

            <form.Field name={`${lessonName}.sessions` as any} mode="array">
              {(field: any) => (
                <div className="grid grid-cols-2 gap-4">
                  {((field.state.value as any[]) || []).map((_, ssIdx) => (
                    <div
                      key={ssIdx}
                      className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 space-y-4 relative group"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 size-7 text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => field.removeValue(ssIdx)}
                      >
                        <IconTrash size={14} />
                      </Button>
                      <form.AppField
                        name={`${lessonName}.sessions[${ssIdx}].title` as any}
                      >
                        {(f: any) => (
                          <f.Input
                            placeholder="Tiêu đề tài liệu..."
                            className="bg-white border-none shadow-none font-bold h-8 px-0 focus-visible:ring-0"
                          />
                        )}
                      </form.AppField>
                      <form.Field
                        name={
                          `${lessonName}.sessions[${ssIdx}].theoryContent` as any
                        }
                      >
                        {(f: any) => (
                          <SessionUploader
                            theoryContent={f.state.value as any}
                            onContentChange={(val) => f.handleChange(val)}
                          />
                        )}
                      </form.Field>
                    </div>
                  ))}
                </div>
              )}
            </form.Field>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="max-w-2xl space-y-6 animate-in fade-in duration-300">
            <SectionLabel>Cấu hình bài tập</SectionLabel>
            <div className="p-6 rounded-xl border border-zinc-100 bg-white shadow-sm space-y-4">
              <form.AppField name={`${lessonName}.quizCode` as any}>
                {(field: any) => (
                  <field.Input
                    label="Mã Quiz ID"
                    placeholder="Nhập mã Quiz ID..."
                    className="font-bold h-11"
                  />
                )}
              </form.AppField>
              <Hint color="amber" icon={IconInfoCircle}>
                Kết nối với thư viện câu hỏi để học sinh có thể ôn tập ngay sau
                bài giảng.
              </Hint>
            </div>
          </div>
        )}

        {activeTab === "sim" && (
          <div className="max-w-2xl space-y-6 animate-in fade-in duration-300">
            <SectionLabel>Tương tác thực hành</SectionLabel>
            <div className="p-6 rounded-xl border border-zinc-100 bg-white shadow-sm space-y-4">
              <form.Field name={`${lessonName}.simulationValue` as any}>
                {(field: any) => (
                  <SimulationUploader
                    simulationValue={(field.state.value as string) ?? ""}
                    onValueChange={(val) => field.handleChange(val)}
                  />
                )}
              </form.Field>
              <Hint color="purple" icon={IconInfoCircle}>
                Tải lên nội dung mô phỏng (Scorm/HTML5) để tăng tính sinh động
                cho bài học.
              </Hint>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 4. MAIN COMPONENT ───────────────────────────────────────────────────── */

interface CurriculumStepProps {
  courseId: string;
  initialData?: any;
}

export function CourseCurriculumSync({
  courseId,
  initialData,
}: CurriculumStepProps) {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      courseSections: initialData?.courseSections || [],
    } as CourseCurriculumFormValues,
    validators: {
      onChange: courseCurriculumSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("courseSections", JSON.stringify(value.courseSections));
      startTransition(async () => {
        const result = await syncCourseCurriculumAction(courseId, formData);
        if (result.success) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      });
    },
  });

  const [isPending, startTransition] = React.useTransition();
  const [activeView, setActiveView] = React.useState<{
    sIdx: number;
    mIdx: number;
  }>({ sIdx: 0, mIdx: -1 });
  const sections = useStore(form.store, (s) => s.values.courseSections) || [];
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <div className="flex h-screen overflow-hidden antialiased bg-zinc-50/30">
      {/* Sidebar navigation */}
      <aside className="w-80 shrink-0 border-r border-zinc-200/60 bg-white flex flex-col h-full dark:border-zinc-800 dark:bg-zinc-950">
        {/* Header Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-black text-zinc-950 uppercase tracking-widest dark:text-zinc-50">
              Đề cương khóa học
            </h2>
            <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10">
              <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <p className="text-[11px] font-medium text-zinc-400">
            Quản lý cấu trúc và bài học của bạn
          </p>
          <Button
            variant="ghost"
            className="h-auto p-0 mt-4 text-zinc-400 hover:text-zinc-900 font-bold text-[10px] uppercase tracking-widest"
            onClick={() => router.push("/manage/courses")}
          >
            <IconChevronLeft size={14} stroke={3} className="mr-1" /> QUẢN LÝ
            KHÓA HỌC
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 space-y-8 custom-scrollbar pb-10">
          <form.Field name="courseSections" mode="array">
            {(field) => (
              <div className="space-y-10">
                {sections.map((section: any, sIdx: number) => (
                  <div key={sIdx} className="space-y-3">
                    {/* Section Button */}
                    <div className="relative group/section">
                      <NavButton
                        isActive={activeView.sIdx === sIdx && activeView.mIdx === -1}
                        onClick={() => setActiveView({ sIdx, mIdx: -1 })}
                        label={section.title}
                        index={sIdx + 1}
                        icon={IconFolders}
                      />
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center rounded-lg text-zinc-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover/section:opacity-100 z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm("Bạn có chắc chắn muốn xóa toàn bộ phần này?")) {
                            field.removeValue(sIdx)
                          }
                        }}
                      >
                        <IconTrash size={14} stroke={2} />
                      </button>
                    </div>

                    {/* Lessons Container */}
                    <div className="space-y-1.5 relative">
                      {/* Vertical line connector */}
                      <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-zinc-100 dark:bg-zinc-800" />

                      {section.lessons?.map((lesson: any, lIdx: number) => (
                        <div key={lIdx} className="relative pl-2">
                          <NavButton
                            isActive={activeView.sIdx === sIdx && activeView.mIdx === lIdx}
                            onClick={() => setActiveView({ sIdx, mIdx: lIdx })}
                            label={lesson.title}
                            index={lIdx + 1}
                            icon={
                              lesson.simulationType === "CODE"
                                ? IconCode
                                : IconVideo
                            }
                            variant="secondary"
                          />
                        </div>
                      ))}

                      {/* Add Lesson Button */}
                      <Button
                        variant="ghost"
                        className="w-[calc(100%-1.5rem)] h-10 justify-start px-4 ml-6 mt-2 text-[11px] font-bold text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-all rounded-xl border border-dashed border-zinc-200 hover:border-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-100 group shadow-none"
                        onClick={() => {
                          const currentLessons = section.lessons || [];
                          form.setFieldValue(
                            `courseSections[${sIdx}].lessons` as any,
                            [
                              ...currentLessons,
                              {
                                title: "",
                                simulationType: "VIDEO",
                                sessions: [],
                              },
                            ] as any,
                          );
                        }}
                      >
                        <IconPlus
                          size={14}
                          stroke={3}
                          className="text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors mr-2"
                        />
                        THÊM MODULE
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add Section Button */}
                <Button
                  variant="outline"
                  className="w-full h-14 border-2 border-dashed border-zinc-100 bg-zinc-50/50 text-[12px] font-black uppercase tracking-widest text-zinc-400 hover:border-zinc-950 hover:bg-white hover:text-zinc-950 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-100 dark:hover:bg-zinc-950 dark:hover:text-zinc-100 shadow-none"
                  onClick={() => field.pushValue({ title: "", lessons: [] })}
                >
                  <div className="size-6 flex items-center justify-center rounded-lg bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white transition-colors dark:bg-zinc-800 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-950">
                    <IconPlus size={14} stroke={3} />
                  </div>
                  Thêm phần mới
                </Button>
              </div>
            )}
          </form.Field>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-200/60 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <Button
            className={cn(
              "w-full h-12 text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center transition-all duration-500 shadow-none",
              "bg-zinc-950 text-white shadow-xl shadow-zinc-950/20 hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-zinc-950"
            )}
            onClick={() => form.handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <IconLoader2 className="animate-spin size-5" />
            ) : (
              <>
                <IconDeviceFloppy size={18} className="mr-3" stroke={2.5} />
                Lưu thay đổi
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Editor view */}
      <main className="flex-1 overflow-y-auto p-16">
        <div className="mx-auto max-w-5xl">
          {activeView.mIdx === -1 ? (
            <SectionEditor sIdx={activeView.sIdx} form={form as any} />
          ) : (
            <ModuleEditor
              sIdx={activeView.sIdx}
              mIdx={activeView.mIdx}
              form={form as any}
            />
          )}
        </div>
      </main>
    </div>
  );
}
