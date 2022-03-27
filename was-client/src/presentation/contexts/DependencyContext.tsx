import axios from "axios";
import { ReactNode, useContext, createContext } from "react"
import config from "../../core/config";
import AuthAPIDataSource from "../../data/datasource/API/AuthAPIDataSource";
import AuthRepository from "../../data/repositories/AuthRepository";
import AuthLoginUseCase from "../../domains/useCases/auth/Login";
import AuthLogoutUseCase from "../../domains/useCases/auth/Logout";
import AuthRefreshUseCase from "../../domains/useCases/auth/Refresh";

/* --- Dependencies --- */
const axiosInstance = axios.create({baseURL: config.REACT_APP_API_BASE_URL});
const dataSources = {
  authDataSource: new AuthAPIDataSource(axiosInstance)
}

const repositories = {
  authRepository: new AuthRepository(dataSources.authDataSource)
}

const dependencies = {
  useCases: {
    authUseCases: {
      authLoginUseCase: new AuthLoginUseCase(repositories.authRepository),
      authRefreshUseCase: new AuthRefreshUseCase(repositories.authRepository),
      authLogoutUseCase: new AuthLogoutUseCase(repositories.authRepository)
    }
  }
}

/* --- DependencyContext --- */
const DependencyContext = createContext<typeof dependencies>(undefined!);

/* --- DependencyHooks --- */
export const useDependencies = () => {
  return useContext(DependencyContext);
}
export const useUseCases = () => {
  return useContext(DependencyContext).useCases;
}

export function DependencyProvider(props: {children: ReactNode}) {
    return (
      <DependencyContext.Provider value={dependencies}>
        {props.children}
      </DependencyContext.Provider>
    );
  }