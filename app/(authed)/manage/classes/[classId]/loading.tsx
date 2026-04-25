import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ClassDetailLoading() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden rounded-xl bg-zinc-950 px-8 py-12 shadow-xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md bg-zinc-800" />
            <Skeleton className="h-6 w-32 rounded-full bg-zinc-800" />
            <Skeleton className="h-4 w-20 rounded bg-zinc-800" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 rounded-lg bg-zinc-800" />
            <Skeleton className="h-6 w-1/2 rounded-md bg-zinc-800" />
          </div>
          <div className="flex gap-8 pt-2">
            <Skeleton className="h-10 w-40 rounded-lg bg-zinc-800" />
            <Skeleton className="h-10 w-40 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} >
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4 pb-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Card className="rounded-[2rem] border-none shadow-none bg-white dark:bg-zinc-900">
              <CardContent className="p-8 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-none bg-white dark:bg-zinc-900">
            <CardContent className="p-8 space-y-6 text-center">
              <Skeleton className="mx-auto h-24 w-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="mx-auto h-6 w-48" />
                <Skeleton className="mx-auto h-4 w-32" />
              </div>
              <Skeleton className="h-20 w-full rounded-2xl" />
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none bg-zinc-950 p-8 shadow-none">
            <CardContent className="space-y-6 p-0 text-center">
              <Skeleton className="mx-auto h-32 w-32 rounded-3xl bg-zinc-800" />
              <div className="space-y-2">
                <Skeleton className="mx-auto h-6 w-40 bg-zinc-800" />
                <Skeleton className="mx-auto h-12 w-full bg-zinc-800" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
