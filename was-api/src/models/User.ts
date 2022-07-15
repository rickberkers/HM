export type User = {
    id: string,
    name: string,
    firstName: string,
    lastName?: string | null,
    createdAt: Date,
    hash: string,
    refreshToken: string | null,
}

export type PublicUser = Omit<User, "hash" | "refreshToken">;
export type CreateUserData = Omit<User, "id" | "createdAt" | "refreshToken">;