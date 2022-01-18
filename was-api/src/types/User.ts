export type User = {
    id: string,
    name: string,
    firstName: string,
    lastName?: string,
    createdAt: Date,
    hash: string,
}

export type PublicUser = Omit<User, "hash">;
export type CreateUserData = Omit<User, "id" | "createdAt">;