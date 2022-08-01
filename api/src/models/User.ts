export type PublicUser = {
    id: string,
    name: string,
    firstName: string,
    lastName?: string | null,
    createdAt: Date,
}

export type User = PublicUser & {
    lowerCaseName: string,
    hash: string,
    refreshToken: string | null,
};


export type CreateUserData = Omit<User, "id" | "createdAt" | "refreshToken">;