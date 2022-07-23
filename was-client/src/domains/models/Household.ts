import { User } from "./User"

export type Household = {
    id: string,
    name: string,
    createdAt: Date,
    members: User[]
}

export type MemberHousehold = Omit<Household, 'members'>;