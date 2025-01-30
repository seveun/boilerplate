import { UserInfos } from "@schema/user.schema.ts";
import { updateUserInfos, User } from "@queries/user.ts";
import { getSupabaseAdmin } from "@utils/supabase.ts";

export const updateUser = async (userData: UserInfos, user: User) => {
  const supabaseAdmin = getSupabaseAdmin();
  await updateUserInfos(supabaseAdmin, userData, user.id);
};
