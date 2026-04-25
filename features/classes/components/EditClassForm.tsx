"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Class } from "@/types/class";

import { updateClass } from "../actions/update-class";
import {
  type UpdateClassFormInput,
  updateClassSchema,
} from "../schemas/update-class.schema";

interface EditClassFormProps {
  classData: Class;
  onSuccess?: () => void;
}

export function EditClassForm({ classData, onSuccess }: EditClassFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const defaultValues = React.useMemo(
    () => ({
      name: classData.name ?? "",
      description: classData.description ?? "",
      isActive: classData.isActive,
    }),
    [classData]
  ) satisfies UpdateClassFormInput;

  const form = useForm({
    defaultValues,
    validators: { onSubmit: updateClassSchema },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await updateClass(classData.id, value);
        if (!result.success) return toast.error(result.message);
        
        toast.success(result.message);
        router.refresh();
        onSuccess?.();
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="space-y-5">
        <form.Field name="name">
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0}>
              <FieldLabel>
                Tên lớp học <span className="text-rose-500">*</span>
              </FieldLabel>
              <Input
                placeholder="Ví dụ: Lớp Toán tư duy 8A"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0}>
              <FieldLabel>Mô tả lớp học</FieldLabel>
              <Textarea
                placeholder="Mô tả nội dung, lộ trình hoặc mục tiêu của lớp học..."
                rows={4}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <form.Field name="isActive">
            {(field) => (
              <Field orientation="horizontal" className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <FieldLabel>Trạng thái hoạt động</FieldLabel>
                  <FieldDescription>
                    Hiển thị công khai lớp học này cho học viên.
                  </FieldDescription>
                </div>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                  disabled={isPending}
                />
              </Field>
            )}
          </form.Field>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => onSuccess?.()}
          disabled={isPending}
        >
          Hủy
        </Button>
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting || isPending}>
              {isSubmitting || isPending ? (
                <>
                  <IconLoader2 className="mr-2 size-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <IconDeviceFloppy className="mr-2 size-4" />
                  Lưu thay đổi
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
