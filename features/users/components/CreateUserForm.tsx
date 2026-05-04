"use client";

import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { IconLoader2, IconUserPlus } from "@tabler/icons-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/user";
import {
  createUserSchema,
  type CreateUserInput,
} from "../schemas/create-user.schema";
import { createUser } from "../actions/create-user";

interface CreateUserFormProps {
  onSuccess?: () => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      role: UserRole.STUDENT,
    },
    validators: {
      onSubmit: createUserSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await createUser(value);

        if (result.success) {
          toast.success(result.message);
          form.reset();
          onSuccess?.();
          return;
        }

        toast.error(result.message);
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
        <form.Field name="fullName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                  Họ và tên <span className="text-rose-500">*</span>
                </FieldLabel>
                <Input
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  disabled={isPending}
                />
                <FieldDescription>
                  Tên hiển thị của người dùng trong hệ thống.
                </FieldDescription>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <form.Field name="username">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                    Tên đăng nhập <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    placeholder="username"
                    autoComplete="username"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending}
                  />
                  <FieldDescription>
                    Dùng cho đăng nhập, nên ngắn gọn và không dấu.
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                    Email <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending}
                  />
                  <FieldDescription>
                    Email sẽ được dùng cho liên hệ và khôi phục tài khoản.
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder={"••••••••"}
                    autoComplete="new-password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending}
                  />
                  <FieldDescription>
                    Mật khẩu tạm thời có ít nhất 6 ký tự.
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="role">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                    Vai trò <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as CreateUserInput["role"])
                    }
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.STUDENT}>
                        Học viên
                      </SelectItem>
                      <SelectItem value={UserRole.TEACHER}>
                        Giáo viên
                      </SelectItem>
                      <SelectItem value={UserRole.ADMIN}>
                        Quản trị viên
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Chọn nhóm quyền phù hợp trước khi cấp tài khoản.
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>
        </div>
      </FieldGroup>

      <div className="flex justify-end border-t pt-5 dark:border-zinc-800">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              size="lg"
              className="min-w-[160px] font-bold"
              disabled={!canSubmit || isSubmitting || isPending}
            >
              {isSubmitting || isPending ? (
                <>
                  <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <IconUserPlus className="mr-2 h-4 w-4" />
                  Tạo người dùng
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
