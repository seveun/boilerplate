import { createClient } from "@supabase/supabase-js";
import { SupabaseClient } from "@shared/types/supabase.ts";

let adminInstance: SupabaseClient | null = null;

export const getSupabaseAdmin = () => {
  if (!adminInstance) {
    adminInstance = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    ) as unknown as SupabaseClient;
  }
  return adminInstance;
};

export const getSupabaseClient = (token: string) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { accessToken: async () => token },
  ) as unknown as SupabaseClient;
  return supabase;
};
