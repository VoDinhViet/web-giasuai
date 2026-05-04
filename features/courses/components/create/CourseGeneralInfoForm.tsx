"use client";

import * as React from "react";
import {
  IconInfoCircle,
  IconPlus,
  IconSchool,
  IconSettings,
  IconCloudUpload,
  IconX,
  IconArrowRight,
  IconLoader2,
} from "@tabler/icons-react";
import { useStore } from "@tanstack/react-form";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import {
  useAppForm,
  courseDefaultValues,
} from "../../utils/course-form-config";
import { useLevels } from "../../hooks/use-levels";
import { useGrades } from "../../hooks/use-grades";
import { useMajors } from "../../hooks/use-majors";
import { useSubjects } from "../../hooks/use-subjects";
import { createCourseAction } from "../../actions/course.actions";
import {
  createCourseSchema,
  type CreateCourseFormValues,
  type CourseFormApi,
} from "../../schemas/create-course.schema";
import { Route } from "next";
import { updateCourseAction } from "../../actions/course.actions";

/* ── UI Components ────────────────────────────────────────────────────────── */

function SectionLabel({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-zinc-900">
        <Icon size={18} stroke={2} className="text-zinc-500" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="text-xs text-zinc-500 leading-normal">{desc}</p>
    </div>
  );
}

function ThumbnailUpload({
  value,
  onChange,
}: {
  value: File | string | null;
  onChange: (file: File | null) => void;
}) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    if (typeof value === "string") {
      setPreviewUrl(value);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropAccepted: ([file]) => onChange(file),
  });

  return (
    <AspectRatio
      ratio={16 / 9}
      className="group relative overflow-hidden rounded-lg border-2 border-dashed transition-all"
      style={{ borderColor: isDragActive ? "#18181b" : "#e4e4e7" }}
    >
      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt="Thumbnail preview"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
          >
            <IconX size={12} stroke={3} />
          </button>
        </>
      ) : (
        <div
          {...getRootProps()}
          className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
        >
          <input {...getInputProps()} />
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl bg-white border border-zinc-100 transition-transform",
              isDragActive
                ? "scale-105 text-zinc-900 border-zinc-900"
                : "text-zinc-500",
            )}
          >
            <IconCloudUpload size={20} stroke={2} />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-semibold text-zinc-500">
              Tải ảnh đại diện
            </p>
            <p className="text-[9px] text-zinc-500 mt-0.5">
              PNG, JPG tối đa 5MB
            </p>
          </div>
        </div>
      )}
    </AspectRatio>
  );
}

/* ── CreateCoursePage Content ─────────────────────────────────────────────── */

