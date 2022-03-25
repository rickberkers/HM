import IAuthDataSource from "../IAuthDataSource";
import { Axios } from 'axios';
import { config } from "../../../core/config";

const BASE_URL = `${config.REACT_APP_BASE_URL}/me/token`;

export default class AuthAPIDataSource implements IAuthDataSource {

  constructor(
    private axios: Axios
  ) {}

  async refresh(): Promise<string> {
    const response = await this.axios.post<string>(`${BASE_URL}/refresh`);
    return response.data;
  }
  async login(username: string, password: string): Promise<string> {
    const response = await this.axios.post<string>(`${BASE_URL}/login`);
    return response.data;
  }
  async logout(): Promise<void> {
    await this.axios.delete(`${BASE_URL}/logout`);
  }
}
