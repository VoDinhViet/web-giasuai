"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { User } from "@/types/user";
import { updateCurrentUser } from "../actions/update-current-user";
import { updateCurrentUserSchema } from "../schemas/update-current-user.schema";

interface CurrentUserProfileFormProps {
  user: User;
}

export function CurrentUserProfileForm({
  user,
}: CurrentUserProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      fullName: user.fullName || "",
    },
    validators: {
      onSubmit: updateCurrentUserSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await updateCurrentUser(value);

        if (result.success) {
          toast.success(result.message);
          router.refresh();
          return;
        }

        toast.error(result.message);
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <FieldGroup>
        <form.Field name="fullName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Họ và tên</FieldLabel>
                <Input
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={isInvalid}
                  disabled={isPending}
                />
                <FieldDescription>
                  Tên hiển thị trên lớp học, khóa học và các trang quản lý.
                </FieldDescription>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input value={user.email} readOnly disabled />
          </Field>

          <Field>
            <FieldLabel>Tên đăng nhập</FieldLabel>
            <Input value={user.username} readOnly disabled />
          </Field>
        </div>
      </FieldGroup>

      <div className="flex justify-end">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              size="lg"
              className="min-w-[150px]"
              disabled={!canSubmit || isSubmitting || isPending}
            >
              {isSubmitting || isPending ? (
                <>
                  <IconLoader2 className="animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <IconDeviceFloppy />
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
