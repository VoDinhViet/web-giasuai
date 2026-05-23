import { env } from "@/env";
import { $fetch } from "ofetch";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

export const api = $fetch.create({
  baseURL: API_BASE_URL,
});
