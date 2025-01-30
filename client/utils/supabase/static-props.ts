import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from '@/config.ts';
import { createClient as createClientPrimitive } from '@supabase/supabase-js';

export function createClient() {
  return createClientPrimitive(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
