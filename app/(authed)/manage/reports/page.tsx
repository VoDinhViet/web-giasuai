import { IconChartBar } from "@tabler/icons-react";
import { PageHeader } from "@/components/shared/PageHeader";

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader
        title="Báo cáo & Thống kê"
        description="Phân tích dữ liệu học tập, hiệu quả giảng dạy và sự tiến bộ của học viên."
      />
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl">
        <div className="size-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-300 dark:text-zinc-700">
           <IconChartBar size={40} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Trung tâm dữ liệu</h3>
        <p className="text-zinc-500 text-sm">Các báo cáo chi tiết đang được tổng hợp dữ liệu.</p>
      </div>
    </div>
  );
}
