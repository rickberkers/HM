import { AccessToken } from "../models/Token";

export interface IAuthRepository {
    getToken(username: string, password: string): Promise<AccessToken>; //Logging in
    refreshToken(): Promise<AccessToken>; //Refreshing token
    deleteRefreshToken(): Promise<void>;
}