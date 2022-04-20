import { User } from "./User"

export type Household = {
    id: string,
    name: string,
    createdAt: Date,
    members: User[]
}