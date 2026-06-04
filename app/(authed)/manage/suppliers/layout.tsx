import type { ReactNode } from "react"

export default function SuppliersLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div className="flex w-full flex-col gap-5">{children}</div>
}
