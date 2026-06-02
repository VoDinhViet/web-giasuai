"use client";

import * as React from "react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import {
  IconArrowLeft,
  IconLoader2,
  IconPlus,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCourseAction } from "../../actions/course.actions";
import {
  createCourseBasicSchema,
  type CreateCourseBasicInput,
} from "../../schemas/course-create.schema";

const defaultValues: CreateCourseBasicInput = {
  title: "",
  description: "",
  tags: "",
  learningOutcomes: "",
  isPublished: false,
  thumbnail: null,
};

export function CourseCreateForm() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createCourseBasicSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = toCourseFormData(value);

      startTransition(async () => {
        const result = await createCourseAction(formData);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);

        if (result.data?.courseId) {
          router.push(`/manage/courses/${result.data.courseId}` as Route);
          return;
        }

        router.push("/manage/courses");
      });
    },
  });

  return (
    <Card className="max-w-4xl">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CardContent className="space-y-8">
          <FieldGroup>
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>
                      Tiêu đề khóa học{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Luyện thi THPT Quốc gia môn Toán"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      disabled={isPending}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Mô tả</FieldLabel>
                    <Textarea
                      placeholder="Tóm tắt mục tiêu, phạm vi kiến thức và đối tượng phù hợp của khóa học."
                      rows={5}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      disabled={isPending}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            </form.Field>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <form.Field name="tags">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Tag</FieldLabel>
                      <Input
                        placeholder="toán, luyện thi, thpt"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        disabled={isPending}
                      />
                      <FieldDescription>
                        Phân tách bằng dấu phẩy.
                      </FieldDescription>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="thumbnail">
                {(field) => {
                  const selectedFile = field.state.value;
                  const isInvalid =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Ảnh đại diện</FieldLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.files?.[0] ?? null)
                        }
                        aria-invalid={isInvalid}
                        disabled={isPending}
                      />
                      {selectedFile instanceof File ? (
                        <FieldDescription>
                          Đã chọn: {selectedFile.name}
                        </FieldDescription>
                      ) : null}
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            <form.Field name="learningOutcomes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Kết quả học tập</FieldLabel>
                    <Textarea
                      placeholder={"Nắm vững kiến thức nền tảng\nGiải được bài tập vận dụng cao"}
                      rows={4}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      disabled={isPending}
                    />
                    <FieldDescription>Mỗi dòng là một kết quả.</FieldDescription>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="isPublished">
              {(field) => (
                <Field orientation="horizontal">
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(checked === true)
                    }
                    disabled={isPending}
                    id="course-is-published"
                  />
                  <FieldContent>
                    <FieldTitle>Xuất bản ngay</FieldTitle>
                    <FieldDescription>
                      Khóa học có thể được gán vào lớp sau khi xuất bản.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button asChild variant="ghost">
            <Link href="/manage/courses">
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={!canSubmit || isSubmitting || isPending}
              >
                {isSubmitting || isPending ? (
                  <>
                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Tạo khóa học
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </form>
    </Card>
  );
}

function toCourseFormData(value: CreateCourseBasicInput) {
  const formData = new FormData();
  const description = value.description?.trim();

  formData.append("title", value.title.trim());
  formData.append("tags", JSON.stringify(splitCommaList(value.tags)));
  formData.append(
    "learningOutcomes",
    JSON.stringify(splitLineList(value.learningOutcomes)),
  );
  formData.append("isPublished", String(value.isPublished));

  if (description) {
    formData.append("description", description);
  }

  if (value.thumbnail instanceof File) {
    formData.append("thumbnail", value.thumbnail);
  }

  return formData;
}

function splitCommaList(value?: string) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLineList(value?: string) {
  return (value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
