import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ManageHeader } from "@/components/manage-header";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-50/50 dark:bg-zinc-950">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-transparent">
          <ManageHeader />
          <main className="flex-1 px-6 py-6 w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
