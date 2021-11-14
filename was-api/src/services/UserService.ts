import { User } from "../entities/User";
import { Connection } from "typeorm";
import IUser from "../interfaces/IUser";
import { IUserService } from "./IUserService";

export default class UserService implements IUserService {

    private userRepo;

    constructor(private connection: Connection) {
       this.userRepo = this.connection.getRepository(User);
    }

    public async getByName(name: string) {
        return this.userRepo.findOne({ name });
    }

    public async userExists(name: string) {
        return this.getByName(name) != null;
    }

    public async create(userData: IUser): Promise<IUser> {
        return this.userRepo.create({
            name: userData.name,
            firstName: userData.firstName,
            lastName: userData.lastName,
        });
    }

    public async validatePassword(username: string, password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}