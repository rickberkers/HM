import { ReactNode, useContext, createContext } from "react"
import config from "../config";
import AuthAPIDataSource from "../../data/datasource/API/AuthAPIDataSource";
import AuthRepository from "../../data/repositories/AuthRepository";
import AuthLoginUseCase from "../../domains/useCases/auth/Login";
import AuthLogoutUseCase from "../../domains/useCases/auth/Logout";
import AuthRefreshUseCase from "../../domains/useCases/auth/Refresh";
import { AxiosWrapper } from "../../data/datasource/API/AxiosWrapper";
import GetDaysUseCase from "../../domains/useCases/day/GetDays";
import DayRepository from "../../data/repositories/DayRepository";
import DayAPIDataSource from "../../data/datasource/API/DayAPIDataSource";
import GetHouseholdUseCase from "../../domains/useCases/household/GetHousehold";
import HouseholdAPIDataSource from "../../data/datasource/API/HouseholdAPIDataSource";
import HouseholdRepository from "../../data/repositories/HouseholdRepository";

/* --- Dependencies --- */
const axiosWrapper = new AxiosWrapper({
  baseURL: config.REACT_APP_API_BASE_URL,
  withCredentials: true
});

const dataSources = {
  authDataSource: new AuthAPIDataSource(axiosWrapper.instance),
  dayDataSource: new DayAPIDataSource(axiosWrapper.instance),
  memberDataSource: new HouseholdAPIDataSource(axiosWrapper.instance),
}

const repositories = {
  authRepository: new AuthRepository(dataSources.authDataSource),
  dayRepository: new DayRepository(dataSources.dayDataSource),
  memberRepository: new HouseholdRepository(dataSources.memberDataSource),
}

const dependencies = {
  useCases: {
    authUseCases: {
      authLoginUseCase: new AuthLoginUseCase(repositories.authRepository),
      authRefreshUseCase: new AuthRefreshUseCase(repositories.authRepository),
      authLogoutUseCase: new AuthLogoutUseCase(repositories.authRepository)
    },
    dayUseCases: {
      getDaysUseCase: new GetDaysUseCase(repositories.dayRepository),
      getHouseholdUseCase: new GetHouseholdUseCase(repositories.memberRepository),
    }
  },
  setNewToken: (token: string) => axiosWrapper.setAuthHeader(token)
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