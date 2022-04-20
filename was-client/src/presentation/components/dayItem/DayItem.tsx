import { IonItem, IonAvatar, IonLabel, IonBadge, IonIcon } from "@ionic/react";
import { personSharp } from "ionicons/icons";
import { getWeekDayName } from "../../helpers/formattingHelpers";
import { Day } from "../../../domains/models/Day";
import DateAvatar from "../dateAvatar/DateAvatar";
import { Household } from "../../../domains/models/Household";
import { useAttendance } from "../../hooks/useAttendance";

interface DayItemProps {
    day: Day,
    household: Household
}

const DayItem = ({day, household}: DayItemProps) => {

    const attendance = useAttendance(day, household.members);
    
    return (
        <IonItem>
            <IonAvatar slot="start">
                <DateAvatar number={day.date.getDate()} />
            </IonAvatar>
            <IonLabel>
                <h3>{getWeekDayName(day.date)}</h3>
                { <p>+ Frits + Anne - Jos</p> }
            </IonLabel>
            <IonBadge slot="end" color="light"><IonIcon icon={personSharp} /> {attendance.attendanceCount()}</IonBadge>
        </IonItem>
    );
}

export default DayItem;