import { Commitment } from "./Commitment";
import { User } from "./User";

export interface Day {
    commitments: Commitment[],
    date: Date
    members: User[]
}