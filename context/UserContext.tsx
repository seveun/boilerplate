import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { ref, onValue, off } from "firebase/database";
import { auth, database } from "@/firebase";
import { useQuery, useQueryClient } from "react-query";
import * as UserService from "@/services/user.service";
import { User as UserType } from "@schemas/User.schema";

export type User = {
  accessToken: string;
  firebase: FirebaseUser;
} & UserType;

interface UserContextProps {
  user: User | null;
  isModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const firebaseUserRef = useRef<FirebaseUser | null>(null);

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);

  const refreshUser = async () => {
    if (firebaseUserRef.current) {
      await firebaseUserRef.current.getIdToken(true);
      await queryClient.fetchQuery("user");
    }
  };

  const { data: user, isLoading } = useQuery(
    "user",
    async () => {
      if (firebaseUserRef.current) {
        const accessToken = await firebaseUserRef.current.getIdToken(true);
        return await UserService.get(accessToken);
      }
      return null;
    },
    {
      enabled: !!firebaseUserRef.current,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
    },
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      firebaseUserRef.current = currentUser;
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);
        onValue(userRef, () => {
          refreshUser();
        });
        return () => off(userRef);
      } else {
        queryClient.setQueryData("user", null);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(
    () => ({ user, isLoading, openLoginModal, closeLoginModal, isModalOpen }),
    [user, isLoading, isModalOpen, openLoginModal, closeLoginModal],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
