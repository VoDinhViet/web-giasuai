import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoginLoading() {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
