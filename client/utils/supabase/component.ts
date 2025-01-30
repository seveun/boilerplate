import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from '@/config.ts';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@shared/types/supabase';

export function createClient() {
  return createBrowserClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ) as unknown as SupabaseClient;
}
