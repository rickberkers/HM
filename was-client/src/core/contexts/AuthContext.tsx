import { ReactNode, useContext, useState, useEffect, createContext, useRef } from "react"
import { AccessToken } from "../../domains/models/Token";
import { User } from "../../domains/models/User";
import { useInterval } from "../hooks/useInterval";
import { useUseCases } from "./DependencyContext";

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
    const token = useRef<AccessToken>();

    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const { authRefreshUseCase, authLoginUseCase, authLogoutUseCase } = useUseCases().authUseCases;

    //#region auth methods
    const login = async (username: string, password: string): Promise<void> => {
      return authLoginUseCase.invoke(username, password).then((newToken) => {
        setUser(newToken.payload); // TODO test fail //TODO use hook
        setIsAuthenticated(true);
        token.current = newToken;
      });
    };
    const logout = async (): Promise<void> => {
      return authLogoutUseCase.invoke().finally(() => {
        setUser(undefined); // TODO test fail
        setIsAuthenticated(false);
        token.current = undefined;
      });
    };
    //#endregion

    //#region Hooks
    /**
     * Attempt to get token on startup
     */
    useEffect(() => {
      authRefreshUseCase.invoke().then((newToken) => {
        setUser(newToken.payload);
        setIsAuthenticated(true);
        token.current = newToken;
      })
      .catch(() => {/* protected routes will redirect to sign-in */})
      .finally(() => setAuthLoading(false));;
    }, [authRefreshUseCase]);

    /**
     * Token refresh every 8 minutes
     */
    useInterval(() => {
      if(token === undefined) return; 
      authRefreshUseCase.invoke().then((newToken) => {
        token.current = newToken;
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