import IUser from "../interfaces/IUser";

export interface IUserService {
    create(userData: IUser): Promise<IUser>
    validatePassword(username: string, password: string): Promise<boolean>
    getByName(name: string): Promise<IUser | undefined>
    userExists(name: string): Promise<boolean>
}