export function CourseGeneralInfoForm({
  initialData,
  courseId,
}: {
  initialData?: Partial<CreateCourseFormValues>;
  courseId?: string;
}) {
  const router = useRouter();
  const isEdit = !!courseId;

  const [isPending, startTransition] = React.useTransition();

  const form = useAppForm({
    defaultValues: {
      ...courseDefaultValues,
      ...initialData,
    } as CreateCourseFormValues,
    validators: {
      onChange: createCourseSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("levelId", value.levelId);

      if (value.gradeId) formData.append("gradeId", value.gradeId);
      if (value.majorId) formData.append("majorId", value.majorId);
      if (value.subjectId) formData.append("subjectId", value.subjectId);

      if (value.learningOutcomes) {
        formData.append(
          "learningOutcomes",
          JSON.stringify(value.learningOutcomes),
        );
      }

      if (value.thumbnail instanceof File) {
        formData.append("thumbnail", value.thumbnail);
      }

      startTransition(async () => {
        const result = isEdit
          ? await updateCourseAction(courseId, formData)
          : await createCourseAction(formData);

        if (result.success) {
          toast.success(
            isEdit
              ? "Cập nhật khóa học thành công!"
              : "Tạo khóa học thành công!",
          );
          if (!isEdit && result.data?.courseId) {
            router.push(`/courses/${result.data.courseId}/curriculum` as Route);
          } else {
            router.refresh();
          }
        } else {
          toast.error(
            result.message ||
              (isEdit ? "Không thể cập nhật khóa học" : "Không thể tạo khóa học"),
          );
        }
      });
    },
  });

  const levelId = useStore(form.store, (s) => s.values.levelId);
  const gradeId = useStore(form.store, (s) => s.values.gradeId);
  const majorId = useStore(form.store, (s) => s.values.majorId);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  const { data: levels = [], isLoading: loadingLevels } = useLevels();
  const { data: grades = [], isLoading: loadingGrades } = useGrades(levelId);
  const { data: majors = [], isLoading: loadingMajors } = useMajors(levelId);
  const { data: subjects = [], isLoading: loadingSubjects } = useSubjects({
    levelId,
    gradeId,
    majorId,
  });
  const isUniversity = levels.find((l) => l.id === levelId)?.code === "UNIVERSITY";

  return (
    <div className="h-full overflow-y-auto antialiased bg-zinc-50/20">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
            {isEdit ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
          </h1>
          <p className="text-sm text-zinc-500">
            {isEdit
              ? "Cập nhật các thông tin nền tảng của khóa học này."
              : "Cung cấp các thông tin nền tảng để bắt đầu hành trình giảng dạy của bạn."}
          </p>
        </div>

        <div className="space-y-12 pb-32">
          <div className="grid grid-cols-3 gap-12">
            <SectionLabel
              icon={IconInfoCircle}
              title="Thương hiệu"
              desc="Hình ảnh đại diện chuyên nghiệp giúp khóa học thu hút học sinh hơn."
            />
            <div className="col-span-2">
              <form.Field name="thumbnail">
                {(field) => (
                  <div className="space-y-2">
                    <ThumbnailUpload
                      value={field.state.value as File | string | null}
                      onChange={(file) => field.handleChange(file)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          <Separator className="bg-zinc-100" />

          <div className="grid grid-cols-3 gap-12">
            <SectionLabel
              icon={IconSchool}
              title="Phân loại"
              desc="Xác định đúng đối tượng học sinh và môn học."
            />
            <div className="col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <form.AppField name="levelId">
                  {(field) => (
                    <field.Select
                      label="Cấp học"
                      placeholder="Chọn cấp học"
                      loading={loadingLevels}
                      options={levels}
                      onValueChange={() => {
                        form.setFieldValue("gradeId", "");
                        form.setFieldValue("majorId", "");
                        form.setFieldValue("subjectId", "");
                      }}
                    />
                  )}
                </form.AppField>

                {levelId && levels.length > 0 && (
                  <form.AppField name={isUniversity ? "majorId" : "gradeId"}>
                    {(field) => (
                      <field.Select
                        label={isUniversity ? "Chuyên ngành" : "Khối lớp"}
                        placeholder={
                          isUniversity ? "Chọn chuyên ngành" : "Chọn khối lớp"
                        }
                        loading={loadingGrades || loadingMajors}
                        options={isUniversity ? majors : grades}
                        onValueChange={() =>
                          form.setFieldValue("subjectId", "")
                        }
                      />
                    )}
                  </form.AppField>
                )}
              </div>

              {(isUniversity ? majorId : gradeId) && (
                <form.AppField name="subjectId">
                  {(field) => (
                    <field.Select
                      label="Môn học"
                      placeholder="Chọn môn học"
                      loading={loadingSubjects}
                      options={subjects}
                    />
                  )}
                </form.AppField>
              )}
            </div>
          </div>

          <Separator className="bg-zinc-100" />

          <div className="grid grid-cols-3 gap-12">
            <SectionLabel
              icon={IconSettings}
              title="Nội dung"
              desc="Tiêu đề và mô tả chi tiết nội dung khóa học."
            />
            <div className="col-span-2 space-y-8">
              <form.AppField name="title">
                {(field) => (
                  <field.Input
                    label="Tiêu đề khóa học"
                    placeholder="Ví dụ: Luyện thi THPT Quốc gia môn Toán"
                    className="h-11 text-base font-semibold"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.Textarea
                    label="Mô tả tổng quan"
                    placeholder="Khóa học này sẽ mang lại giá trị gì cho học sinh?..."
                    className="min-h-[160px] text-sm"
                  />
                )}
              </form.AppField>
            </div>
          </div>

          <Separator className="bg-zinc-100" />

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              variant="ghost"
              className="h-12 px-8 font-bold text-zinc-500"
              onClick={() => router.back()}
            >
              Hủy bỏ
            </Button>
            <Button
              className="h-12 px-10 font-bold"
              onClick={() => form.handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                <>
                  {isEdit ? "Lưu thay đổi" : "Tạo khóa học"}{" "}
                  <IconArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
