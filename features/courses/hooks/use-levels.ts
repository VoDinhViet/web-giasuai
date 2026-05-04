"use client";

import useSWR from "swr";
import { getSchoolLevelsAction } from "../actions/course.actions";
import { CatalogItem } from "../types/catalog.type";

export function useLevels() {
  return useSWR<CatalogItem[]>(
    "levels",
    getSchoolLevelsAction,
    { revalidateOnFocus: false },
  );
}
