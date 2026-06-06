import type { ReactNode } from "react"
import type { CSSProperties } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function ManageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17rem",
        } as CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="flex min-h-svh min-w-0 flex-col text-foreground">
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
