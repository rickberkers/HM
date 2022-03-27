import IAuthDataSource from "../IAuthDataSource";
import { Axios } from 'axios';

const BASE_URL = `/me/token`;

export default class AuthAPIDataSource implements IAuthDataSource {

  constructor(
    private axios: Axios
  ) {}

  async refresh(): Promise<AuthTokenAPIResponse> {
    const response = await this.axios.post<AuthTokenAPIResponse>(`${BASE_URL}/refresh`);
    return response.data;
  }
  async login(username: string, password: string): Promise<AuthTokenAPIResponse> {
    const response = await this.axios.post<AuthTokenAPIResponse>(`${BASE_URL}/login`, {
      username, password
    });
    return response.data;
  }
  async logout(): Promise<void> {
    await this.axios.delete(`${BASE_URL}/logout`);
  }
}

export interface AuthTokenAPIResponse {
  id: string,
  name: string
}