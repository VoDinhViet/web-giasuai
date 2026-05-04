"use client";

import * as React from "react";
import { createFormHook, createFormHookContexts, FormApi } from "@tanstack/react-form";
import { 
  CreateCourseFormValues, 
  CourseCurriculumFormValues, 
  CourseCurriculumSyncValues 
} from "../schemas/create-course.schema";
import { CatalogItem } from "../types/catalog.type";
import { IconLoader2 } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();

/* ── Form Item Helper ────────────────────────────────────────────────────── */

interface FormItemProps {
  label?: string;
  children: React.ReactNode;
  errors?: Array<{ message?: string } | undefined>;
}

function FormItem({ label, children, errors }: FormItemProps) {
  return (
    <Field>
      {label && (
        <FieldLabel className="text-[10px] font-bold uppercase text-zinc-500">
          {label}
        </FieldLabel>
      )}
      {children}
      <FieldError errors={errors} />
    </Field>
  );
}

/* ── Field Components ────────────────────────────────────────────────────── */

const FormInput = ({ label, ...props }: { label?: string } & React.ComponentProps<typeof Input>) => {
  const field = useFieldContext();
  return (
    <FormItem label={label} errors={field.state.meta.errors}>
      <Input
        {...props}
        value={(field.state.value as string) || ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FormItem>
  );
};

const FormTextarea = ({ label, ...props }: { label?: string } & React.ComponentProps<typeof Textarea>) => {
  const field = useFieldContext();
  return (
    <FormItem label={label} errors={field.state.meta.errors}>
      <Textarea
        {...props}
        value={(field.state.value as string) || ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FormItem>
  );
};

interface FormSelectProps {
  label?: string;
  options?: CatalogItem[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

const FormSelect = ({ label, options = [], onValueChange, loading, placeholder }: FormSelectProps) => {
  const field = useFieldContext();
  return (
    <FormItem label={label} errors={field.state.meta.errors}>
      <Select
        disabled={loading}
        value={(field.state.value as string) || ""}
        onValueChange={(val) => {
          field.handleChange(val);
          onValueChange?.(val);
        }}
      >
        <SelectTrigger className="border-zinc-200 shadow-none">
          {loading ? (
            <span className="flex items-center gap-2 text-zinc-400">
              <IconLoader2 size={14} className="animate-spin" /> Đang tải...
            </span>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.code} value={opt.id}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};

/* ── Form Initialization ──────────────────────────────────────────────────── */

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Textarea: FormTextarea,
    Select: FormSelect,
  },
  formComponents: {
    SubmitButton: ({ children, ...props }: React.ComponentProps<typeof Button>) => {
      const form = useFormContext();
      return (
        <Button {...props} onClick={() => form.handleSubmit()}>
          {children}
        </Button>
      );
    },
  },
  fieldContext,
  formContext,
});

export const  courseDefaultValues: CreateCourseFormValues = {
  title: "Khóa học Next.js Masterclass 2026",
  description: "Hướng dẫn xây dựng ứng dụng thực tế với Next.js, TypeScript và Tailwind CSS từ cơ bản đến nâng cao.",
  levelId: "DAI_HOC",
  gradeId: "NAM_1",
  majorId: "CNTT",
  subjectId: "WEB_DEV",
  learningOutcomes: [
    "Nắm vững kiến thức cốt lõi về React Server Components",
    "Xây dựng ứng dụng Full-stack với Server Actions",
    "Tối ưu hóa hiệu năng và SEO cho website",
  ],
  thumbnail: null,
};
