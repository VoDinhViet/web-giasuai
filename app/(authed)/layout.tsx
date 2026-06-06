import { redirect } from "next/navigation"

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

  return <AuthProvider initialUser={currentUserResponse.data}>{children}</AuthProvider>
}
