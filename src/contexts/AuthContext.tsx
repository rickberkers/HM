import { ReactNode, useContext, useState, useEffect, createContext } from "react"
import { auth } from "../firebaseSetup";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { User } from "../models/User";

/* --- AuthContext --- */
interface AuthContextValues {
  login: () => void
  logout: () => void
  currentUser: User | undefined
}
const AuthContext = createContext<AuthContextValues>(undefined!);

/* --- AuthHooks --- */
export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider(props: {children: ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User>();
    const [authLoading, setAuthLoading] = useState<boolean>(true);

    const login = () => signInWithPopup(auth, new GoogleAuthProvider());
    const logout = () => signOut(auth);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user ?? undefined);
        setAuthLoading(false);
      })
      return unsubscribe;
    }, [])

    const values = {
      login,
      logout,
      currentUser
    }

    return (
      <AuthContext.Provider value={values}>
        {!authLoading && props.children}
      </AuthContext.Provider>
    );
  }