import type { ReactNode } from "react"

export default function ManageLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <footer className=" py-5 text-center text-sm font-semibold tracking-wide text-muted-foreground">
        © 2026 Cơ khí Tiến Huy. Tất cả quyền được bảo lưu.
      </footer>
    </div>
  )
}
