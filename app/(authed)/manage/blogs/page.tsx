import { IconMessageCircle } from "@tabler/icons-react";
import { PageHeader } from "@/components/shared/PageHeader";

export default function BlogsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader
        title="Tin tức & Blogs"
        description="Quản lý các bài viết, thông báo và tin tức giáo dục trên hệ thống."
      />
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl">
        <div className="size-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-300 dark:text-zinc-700">
           <IconMessageCircle size={40} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Tin tức</h3>
        <p className="text-zinc-500 text-sm">Hệ thống quản lý nội dung bài viết đang được thiết lập.</p>
      </div>
    </div>
  );
}
