import type { SupabaseClient } from '../types/supabase.ts';

const secrets: Record<string, string> = {};

export const getSecret = async (
  supabaseAdmin: SupabaseClient,
  name: string,
): Promise<string> => {
  if (secrets[name]) return secrets[name];
  const { data, error } = await supabaseAdmin.rpc('read_secret', {
    secret_name: name,
  });
  if (error) throw error;
  secrets[name] = data;
  return data;
};
