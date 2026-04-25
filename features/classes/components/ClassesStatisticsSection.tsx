"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { ClassesHero } from "./ClassesHero";
import type { ClassStatistics } from "@/types/class";

interface ClassesStatisticsSectionProps {
  statistics: ClassStatistics | null;
}

export function ClassesStatisticsSection({
  statistics,
}: ClassesStatisticsSectionProps) {
  if (!statistics) {
    return null;
  }

  return (
    <PermissionGuard permission="classes.statistics.read">
      <ClassesHero statistics={statistics} />
    </PermissionGuard>
  );
}
