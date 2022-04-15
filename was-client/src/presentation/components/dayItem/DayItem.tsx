import { IonItem, IonAvatar, IonLabel, IonBadge, IonIcon } from "@ionic/react";
import { personSharp } from "ionicons/icons";
import { getWeekDayName } from "../../helpers/formattingHelpers";
import { Day } from "../../../domains/models/Day";
import DateAvatar from "../dateAvatar/DateAvatar";

interface DayItemProps {
    day: Day
}

const DayItem = (props: DayItemProps) => {
    return (
        <IonItem>
            <IonAvatar slot="start">
                <DateAvatar number={props.day.date.getDate()} />
            </IonAvatar>
            <IonLabel>
                <h3>{getWeekDayName(props.day.date)}</h3>
                {/* <p>Anne, Joost afwezig, Frits gast</p> */}
            </IonLabel>
            <IonBadge slot="end" color="light"><IonIcon icon={personSharp} /> {/*props.day.members.length*/0}</IonBadge>
        </IonItem>
    );
}

export default DayItem;