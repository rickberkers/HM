import IAuthDataSource from "../IAuthDataSource";
import { Axios } from 'axios';
import { parseJWT } from "../../../core/helpers/JWTParser";
import { AccessToken } from "../../../domains/models/Token";

const BASE_URL = `/me/token`;

export default class AuthAPIDataSource implements IAuthDataSource {

  constructor(
    private axios: Axios
  ) {}

  async refresh(): Promise<AccessToken> {
    const response = await this.axios.post<AccessToken>(`${BASE_URL}/refresh`, undefined, { 
      transformResponse: this.authResponseFormatter
    });
    return response.data;
  }

  async login(username: string, password: string): Promise<AccessToken> {
    const response = await this.axios.post<AccessToken>(`${BASE_URL}/login`, {
      name: username, password
    }, { transformResponse: this.authResponseFormatter});
    return response.data;
  }
  
  async logout() {
    await this.axios.delete(`${BASE_URL}/logout`);
  }

  private authResponseFormatter(data: any) {
    const decodedPayload = parseJWT<AccessToken["payload"]>(data);
    return {
      token: data,
      payload: decodedPayload
    };
  }
}