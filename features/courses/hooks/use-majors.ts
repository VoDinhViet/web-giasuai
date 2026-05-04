"use client";

import useSWR from "swr";
import { getMajorsAction } from "../actions/course.actions";
import { CatalogItem } from "../types/catalog.type";

export function useMajors(levelId: string | undefined) {
  return useSWR<CatalogItem[]>(
    levelId ? (["majors", levelId] as const) : null,
    ([, sl]) => getMajorsAction(sl as string),
    { revalidateOnFocus: false }
  );
}
