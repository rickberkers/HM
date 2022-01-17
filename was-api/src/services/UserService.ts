import { User } from "../entities/User";
import { Connection } from "typeorm";
import { CreateUserData, PublicUser } from "../types/User";
import { IUserService } from "./IUserService";

export default class UserService implements IUserService {

    private userRepo;

    constructor(private connection: Connection) {
       this.userRepo = this.connection.getRepository(User);
    }

    public async getByName(name: string): Promise<PublicUser | undefined> {
        return this.userRepo.findOne({ name });
    }

    public async userExists(name: string): Promise<boolean> {
        return await this.getByName(name) != undefined;
    }

    public async create(userData: CreateUserData): Promise<PublicUser> {
        //TODO figure out secure way to handle password, logging in etc.
        return this.userRepo.create({
            name: userData.name,
            firstName: userData.firstName,
            password: userData.password,
            lastName: userData.lastName,
        });
    }

    public async validatePassword(name: string, password: string): Promise<boolean> {
        return await this.userRepo.findOne({name, password}) != undefined
    }
}