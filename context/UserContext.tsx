import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/firebase'
import * as UserService from '@/services/user.service'

export type User = {
  id: string
  username: string
  accessToken: string
  email: string
  image: string | null
  firebase: FirebaseUser
}

interface UserContextProps {
  user: User | null
  isModalOpen: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  openLoginModal: () => void
  closeLoginModal: () => void
  refreshUser: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextProps | undefined>(undefined)
let intervalIndex = 0

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const openLoginModal = () => setIsModalOpen(true)
  const closeLoginModal = () => setIsModalOpen(false)

  const refreshUser = async (currentUser?: FirebaseUser) => {
    setIsLoading(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser({
        ...JSON.parse(storedUser),
        firebase: currentUser || user?.firebase,
      })
    }
    let accessToken = await user?.firebase.getIdToken(true)
    if (!accessToken) accessToken = await currentUser?.getIdToken(true)
    if (accessToken) {
      const refreshUser = await UserService.get(accessToken)
      setUser({
        ...(currentUser || user),
        ...refreshUser,
        firebase: currentUser || user?.firebase,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      clearInterval(intervalIndex)
      intervalIndex = setInterval(() => refreshUser(), 20000) as any
    }
    return () => clearInterval(intervalIndex)
  }, [user])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) refreshUser(currentUser)
      else {
        localStorage.removeItem('user')
        setUser(null)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      setUser,
      isModalOpen,
      openLoginModal,
      closeLoginModal,
      refreshUser,
    }),
    [user, isLoading, isModalOpen, openLoginModal, closeLoginModal, refreshUser]
  )

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
