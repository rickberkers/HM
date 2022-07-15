import { Commitment } from "./Commitment";
import { DayInfo } from "./DayInfo";

export interface Day {
    commitments: Commitment[],
    dayInfo?: DayInfo,
    date: Date
}