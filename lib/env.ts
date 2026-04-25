import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SESSION_COOKIE_PASSWORD: z.string().min(32),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    API_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    SESSION_COOKIE_PASSWORD: process.env.SESSION_COOKIE_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
  },
});
