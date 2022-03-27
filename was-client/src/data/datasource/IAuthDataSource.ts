import { UserToken } from "../../domains/models/Token";

export default interface IAuthDataSource {
  refresh(): Promise<UserToken>;
  login(username: string, password: string): Promise<UserToken>;
  logout(): Promise<void>;
}