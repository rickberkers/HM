import { ReactNode, useContext, useState, useEffect, createContext } from "react"
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

    // TODO Auth stuff
    const login = () => null;
    const logout = () => null;
  
    // TODO Auth stuff
    useEffect(() => {
      // const unsubscribe = auth.onAuthStateChanged(user => {
      //   setCurrentUser(user ?? undefined);
      //   setAuthLoading(false);
      // })
      // return unsubscribe;
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