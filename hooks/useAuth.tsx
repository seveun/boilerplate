import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup as signInWithGooglePopup,
  FacebookAuthProvider,
  signInWithPopup as signInWithFacebookPopup,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useUser } from '../context/UserContext'

export const useAuth = () => {
  const { closeLoginModal } = useUser()

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Erreur lors de la déconnexion: ', error)
    }
  }

  const handleRegister = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      closeLoginModal()
    } catch (error) {
      console.error('Erreur lors de la création du compte: ', error)
    }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      closeLoginModal()
    } catch (error) {
      console.error('Erreur lors de la connexion: ', error)
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithGooglePopup(auth, provider)
      closeLoginModal()
    } catch (error) {
      console.error('Erreur lors de la connexion avec Google: ', error)
    }
  }

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider()
    try {
      await signInWithFacebookPopup(auth, provider)
      closeLoginModal()
    } catch (error) {
      console.error('Erreur lors de la connexion avec Facebook: ', error)
    }
  }

  return {
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    handleFacebookLogin,
    handleLogout,
  }
}
