import { AccessToken } from "../models/Token";

export interface IAuthRepository {
    getRefreshToken(username: string, password: string): Promise<AccessToken>; //Logging in
    getAccesToken(): Promise<AccessToken>; //Refreshing token
    deleteRefreshToken(): Promise<void>;
}