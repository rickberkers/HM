import { IonItem, IonAvatar, IonLabel, IonBadge, IonIcon, IonText } from "@ionic/react";
import { personSharp } from "ionicons/icons";
import { getWeekDayName } from "../../helpers/formattingHelpers";
import { Day } from "../../../domains/models/Day";
import DateAvatar from "../dateAvatar/DateAvatar";
import { Household } from "../../../domains/models/Household";
import { useAttendance } from "../../hooks/useAttendance";
import { closeCircleOutline, addCircleOutline } from 'ionicons/icons';
import './DayItem.css';

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
                {
                    <p>
                    {attendance.absentees.map((abstentee) => 
                        <span className="ion-text-left"><IonIcon color="danger" icon={closeCircleOutline} /><IonText color="danger">{abstentee.firstName}</IonText></span>
                    )}
                    {attendance.attendees.map((guest) => 
                        <span className="ion-text-center"><IonIcon color="success" icon={addCircleOutline}  /><IonText color="success">{guest.firstName}</IonText></span>
                    )}
                    </p>
                }
            </IonLabel>
            <IonBadge slot="end" color="light"><IonIcon icon={personSharp} /> {attendance.count()}</IonBadge>
        </IonItem>
    );
}

export default DayItem;