export type User = {
    id: string,
    name: string,
    firstName: string,
    lastName?: string,
    createdAt: Date,
    hash: string,
    refreshToken?: string,
}

export type PublicUser = Omit<User, "hash" | "refreshToken">;
export type CreateUserData = Omit<User, "id" | "createdAt">;