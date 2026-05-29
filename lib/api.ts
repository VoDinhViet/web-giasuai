import { env } from "@/env";
import { getSession } from "@/lib/session";
import { $fetch } from "ofetch";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

export const api = $fetch.create({
  baseURL: API_BASE_URL,
  async onRequest({ options }) {
    const session = await getSession();

    if (!session.accessToken) {
      return;
    }

    const headers = new Headers(options.headers);

    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${session.accessToken}`);
    }

    options.headers = headers;
  },
});
