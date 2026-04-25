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
import { UserRole } from "@/types/user";
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
  const isTeacher = myUser?.role === UserRole.TEACHER;

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
      if (!isTeacher) {
        toast.error("Ch\u1EC9 gi\u00E1o vi\u00EAn m\u1EDBi c\u00F3 th\u1EC3 t\u1EA1o l\u1EDBp h\u1ECDc.");
        return;
      }

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

  if (!isTeacher) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-4 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
        {"Ch\u1EC9 t\u00E0i kho\u1EA3n gi\u00E1o vi\u00EAn m\u1EDBi c\u00F3 th\u1EC3 t\u1EA1o l\u1EDBp h\u1ECDc."}
      </div>
    );
  }

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
                {"T\u00EAn l\u1EDBp"} <span className="text-rose-500">*</span>
              </FieldLabel>
              <Input
                placeholder={"L\u1EDBp To\u00E1n t\u01B0 duy 8A"}
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
              <FieldLabel>{"M\u00F4 t\u1EA3 l\u1EDBp h\u1ECDc"}</FieldLabel>
              <Textarea
                placeholder={
                  "M\u00F4 t\u1EA3 ng\u1EAFn v\u1EC1 n\u1ED9i dung, l\u1ECBch h\u1ECDc ho\u1EB7c m\u1EE5c ti\u00EAu c\u1EE7a l\u1EDBp."
                }
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
          {"H\u1EE7y"}
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
                  {"\u0110ang t\u1EA1o..."}
                </>
              ) : (
                <>
                  <IconPlus className="mr-2 h-4 w-4" />
                  {"T\u1EA1o l\u1EDBp h\u1ECDc"}
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
