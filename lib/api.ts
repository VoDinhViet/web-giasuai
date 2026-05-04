import { ofetch } from "ofetch";
import { env } from "./env";

export const api = ofetch.create({
  baseURL: env.API_URL,
  async onRequest({ options }) {
    try {
      const { getSession } = await import("./session");
      const session = await getSession();
      if (session.accessToken) {
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${session.accessToken}`);
        options.headers = headers;
      }
    } catch (e) {
      // Ignore if cookies/session cannot be accessed (e.g. client side)
    }
  },
  async onResponseError({ response }) {
    // Log lỗi hoặc xử lý chung (ví dụ: logout nếu 401)
    console.error(`[API Error] ${response.status}: ${response._data?.message}`);
  },
});
