import React from "react";
import { IconFolders } from "@tabler/icons-react";
import { withForm, DefaultCurriculumValues } from "./curriculum-form-config";

export const SectionEditor = withForm({
  defaultValues: DefaultCurriculumValues,
  props: {
    sIdx: 0 as number,
  },
  render: function Render({ form, sIdx }) {
    return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-sm">
          <IconFolders size={24} stroke={2.5} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Cấu trúc chương
          </h2>
          <p className="text-xs text-zinc-500 font-medium">
            Chương {sIdx + 1} • Quản lý thông tin chung
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <form.AppField
          name={`courseSections[${sIdx}].title`}
          children={(field) => (
            <field.TextField
              label="Tiêu đề chương học"
              placeholder="Ví dụ: Chương 1: Giới thiệu tổng quan..."
            />
          )}
        />
      </div>
    </div>
    );
  },
});
