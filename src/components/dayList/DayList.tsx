import { IonAvatar, IonBadge, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';
import { personSharp } from 'ionicons/icons';
import DateAvatar from '../dateAvatar/DateAvatar';

interface DayListProps {
    days: number;
}

const DayList = ({days}: DayListProps) => {
    return (<>
        <IonItemGroup>
            <IonItemDivider>
                <IonLabel>September</IonLabel>
            </IonItemDivider>
            <IonItem>
                <IonAvatar slot="start">
                    <DateAvatar number={28} />
                </IonAvatar>
                <IonLabel>
                    <h3>Dinsdag</h3>
                    <p>Anne, Joost afwezig, Frits gast</p>
                </IonLabel>
                <IonBadge slot="end" color="light"><IonIcon icon={personSharp} /> 5</IonBadge>
            </IonItem>
            <IonItem>
                <IonAvatar slot="start">
                    <DateAvatar number={29} />
                </IonAvatar>
                <IonLabel>
                    <h3>Woensdag</h3>
                </IonLabel>

                <IonBadge slot="end" color="light"><IonIcon icon={personSharp} /> 3</IonBadge>
            </IonItem>
            <IonItem>
                <IonAvatar slot="start">
                    <DateAvatar number={1} />
                </IonAvatar>
                <IonLabel>
                    <h3>Donderdag</h3>
                </IonLabel>
                <IonBadge slot="end" color="light"><IonIcon icon={personSharp} /> 3</IonBadge>
            </IonItem>
        </IonItemGroup><IonItemGroup>
            <IonItemDivider>
                <IonLabel>Oktober</IonLabel>
            </IonItemDivider>
        </IonItemGroup>
    </>);
};

export default DayList;
