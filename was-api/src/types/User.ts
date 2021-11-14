// Types
export type User = {
    id: string,
    name: string,
    firstName: string,
    lastName?: string,
    createdAt: Date,
    password: string,
}

export type PublicUser = Omit<User, "password">;
export type CreateUserData = Omit<User, "id" | "createdAt">;