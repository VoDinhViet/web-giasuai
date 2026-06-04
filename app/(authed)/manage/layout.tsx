import type { ReactNode } from "react"

export default function ManageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
