import { CreateUserData, PublicUser } from "../types/User";

export interface IUserService {
    create(userData: CreateUserData): Promise<PublicUser>
    getHashByUserId(id: string): Promise<string>
    getByName(name: string): Promise<PublicUser | undefined>
    userExists(name: string): Promise<boolean>
}