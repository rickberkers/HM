import ICommitment from "./ICommitment";
import IDayInfo from "./IDayInfo";

export default interface IDay {
    date: string,
    commitments: ICommitment[]
    dayInfo?: IDayInfo
}