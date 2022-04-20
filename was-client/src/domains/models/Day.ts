import { Commitment } from "./Commitment";

export interface Day {
    commitments: Commitment[],
    date: Date
}