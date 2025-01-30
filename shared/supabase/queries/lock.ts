import type { SupabaseClient } from '../../types/supabase.ts';
import { Tables } from '../../types/database.ts';

export type Lock = Tables<'locks'>;
type lockAction = 'block-transactions' | `game-${string}`;

export const lock = async (
  supabase: SupabaseClient,
  action: lockAction,
  userId?: string,
) => {
  const { error } = await supabase.from('locks').insert({
    action,
    user_id: userId ?? 'everyone',
  });
  if (error) throw new Error('Too many requests');
  return true;
};

export const unlock = async (
  supabase: SupabaseClient,
  action: lockAction,
  userId?: string,
) => {
  const err = await supabase
    .from('locks')
    .delete()
    .eq('action', action)
    .eq('user_id', userId ?? 'everyone');
  return true;
};
