export type User = {
    id: string,
    name: string,
    firstName: string,
    lastName?: string,
    createdAt: Date,
    password: string,
    salt: string,
}

export type PublicUser = Omit<User, "password" | "salt">;
export type CreateUserData = Omit<User, "id" | "createdAt">;