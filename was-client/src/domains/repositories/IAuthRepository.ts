import { UserToken } from "../models/Token";

export interface IAuthRepository {
    getRefreshToken(username: string, password: string): Promise<UserToken>; //Logging in
    getAccesToken(): Promise<UserToken>; //Refreshing token
    deleteRefreshToken(): Promise<void>;
}