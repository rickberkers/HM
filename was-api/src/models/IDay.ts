import ICommitment from "./ICommitment";
import IDayInfo from "./IDayInfo";

export default interface IDay {
    date: Date,
    commitments: ICommitment[]
    dayInfo?: IDayInfo
}