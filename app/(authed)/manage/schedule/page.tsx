import { IconCalendarEvent } from "@tabler/icons-react";
import { ManageHeader } from "@/components/manage-header";

export default function SchedulePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ManageHeader
        title="Lịch giảng dạy"
        description="Theo dõi và quản lý lịch trình dạy học của các giảng viên."
      />
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl">
        <div className="size-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-300 dark:text-zinc-700">
           <IconCalendarEvent size={40} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Sắp ra mắt</h3>
        <p className="text-zinc-500 text-sm">Hệ thống quản lý lịch trình đang được tối ưu hóa.</p>
      </div>
    </div>
  );
}
