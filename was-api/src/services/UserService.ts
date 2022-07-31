import { User as UserEntity } from "@entities/User";
import { DataSource, Repository } from "typeorm";
import { CreateUserData, PublicUser } from "@models/User";
import { IUserService } from "./IUserService";

export default class UserService implements IUserService {

    private userRepo: Repository<UserEntity>;

    constructor(private connection: DataSource) {
       this.userRepo = this.connection.getRepository<UserEntity>(UserEntity);
    }

    public async getByLowerCaseName(lowerCaseName: string): Promise<PublicUser | null> {
        return this.userRepo.findOne({where: {lowerCaseName}});
    }

    public async getByName(name: string): Promise<PublicUser | null> {
        return this.userRepo.findOne({where: {name}});
    }

    public async getById(id: string): Promise<PublicUser | null> {
        return this.userRepo.findOne({where: {id}});
    }

    public async userExists(name: string): Promise<boolean> {
        return await this.getByName(name) != undefined;
    }

    public async create(userData: CreateUserData): Promise<PublicUser> {
        const user = this.userRepo.create({
            name: userData.name,
            lowerCaseName: userData.lowerCaseName,
            firstName: userData.firstName,
            hash: userData.hash,
            lastName: userData.lastName,
        });
        
        await this.userRepo.insert(user);
        const createdUser = await this.userRepo.findOne({where: {id: user.id}});
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
            .update(UserEntity)
            .set({ refreshToken })
            .where("id = :id", { id })
            .execute();
    }
}