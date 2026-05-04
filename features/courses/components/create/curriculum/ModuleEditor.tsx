import React from "react";
import { useStore } from "@tanstack/react-form";
import {
  IconFileText,
  IconQuestionMark,
  IconPackage,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { SessionUploader } from "./SessionUploader";
import { withForm, DefaultCurriculumValues } from "./curriculum-form-config";

export const ModuleEditor = withForm({
  defaultValues: DefaultCurriculumValues,
  props: {
    sIdx: 0 as number,
    mIdx: 0 as number,
  },
  render: function Render({ form, sIdx, mIdx }) {
    const lessonName = `courseSections[${sIdx}].lessons[${mIdx}]`;
    const lessons = useStore(form.store, (s: any) => s.values.courseSections[sIdx]?.lessons || []);
    const lesson = lessons[mIdx];
    const lessonParts = lesson?.lessonParts || [];

    if (!lesson) return null;

    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
        {/* Header */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                <IconFileText size={24} stroke={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Thiết lập Module
                </h2>
                <p className="text-xs text-zinc-500 font-medium">
                  Bài {mIdx + 1} • Cấu hình nội dung chi tiết
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <form.AppField
              name={`${lessonName}.title` as any}
              children={(field: any) => (
                <field.TextField
                  label="Tiêu đề bài học (Module)"
                  placeholder="Nhập tên bài học..."
                />
              )}
            />
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="docs" className="w-full">
          <TabsList className="bg-transparent border-b border-zinc-100 w-full justify-start rounded-none h-auto p-0 gap-8 mb-8">
            <TabTrigger value="docs" icon={IconFileText} label="Tài liệu" />
            <TabTrigger value="quiz" icon={IconQuestionMark} label="Câu hỏi" />
          </TabsList>

          <TabsContent value="docs" className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Danh sách tài liệu ({lessonParts.length})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-[11px] font-bold text-primary hover:text-primary hover:bg-primary/5 transition-all gap-2"
                onClick={() => {
                  form.setFieldValue(`${lessonName}.lessonParts` as any, [
                    ...lessonParts,
                    { title: `Tài liệu ${lessonParts.length + 1}`, file: null },
                  ]);
                }}
              >
                <IconPlus size={14} stroke={3} /> Thêm tài liệu
              </Button>
            </div>

            <div className="flex flex-col gap-8">
              {lessonParts.map((_: any, ssIdx: number) => (
                <SessionItem key={ssIdx} sIdx={sIdx} mIdx={mIdx} ssIdx={ssIdx} form={form} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4">
              <form.AppField
                name={`${lessonName}.quizCode` as any}
                children={(field: any) => (
                  <field.TextField
                    label="Mã kỳ thi liên kết (Quiz ID)"
                    placeholder="Nhập mã kỳ thi..."
                  />
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
});

function TabTrigger({ value, icon: Icon, label }: { value: string; icon: any; label: string }) {
  return (
    <TabsTrigger
      value={value}
      className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 pb-3 text-[13px] font-semibold text-zinc-400 gap-2 transition-all"
    >
      <Icon size={16} stroke={2} />
      {label}
    </TabsTrigger>
  );
}

function SessionItem({ sIdx, mIdx, ssIdx, form }: { sIdx: number; mIdx: number; ssIdx: number; form: any }) {
  const sessionName = `courseSections[${sIdx}].lessons[${mIdx}].lessonParts[${ssIdx}]`;
  const session = useStore(form.store, (s: any) => s.values.courseSections[sIdx]?.lessons[mIdx]?.lessonParts[ssIdx]);

  if (!session) return null;

  return (
    <div className="group relative border-b border-zinc-100 pb-8 last:border-0 transition-all">
      <div className="flex items-center justify-between gap-8 mb-4">
        <div className="flex-1 flex items-center gap-4">
          <div className="size-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 text-[10px] font-bold">
            {ssIdx + 1}
          </div>
          <div className="flex-1">
            <form.AppField
              name={`${sessionName}.title` as any}
              children={(field: any) => (
                <field.TextField
                  placeholder="Tiêu đề tài liệu..."
                  className="font-semibold text-zinc-900 p-0 h-auto border-none focus-visible:ring-0 shadow-none bg-transparent placeholder:text-zinc-300"
                />
              )}
            />
          </div>
        </div>
        <button
          onClick={() => {
            const current = form.getFieldValue(`courseSections[${sIdx}].lessons[${mIdx}].lessonParts` as any);
            form.setFieldValue(
              `courseSections[${sIdx}].lessons[${mIdx}].lessonParts` as any,
              current.filter((_: any, i: number) => i !== ssIdx)
            );
          }}
          className="p-1 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <IconTrash size={14} stroke={2} />
        </button>
      </div>

      <div className="pl-12">
        <SessionUploader
          file={session.file}
          onContentChange={(file) => form.setFieldValue(`${sessionName}.file` as any, file)}
        />
      </div>
    </div>
  );
}
