import type {
  SupabaseClient as SupabaseClientType,
  User as SupabaseUserType,
} from '@supabase/supabase-js';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { Database } from './database.ts';

export type SupabaseClient = SupabaseClientType<Database>;
export type SupabaseRealtimeChannel = RealtimeChannel;
export type SupabaseUser = SupabaseUserType & { bearerToken: string };
