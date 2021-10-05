import { IonAvatar, IonBadge, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';
import { personSharp } from 'ionicons/icons';
import { Day } from '../../models/Day';
import DateAvatar from '../dateAvatar/DateAvatar';
import DayItem from '../dayItem/DayItem';

interface DayListProps {
    days: Day[];
}

const DayList = ({days}: DayListProps) => {

    const dayItems = days.map((day) => <DayItem day={day} key={day.date.getUTCDate()}/>);

    return (<>
        <IonItemGroup>
            <IonItemDivider>
                <IonLabel>September</IonLabel>
            </IonItemDivider>
            {dayItems}
        </IonItemGroup>
        <IonItemGroup>
            <IonItemDivider>
                <IonLabel>Oktober</IonLabel>
            </IonItemDivider>
        </IonItemGroup>
    </>);
};

export default DayList;
