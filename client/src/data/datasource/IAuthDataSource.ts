import { AccessToken } from "../../domains/models/Token";

export default interface IAuthDataSource {
  refresh(): Promise<AccessToken>;
  login(username: string, password: string): Promise<AccessToken>;
  logout(): Promise<void>;
}