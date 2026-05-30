"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClass } from "../actions/create-class";
import {
  createClassSchema,
  type CreateClassInput,
} from "../schemas/create-class.schema";

interface CreateClassFormProps {
  onSuccess?: () => void;
}

export function CreateClassForm({ onSuccess }: CreateClassFormProps) {
  const router = useRouter();
  const { myUser } = useAuth();
  const [isPending, startTransition] = React.useTransition();

  const defaultValues: CreateClassInput = {
    name: "",
    description: "",
    teacherId: myUser?.id ?? undefined,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createClassSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await createClass(value);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

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
      <FieldGroup className="gap-5">
        <form.Field name="name">
          {(field) => (
            <Field data-invalid={field.state.meta.errors.length > 0}>
              <FieldLabel>
                Tên lớp <span className="text-rose-500">*</span>
              </FieldLabel>
              <Input
                placeholder="Lớp Toán tư duy 8A"
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
                placeholder="Mô tả ngắn về nội dung, lịch học hoặc mục tiêu của lớp."
                rows={5}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <div className="mt-4 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => onSuccess?.()}
          disabled={isPending}
        >
          Hủy
        </Button>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="px-8 font-bold"
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
                  Tạo lớp học
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
