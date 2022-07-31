import { IonContent, IonPage } from "@ionic/react";
import { ReactNode, useState, useEffect, createContext } from "react"
import { AccessToken, AccessTokenPayload } from "../../domains/models/Token";
import Spinner from "../../presentation/components/shared/spinner/Spinner";
import { UnauthenticatedError } from "../errors";
import { useInterval } from "../hooks/useInterval";
import { useDependencies, useUseCases } from "./DependencyContext";

/* --- AuthContext --- */
interface AuthContextValues {
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  user: AccessTokenPayload | undefined
  isAuthenticated: boolean
}
export const AuthContext = createContext<AuthContextValues>(undefined!);

export function AuthProvider(props: {children: ReactNode}) {
  
    const [user, setUser] = useState<AccessToken['payload']>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const { authRefreshUseCase, authLoginUseCase, authLogoutUseCase } = useUseCases().authUseCases;
    const tokenSetter = useDependencies().setNewToken;

    //#region auth methods
    const login = async (username: string, password: string): Promise<void> => {
      return authLoginUseCase.invoke(username, password).then((newToken) => {
        tokenSetter(newToken.token);
        setUser(newToken.payload);
        setIsAuthenticated(true);
      });
    };
    const logout = async (): Promise<void> => {
      return authLogoutUseCase.invoke().then(() => {
        setIsAuthenticated(false);
        setUser(undefined);
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
      .catch((error) => {
        /* protected routes will redirect to sign-in */
      })
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
        {authLoading ?
          <IonPage>
              <IonContent>
                <Spinner text="Authenticating..."/>
              </IonContent>
          </IonPage>
          :
            props.children
        }
      </AuthContext.Provider>
    );
  }