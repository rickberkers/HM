import { Day } from "../../domains/models/Day";

export default interface IDateDataSource {
  getDays(): Promise<Day[]>;
}