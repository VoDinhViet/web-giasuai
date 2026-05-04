"use client";

import * as React from "react";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CourseCurriculumSyncValues } from "../../../schemas/course-curriculum.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();

/* ── Default Values ──────────────────────────────────────────────────────── */

export const DefaultCurriculumValues: CourseCurriculumSyncValues = {
  courseSections: [
    {
      title: "Chương 1: Giới thiệu",
      lessons: [
        {
          title: "Bài 1: Tổng quan",
          lessonParts: [{ title: "Tài liệu hướng dẫn", file: null }],
        },
      ],
    },
  ],
};

/* ── Form Item Helper ────────────────────────────────────────────────────── */

interface FormItemProps {
  label?: string;
  children: React.ReactNode;
  errors?: Array<{ message?: string } | undefined>;
}

function FormItem({ label, children, errors }: FormItemProps) {
  return (
    <Field className="space-y-2">
      {label && (
        <FieldLabel className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
          {label}
        </FieldLabel>
      )}
      {children}
      <FieldError errors={errors} />
    </Field>
  );
}

/* ── Bound Field Components ──────────────────────────────────────────────── */

const TextField = ({ label, ...props }: { label?: string } & React.ComponentProps<typeof Input>) => {
  const field = useFieldContext();
  return (
    <FormItem label={label} errors={field.state.meta.errors}>
      <Input
        {...props}
        className={cn(
          "h-11 border-zinc-200 focus:border-zinc-900 transition-colors shadow-none",
          props.className,
        )}
        value={(field.state.value as string) || ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FormItem>
  );
};

const TextareaField = ({ label, ...props }: { label?: string } & React.ComponentProps<typeof Textarea>) => {
  const field = useFieldContext();
  return (
    <FormItem label={label} errors={field.state.meta.errors}>
      <Textarea
        {...props}
        className="min-h-[120px] border-zinc-200 focus:border-zinc-900 transition-colors shadow-none"
        value={(field.state.value as string) || ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FormItem>
  );
};

/* ── Form Initialization ─────────────────────────────────────────────────── */

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
  },
  formComponents: {
    SubmitButton: ({ children, ...props }: React.ComponentProps<"button">) => {
      const form = useFormContext();
      return (
        <button {...props} onClick={() => form.handleSubmit()}>
          {children}
        </button>
      );
    },
  },
  fieldContext,
  formContext,
});
