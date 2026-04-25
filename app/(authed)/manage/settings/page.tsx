import { IconSettings } from "@tabler/icons-react";
import { PageHeader } from "@/components/shared/PageHeader";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader
        title="Cài đặt hệ thống"
        description="Cấu hình các tham số vận hành, bảo mật và giao diện của nền tảng."
      />
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl">
        <div className="size-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-300 dark:text-zinc-700">
           <IconSettings size={40} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Cài đặt</h3>
        <p className="text-zinc-500 text-sm">Trang cấu hình hệ thống đang được thiết lập.</p>
      </div>
    </div>
  );
}
