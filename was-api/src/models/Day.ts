import { Commitment } from "./Commitment";
import { DayInfo } from "./DayInfo";

export type Day = {
    date: string,
    commitments: Commitment[]
    dayInfo?: DayInfo
}