import { createClient } from '@/utils/supabase/component';
import { useWallet } from '@hooks/useWallet';
import { User } from '@queries/user';
import { Wallet } from '@queries/wallet';
import { getUserInfos, listen } from '@shared/supabase/queries/user';
import { useSupabaseQuery } from '@utils/supabase.utils.ts';
import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserContextProps {
  user: User | null;
  setSelectedWallet: (
    wallet: 'EUR' | 'USD' | 'BTC' | 'ETH' | 'LTC' | 'USDT',
  ) => void;
  isLoading: boolean;
  selectedWallet: string | null;
  wallets: Wallet[];
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode; user: User }> = ({
  children,
  user: initialUser,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  const { selectedWallet, setSelectedWallet, wallets } = useWallet();

  const { data: userInfos, isLoading } = useSupabaseQuery(getUserInfos, {
    skip: !user?.id,
    payload: user?.id as string,
    listener: {
      fn: listen.userInfos,
    },
  });

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user as User);
      } else if (event !== 'INITIAL_SESSION') {
        router.push('/');
        setUser(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: {
          ...user,
          ...userInfos,
        } as User,
        isLoading,
        selectedWallet,
        setSelectedWallet,
        wallets,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
