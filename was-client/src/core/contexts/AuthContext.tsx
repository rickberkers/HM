import { ReactNode, useContext, useState, useEffect, createContext } from "react"
import { User } from "../../domains/models/User";
import { useInterval } from "../hooks/useInterval";
import { useDependencies, useUseCases } from "./DependencyContext";

/* --- AuthContext --- */
interface AuthContextValues {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  user: User | undefined
  isAuthenticated: boolean
}
const AuthContext = createContext<AuthContextValues>(undefined!);

/* --- AuthHooks --- */
export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider(props: {children: ReactNode}) {

    const [user, setUser] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const { authRefreshUseCase, authLoginUseCase, authLogoutUseCase } = useUseCases().authUseCases;
    const tokenSetter = useDependencies().setNewToken;

    //#region auth methods
    const login = async (username: string, password: string): Promise<void> => {
      return authLoginUseCase.invoke(username, password).then((newToken) => {
        tokenSetter(newToken.token);
        setUser(newToken.payload); // TODO test fail //TODO use hook
        setIsAuthenticated(true);
      });
    };
    const logout = async (): Promise<void> => {
      return authLogoutUseCase.invoke().finally(() => {
        setUser(undefined); // TODO test fail
        setIsAuthenticated(false);
        tokenSetter("");
      });
    };
    //#endregion

    //#region Hooks
    /**
     * Attempt to get token on startup
     */
    useEffect(() => {
      authRefreshUseCase.invoke().then((newToken) => {
        tokenSetter(newToken.token);
        setUser(newToken.payload);
        setIsAuthenticated(true);
      })
      .catch(() => {/* protected routes will redirect to sign-in */})
      .finally(() => setAuthLoading(false));;
    }, [authRefreshUseCase, tokenSetter]);

    /**
     * Token refresh every 8 minutes
     */
    useInterval(() => {
      if(!isAuthenticated) return; 
      authRefreshUseCase.invoke().then((newToken) => {
        tokenSetter(newToken.token);
      });
    }, 480000);

    //#endregion

    const values = {
      login,
      logout,
      user,
      isAuthenticated
    }

    return (
      <AuthContext.Provider value={values}>
        {!authLoading && props.children}
      </AuthContext.Provider>
    );
  }