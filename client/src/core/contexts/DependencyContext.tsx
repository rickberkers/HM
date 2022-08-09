import { ReactNode, useContext, createContext } from "react"
import { AxiosWrapper } from "../../data/datasource/API/AxiosWrapper";
import config from "../config";
import AuthAPIDataSource from "../../data/datasource/API/AuthAPIDataSource";
import AuthRepository from "../../data/repositories/AuthRepository";
import AuthLogoutUseCase from "../../domains/useCases/me/auth/Logout";
import AuthRefreshUseCase from "../../domains/useCases/me/auth/Refresh";
import GetDaysUseCase from "../../domains/useCases/day/GetDays";
import DayRepository from "../../data/repositories/DayRepository";
import DayAPIDataSource from "../../data/datasource/API/DayAPIDataSource";
import GetHouseholdUseCase from "../../domains/useCases/household/GetHousehold";
import HouseholdAPIDataSource from "../../data/datasource/API/HouseholdAPIDataSource";
import HouseholdRepository from "../../data/repositories/HouseholdRepository";
import GetDayUseCase from "../../domains/useCases/day/GetDay";
import AuthLoginUseCase from "../../domains/useCases/me/auth/Login";
import MeRepository from "../../data/repositories/MeRepository";
import MeAPIDataSource from "../../data/datasource/API/MeAPIDataSource";
import GetMemberHouseholdsByIdUseCase from "../../domains/useCases/me/households/GetMemberHouseholds";
import CommitmentAPIDataSource from "../../data/datasource/API/CommitmentAPIDataSource";
import CommitmentRepository from "../../data/repositories/CommitmentRepository";
import UpdateCommitmentUseCase from "../../domains/useCases/day/commitment/UpdateCommitment";
import AddCommitmentGuestsUseCase from "../../domains/useCases/day/commitment/AddCommitmentGuests";
import RemoveCommitmentGuestsUseCase from "../../domains/useCases/day/commitment/RemoveCommitmentGuests";
import { getBaseUrl } from "../utils/httpUtils";

/* --- Dependencies --- */
const axiosWrapper = new AxiosWrapper({
  baseURL: getBaseUrl(process.env.NODE_ENV),
  withCredentials: true,
});

const dataSources = {
  authDataSource: new AuthAPIDataSource(axiosWrapper.instance),
  dayDataSource: new DayAPIDataSource(axiosWrapper.instance),
  memberDataSource: new HouseholdAPIDataSource(axiosWrapper.instance),
  meDataSource: new MeAPIDataSource(axiosWrapper.instance),
  commitmentDataSource: new CommitmentAPIDataSource(axiosWrapper.instance)
}

const repositories = {
  authRepository: new AuthRepository(dataSources.authDataSource),
  dayRepository: new DayRepository(dataSources.dayDataSource),
  commitmentRepository: new CommitmentRepository(dataSources.commitmentDataSource),
  memberRepository: new HouseholdRepository(dataSources.memberDataSource),
  meRepository: new MeRepository(dataSources.meDataSource)
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
      getDayUseCase: new GetDayUseCase(repositories.dayRepository),
      commitmentUseCases: {
        updateCommitmentUseCase: new UpdateCommitmentUseCase(repositories.commitmentRepository),
        addCommitmentGuestsUseCase: new AddCommitmentGuestsUseCase(repositories.commitmentRepository),
        removeCommitmentGuestsUseCase: new RemoveCommitmentGuestsUseCase(repositories.commitmentRepository),
      }
    },
    houseHoldUseCases: {
      getHouseholdUseCase: new GetHouseholdUseCase(repositories.memberRepository),
    },
    meUseCases: {
      getMemberHouseholdsUseCase: new GetMemberHouseholdsByIdUseCase(repositories.meRepository)
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