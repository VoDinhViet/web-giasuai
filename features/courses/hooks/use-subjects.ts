"use client";

import useSWR from "swr";
import { getSubjectsAction } from "../actions/course.actions";
import { CatalogItem } from "../types/catalog.type";

interface UseSubjectsParams {
  levelId: string | undefined;
  gradeId: string | undefined;
  majorId: string | undefined;
}

export function useSubjects({ levelId, gradeId, majorId }: UseSubjectsParams) {
  return useSWR<CatalogItem[]>(
    levelId ? (["subjects", levelId, gradeId, majorId] as const) : null,
    ([, li, gi, mi]) =>
      getSubjectsAction({
        levelId: li as string,
        gradeId: (gi as string) || undefined,
        majorId: (mi as string) || undefined,
      }),
    { revalidateOnFocus: false },
  );
}
