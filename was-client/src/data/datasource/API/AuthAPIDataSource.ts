import IAuthDataSource from "../IAuthDataSource";
import axios from 'axios';
import { config } from "../../../core/config";

const BASE_URL = `${config.REACT_APP_BASE_URL}/me/token`;

export default class AuthAPIDataSource implements IAuthDataSource {
  async refresh(): Promise<string> {
    const response = await axios.post<string>(`${BASE_URL}/refresh`);
    return response.data;
  }
  async login(username: string, password: string): Promise<string> {
    const response = await axios.post<string>(`${BASE_URL}/login`);
    return response.data;
  }
  async logout(): Promise<void> {
    await axios.delete(`${BASE_URL}/logout`);
  }
}
