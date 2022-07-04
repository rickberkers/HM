export interface User {
    id: string,
    name: string,
    firstName: string,
    lastName: string
}

export type SignInUser = {
    username: string,
    password: string
}