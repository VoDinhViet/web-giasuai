"use client";

/* ── Dependencies ────────────────────────────────────────────────────────── */

import * as React from "react";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CreateCourseFormValues } from "../schemas/course-info.schema";
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

/* ── Contexts ────────────────────────────────────────────────────────────── */

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

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
}

const FormInput = ({ label, ...props }: FormInputProps) => {
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

interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
  label?: string;
}

const FormTextarea = ({ label, ...props }: FormTextareaProps) => {
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

interface FormSelectProps extends Omit<React.ComponentProps<typeof Select>, "children"> {
  label?: string;
  options?: CatalogItem[];
  loading?: boolean;
  placeholder?: string;
}

const FormSelect = ({
  label,
  options = [],
  onValueChange,
  loading,
  placeholder,
  ...props
}: FormSelectProps) => {
  const field = useFieldContext();
  return (
    <FormItem label={label} errors={field.state.meta.errors}>
      <Select
        disabled={loading}
        {...props}
        value={(field.state.value as string) || undefined}
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
  formComponents: {},
  fieldContext,
  formContext,
});
/* ── Default Values ──────────────────────────────────────────────────────── */

export const courseDefaultValues: CreateCourseFormValues = {
  title: "",
  description: "",
  levelId: "",
  gradeId: "",
  majorId: "",
  subjectId: "",
  learningOutcomes: [""],
  thumbnail: null,
};
