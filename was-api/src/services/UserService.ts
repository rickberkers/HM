import { User } from "@entities/User";
import { Connection, Repository } from "typeorm";
import { CreateUserData, PublicUser } from "@models/User";
import { IUserService } from "./IUserService";

export default class UserService implements IUserService {

    private userRepo: Repository<User>;

    constructor(private connection: Connection) {
       this.userRepo = this.connection.getRepository<User>(User);
    }

    public async getByName(name: string): Promise<PublicUser | undefined> {
        return this.userRepo.findOne({ name });
    }

    public async getById(id: string): Promise<PublicUser | undefined> {
        return this.userRepo.findOne({ id });
    }

    public async userExists(name: string): Promise<boolean> {
        return await this.getByName(name) != undefined;
    }

    public async create(userData: CreateUserData): Promise<PublicUser> {
        const user = this.userRepo.create({
            name: userData.name,
            firstName: userData.firstName,
            hash: userData.hash,
            lastName: userData.lastName,
        });
        
        await this.userRepo.insert(user);
        const createdUser = await this.userRepo.findOne(user.id);
        return createdUser!;
    }

    public async getHashByUserId(id: string): Promise<string> {
        const user = await this.userRepo
            .createQueryBuilder("user")
            .select(["user.hash"])
            .where("user.id = :id", { id })
            .getOne();
        return user!.hash;
    }

    public async getRefreshTokenByUserId(id: string): Promise<string | null> {
        const user = await this.userRepo
            .createQueryBuilder("user")
            .select(["user.id", "user.refreshToken"])
            .where("user.id = :id", { id })
            .getOne();
        return user!.refreshToken;
    }

    public async setRefreshToken(id: string, refreshToken: string | null): Promise<void> {
        await this.userRepo
            .createQueryBuilder("user")
            .update(User)
            .set({ refreshToken })
            .where("id = :id", { id })
            .execute();
    }
}