import { IonItemDivider, IonItemGroup, IonLabel } from "@ionic/react";
import { Day } from "../../../../domains/models/Day";
import { Household } from "../../../../domains/models/Household";
import { getWeekNumber } from "../../../utils/dateUtils";
import DayItem from "../dayItem/DayItem";
import "./MonthGroup.css";

type MonthProps = {
    days: Day[],
    monthName: string,
    household: Household
}

const MonthGroup = ({days, monthName, household}: MonthProps) => {

    const monthDivider = (
        <IonItemDivider sticky key={monthName}>
            <IonLabel>{monthName}</IonLabel>
        </IonItemDivider>
    );

    let weeksWithDays = days.map((day: Day) =>
        [
            day.date.getDay() === 1 && <div key={`div${day.date.getTime()}`} className="spacer"></div>,
            <DayItem day={day} household={household} key={day.date.getTime()}/>
        ]
    );
    return (
        <>
            {monthDivider}
            {weeksWithDays}
        </>
    );
};


// const groupDaysByWeek = (days: Day[]) => {
//     return days.reduce((acc : Map<number, Day[]>, day) => {
//         const week = getWeekNumber(day.date);
//         acc.set(week, acc.get(week) || []);
//         acc.get(week)!.push(day);
//         return acc;
//     }, new Map());
// }

export default MonthGroup;
