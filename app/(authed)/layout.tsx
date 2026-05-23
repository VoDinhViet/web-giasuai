import type { CSSProperties } from "react"
import { redirect } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getCurrentUser } from "@/features/auth/actions/get-current-user"
import { AuthProvider } from "@/features/auth/components/auth-provider"

export default async function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUserResponse = await getCurrentUser()

  if (!currentUserResponse.success || !currentUserResponse.data) {
    redirect("/login")
  }

  return (
    <AuthProvider initialUser={currentUserResponse.data}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "20rem",
          } as CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="bg-background">
          <div className="flex min-h-svh flex-col text-foreground">
            <AppTopbar />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
