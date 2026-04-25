"use client";

import React from "react";
import { useQueryStates } from "nuqs";
import { Class, ClassStatistics } from "@/types/class";
import { PaginationInfo } from "@/types/api";
import { ClassFilters } from "./ClassFilters";
import { ClassEmptyState } from "./ClassEmptyState";
import { ClassCard } from "./ClassCard";
import { ClassesStatisticsSection } from "./ClassesStatisticsSection";
import { SimplePagination } from "@/components/shared/SimplePagination";
import { classParamsSchema } from "../params/class-params";

interface Props {
  initialClasses: Class[];
  pagination: PaginationInfo;
  statistics: ClassStatistics | null;
}

export function ClassesClientPage({
  initialClasses,
  pagination,
  statistics,
}: Props) {
  const [filters, setFilters] = useQueryStates(classParamsSchema, {
    shallow: false,
  });
  const hasClasses = initialClasses && initialClasses.length > 0;
  const handleFiltersChange = (newFilters: Record<string, string | number>) =>
    setFilters({ ...newFilters, page: 1 });

  return (
    <div className="space-y-10 pb-20 relative">
      <ClassesStatisticsSection statistics={statistics} />

      <div className="space-y-8 relative z-10">
        <ClassFilters filters={filters} onFiltersChange={handleFiltersChange} />

        {hasClasses ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {initialClasses.map((item) => (
                <ClassCard key={item.id} classData={item} />
              ))}
            </div>
            <SimplePagination pagination={pagination} />
          </>
        ) : (
          <ClassEmptyState />
        )}
      </div>
    </div>
  );
}
