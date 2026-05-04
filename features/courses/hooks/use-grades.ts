"use client";

import useSWR from "swr";
import { getGradesAction } from "../actions/course.actions";
import { CatalogItem } from "../types/catalog.type";

export function useGrades(levelId: string | undefined) {
  return useSWR<CatalogItem[]>(
    levelId ? (["grades", levelId] as const) : null,
    ([, sl]) => getGradesAction(sl as string),
    { revalidateOnFocus: false }
  );
}
