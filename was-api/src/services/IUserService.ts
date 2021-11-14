import { CreateUserData, PublicUser } from "../types/User";

export interface IUserService {
    create(userData: CreateUserData): Promise<PublicUser>
    validatePassword(username: string, password: string): Promise<boolean>
    getByName(name: string): Promise<PublicUser | undefined>
    userExists(name: string): Promise<boolean>
}