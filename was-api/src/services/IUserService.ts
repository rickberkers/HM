import { CreateUserData, PublicUser } from "@models/User";

export interface IUserService {
    create(userData: CreateUserData): Promise<PublicUser>
    getHashByUserId(id: string): Promise<string>
    getRefreshTokenByUserId(id: string): Promise<string | null>
    setRefreshToken(id: string, refreshToken: string | null): Promise<void>
    getByName(name: string): Promise<PublicUser | undefined>
    getById(id: string): Promise<PublicUser | undefined>
    userExists(name: string): Promise<boolean>
}