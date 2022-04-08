import { ReactNode, useContext, useState, useEffect, createContext, useCallback } from "react"
import { AccessToken } from "../../domains/models/Token";
import { User } from "../../domains/models/User";
import { useInterval } from "../hooks/useInterval";
import { useUseCases } from "./DependencyContext";

/* --- AuthContext --- */
interface AuthContextValues {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  user: User | undefined
}
const AuthContext = createContext<AuthContextValues>(undefined!);

/* --- AuthHooks --- */
export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider(props: {children: ReactNode}) {

    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<AccessToken>();

    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const { authRefreshUseCase, authLoginUseCase, authLogoutUseCase } = useUseCases().authUseCases;

    //#region Methods

    const login = async (username: string, password: string): Promise<void> => {
      return authLoginUseCase.invoke(username, password).then((token) => {
        setUser(token.payload); // TODO test fail //TODO use hook
        setToken(token);
      });
    };

    const logout = async (): Promise<void> => {
      return authLogoutUseCase.invoke().finally(() => {
        setUser(undefined); // TODO test fail
        setToken(undefined);
      });
    };

    const refreshToken = useCallback(async () => {
      return authRefreshUseCase.invoke().then((token) => {
        setUser(token.payload);
        setToken(token);
      });
    }, [authRefreshUseCase]);

    //#endregion

    //#region Hooks

    /**
     * Attempt to get token on startup
     */
    useEffect(() => {
      refreshToken()
        .catch()
        //() => {/* protected routes will redirect to sign-in */}
        .finally(() => setAuthLoading(false));
    }, [refreshToken]);

    /**
     * Token refresh every 8 minutes
     */
    useInterval(() => {
      // console.log(token);
      // refreshToken();
      // console.log("attempt");
    }, 2000);

    //#endregion

    const values = {
      login,
      logout,
      user,
    }

    return (
      <AuthContext.Provider value={values}>
        {!authLoading && props.children}
      </AuthContext.Provider>
    );
  }