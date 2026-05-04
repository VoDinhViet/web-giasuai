"use client";

import useSWR from "swr";
import { getLevelsAction } from "../actions/course.actions";
import { CatalogItem } from "../types/catalog.type";

export function useLevels() {
  return useSWR<CatalogItem[]>(
    "levels",
    getLevelsAction,
    { revalidateOnFocus: false },
  );
}
