import { IonItem, IonAvatar, IonLabel, IonBadge, IonIcon, IonText } from "@ionic/react";
import { personSharp } from "ionicons/icons";
import { Day } from "../../../../domains/models/Day";
import DateAvatar from "../dateAvatar/DateAvatar";
import { Household } from "../../../../domains/models/Household";
import { useAttendance } from "../../../hooks/useAttendance";
import { closeCircleOutline, addCircleOutline } from 'ionicons/icons';
import './DayItem.css';
import { ROUTE_NAMES } from "../../../../core/Routes";
import { formatISO } from "date-fns";
import { getWeekDayName } from "../../../utils/dateUtils";
import { capitalizeFirstLetter } from "../../../utils/formattingUtils";

interface DayItemProps {
    day: Day,
    household: Household
}

const DayItem = ({day, household}: DayItemProps) => {

    const attendance = useAttendance(day, household.members);

    return (
        <IonItem lines="full" routerLink={`${ROUTE_NAMES.DAY}/${formatISO(day.date, { representation: 'date' })}`}>
            <IonAvatar slot="start">
                <DateAvatar number={day.date.getDate()} />
            </IonAvatar>
            <IonLabel>
                <h2><IonText color="medium">{capitalizeFirstLetter(getWeekDayName(day.date))}</IonText></h2>
                {
                    attendance.absentees.map((absentee) => 
                        <span key={absentee.id} className="deviation icon-size">
                            <IonIcon color="danger" icon={closeCircleOutline} className="icon"/>
                            <IonText color="danger">{absentee.firstName}</IonText>
                        </span>
                    )
                }
                {
                    attendance.guests.map((guest) =>
                        <span key={guest} className="deviation icon-size">
                            <IonIcon color="success" icon={addCircleOutline} className="icon" />
                            <IonText color="success">{guest}</IonText>
                        </span>
                    )
                }
            </IonLabel>
            <IonBadge slot="end" color="light"><IonIcon color="medium" icon={personSharp} /> {attendance.count()}</IonBadge>
        </IonItem>
    );
}

export default DayItem;