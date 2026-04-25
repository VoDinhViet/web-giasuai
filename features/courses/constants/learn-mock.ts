export const MOCK_CURRICULUM = [
  {
    title: "Chương 1: Nền tảng React Hiện đại",
    lessons: [
      { id: "1", title: "Tư duy Component & Props nâng cao", duration: "12:45", isCompleted: true, isLocked: false },
      { id: "2", title: "Làm chủ React Hooks (useEffect, useMemo)", duration: "25:30", isCompleted: true, isLocked: false },
      { id: "3", title: "Xử lý State phức tạp với useReducer", duration: "18:15", isCompleted: true, isLocked: false },
      { id: "4", title: "Context API vs Custom Hooks", duration: "14:20", isCompleted: true, isLocked: false },
    ]
  },
  {
    title: "Chương 2: Next.js 15 & App Router",
    lessons: [
      { id: "5", title: "Kiến trúc App Router & File Conventions", duration: "10:50", isCompleted: true, isLocked: false },
      { id: "6", title: "Server Components vs Client Components", duration: "22:15", isCompleted: false, isLocked: false },
      { id: "7", title: "Layouts, Templates & Parallel Routes", duration: "15:40", isCompleted: false, isLocked: false },
      { id: "8", title: "Intercepting Routes cho Modals", duration: "19:00", isCompleted: false, isLocked: false },
      { id: "9", title: "Streaming & Suspense với Loading UI", duration: "11:20", isCompleted: false, isLocked: false },
    ]
  },
  {
    title: "Chương 3: Data Fetching & Caching",
    lessons: [
      { id: "10", title: "Server Actions & Form Mutations", duration: "28:10", isCompleted: false, isLocked: true },
      { id: "11", title: "Optimistic Updates với useOptimistic", duration: "16:30", isCompleted: false, isLocked: true },
      { id: "12", title: "Caching Strategies (ISR, SSG, SSR)", duration: "21:45", isCompleted: false, isLocked: true },
      { id: "13", title: "Làm việc với Drizzle ORM & Database", duration: "32:00", isCompleted: false, isLocked: true },
    ]
  },
  {
    title: "Chương 4: Tối ưu hóa & Triển khai",
    lessons: [
      { id: "14", title: "SEO, Meta Tags & OG Images", duration: "13:25", isCompleted: false, isLocked: true },
      { id: "15", title: "Tối ưu Core Web Vitals (LCP, FID, CLS)", duration: "24:50", isCompleted: false, isLocked: true },
      { id: "16", title: "Deployment lên Vercel & CICD", duration: "09:40", isCompleted: false, isLocked: true },
    ]
  }
];
