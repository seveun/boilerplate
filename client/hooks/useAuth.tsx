import { NEXT_PUBLIC_URL } from '@/config.ts';
import { useUser } from '@/context/userContext';
import { createClient } from '@/utils/supabase/component';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const { user } = useUser();
  const supabase = createClient();

  const handleLogout = async (
    scope: 'local' | 'global' | 'others' = 'local',
  ) => {
    if (user) {
      const { error } = await supabase.auth.signOut({ scope });

      if (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const handleRegister = async (
    email: string,
    username: string,
    password: string,
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: username,
        },
      },
    });
    if (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async (cb?: () => void) => {
    const { error } = await supabase.auth.signInWithOAuth({
      options: { redirectTo: NEXT_PUBLIC_URL },
      provider: 'google',
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleFacebookLogin = async (cb?: () => void) => {
    const { error } = await supabase.auth.signInWithOAuth({
      options: { redirectTo: NEXT_PUBLIC_URL },
      provider: 'facebook',
    });

    if (error) {
      toast.error(error.message);
    }
  };

  const handleSteamLogin = async (cb?: () => void) => {
    toast.error('Not implemented');
  };

  const handleChangePassword = async (password: string) => {
    if (user) {
      await supabase.auth.updateUser({ password });
    }
  };

  return {
    handleChangePassword,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    handleFacebookLogin,
    handleLogout,
    handleSteamLogin,
  };
};
