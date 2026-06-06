import { Skeleton } from "@/components/ui/skeleton"

export default function AddClassCourseLoading() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="rounded border border-border/80 bg-card p-5 shadow-xs">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="mt-3 h-7 w-72 max-w-full" />
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-5">
          <section className="grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </section>

          <section className="rounded border border-border/80 bg-card p-5 shadow-xs">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="mt-2 h-4 w-80 max-w-full" />
            <div className="mt-5 grid gap-4">
              <Skeleton className="h-10" />
              <div className="grid gap-3 md:grid-cols-2">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
              </div>
            </div>
          </section>
        </div>

        <aside className="grid gap-5">
          <Skeleton className="h-64" />
          <Skeleton className="h-72" />
          <Skeleton className="h-24" />
        </aside>
      </div>
    </div>
  )
}
