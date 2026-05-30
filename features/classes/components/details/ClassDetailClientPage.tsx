"use client";

import { Class } from "../../types/class.type";
import { ClassDetailStats } from "../../types/class-stats.type";
import { ClassDetailHero } from "./ClassDetailHero";
import { ClassStatsGrid } from "./ClassStatsGrid";
import { ClassDetailTabs } from "./ClassDetailTabs";
import { InstructorCard } from "./InstructorCard";

interface ClassDetailClientPageProps {
  classId: string;
  initialData: Class;
  stats: ClassDetailStats;
}

export function ClassDetailClientPage({
  classId,
  initialData: classData,
  stats,
}: ClassDetailClientPageProps) {
  return (
    <div className="space-y-8 pb-12">
      <ClassDetailHero classData={classData} />

      <ClassStatsGrid stats={stats} />

      <div className="grid gap-8 lg:grid-cols-12">
        <main className="space-y-6 lg:col-span-8">
          <ClassDetailTabs classId={classId} />
        </main>

        <aside className="space-y-6 lg:col-span-4">
          <InstructorCard
            teacher={classData.teacher}
            description={classData.description ?? undefined}
          />
        </aside>
      </div>
    </div>
  );
}
