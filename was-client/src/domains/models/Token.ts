import { User } from "./User"

export type AccessToken = { 
    token: string, 
    payload: {
        id: string,
        name: string,
        iat: number,
    }
}