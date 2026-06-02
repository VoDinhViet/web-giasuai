import { SidebarProvider } from '@/components/ui/sidebar'

interface LearnLayoutProps {
  children: React.ReactNode
}

export default function LearnLayout({ children }: LearnLayoutProps) {
  return (
    <SidebarProvider
      style={{ '--sidebar-width': '19rem' } as React.CSSProperties}
    >
      {children}
    </SidebarProvider>
  )
}
