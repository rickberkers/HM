import { ReactNode, useContext, useState, useEffect, createContext } from "react"
import { auth } from "../firebaseSetup";
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
// import firebase from "firebase/app";

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

    const login = () => {
        const googleSignInProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleSignInProvider)
        .then((result) => {
          const user = result.user;
          setCurrentUser(result.user);
          console.log(user);
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
    const logout = () => {
      signOut(auth).then(() => {
        console.log("noerror");
        setCurrentUser(undefined);
      })
      .catch(() => {
        console.log("error");
      });
    }
  
    /**
     * Cleanup for auth subscription
     */
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(undefined);
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
        {props.children}
      </AuthContext.Provider>
    );
  }