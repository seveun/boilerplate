import { SupabaseUser } from '../../types/supabase.ts';
import { Tables } from '../../types/database.ts';
import type { SupabaseClient } from '../../types/supabase.ts';
import { listenChannel } from '../channel.ts';
import { lock, unlock } from './lock.ts';

export type User = SupabaseUser & { bearerToken: string } & UserInfos;

export type UserInfos = Omit<Tables<'users_infos'>, 'postal_address'> & {
  postal_address?: {
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address: string;
  };
};

export const listen = {
  userInfos: (supabase: SupabaseClient, callback: Function) =>
    listenChannel(supabase, 'users_infos', callback),
};

export const getUsersPublicInfos = async (
  supabase: SupabaseClient,
  usersIds: string[],
) => {
  const { data: userInfos, error } = await supabase
    .from('users_infos_public')
    .select('*')
    .in('user_id', usersIds);
  return userInfos;
};

export const getUserInfos = async (
  supabase: SupabaseClient,
  userId: string,
): Promise<UserInfos | null> => {
  const { data: userInfos, error } = await supabase
    .from('users_infos')
    .select('*')
    .eq('user_id', userId)
    .single();
  return userInfos as UserInfos;
};

export const updateUserInfos = async (
  supabase: SupabaseClient,
  userData: Partial<UserInfos>,
  userId: string,
) => {
  const { error } = await supabase
    .from('users_infos')
    .update(userData)
    .eq('user_id', userId);
  if (error) throw error;
};
