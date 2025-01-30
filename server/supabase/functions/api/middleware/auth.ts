import { HonoRequest, Next } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { unauthorized } from "@api/utils/responses.ts";
import { getSupabaseAdmin } from "@utils/supabase.ts";

export const auth = async ({ req }: { req: HonoRequest }, next: Next) => {
  const token = req.header("Authorization");
  if (!token) return unauthorized();
  const supabase = getSupabaseAdmin();
  const bearerToken = token.split("Bearer ")?.[1];
  const { data: user, error } = await supabase.auth.getUser(bearerToken);
  if (error) return unauthorized();
  req.user = { ...user.user, bearerToken };
  await next();
};
