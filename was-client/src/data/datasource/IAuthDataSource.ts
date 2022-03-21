export default interface IAuthDataSource {
  refresh(): Promise<string>;
  login(username: string, password: string): Promise<string>;
  logout(): Promise<void>;
}