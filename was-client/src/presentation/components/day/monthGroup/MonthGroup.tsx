import { IonItemDivider, IonLabel } from "@ionic/react";
import { Day } from "../../../../domains/models/Day";
import { Household } from "../../../../domains/models/Household";
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

export default MonthGroup;
