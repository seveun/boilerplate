import { User } from "@queries/user.ts";

declare module "https://deno.land/x/hono/mod.ts" {
  interface HonoRequest {
    user: User;
  }
}
