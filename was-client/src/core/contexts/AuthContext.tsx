import { ReactNode, useContext, useState, useEffect, createContext } from "react"
import { User } from "../../domains/models/User";
import { useUseCases } from "./DependencyContext";

/* --- AuthContext --- */
interface AuthContextValues {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
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
    const { authRefreshUseCase, authLoginUseCase, authLogoutUseCase } = useUseCases().authUseCases;

    const login = async (username: string, password: string): Promise<void> => {
      return authLoginUseCase.invoke(username, password).then((user) => {
        setCurrentUser(user.payload); // TODO test fail //TODO use hook
      });
    };

    const logout = async (): Promise<void> => {
      return authLogoutUseCase.invoke().finally(() => {
        setCurrentUser(undefined); // TODO test fail
      });
    };
  
    useEffect(() => {
      authRefreshUseCase.invoke().then((token) => {
        setCurrentUser(token.payload);
      }).catch((error) => {
        // TODO error
      });
      setAuthLoading(false);
    }, [authRefreshUseCase])

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