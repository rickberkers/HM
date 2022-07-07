import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItemDivider, IonLabel, IonPage, IonPopover, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './DayView.css';
import DayContent from '../dayContent/DayContent';
import { useParams } from "react-router-dom";
import { parseISO } from 'date-fns';
import { capitalizeFirstLetter, getMonthName, getWeekDayName } from '../../../helpers/formattingHelpers';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

const DayView = () => {

  const { date: dateString } = useParams<{date:string}>();
  const date = parseISO(dateString);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>
            {capitalizeFirstLetter(getWeekDayName(date))}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton id="popover-trigger">
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}/>
            </IonButton>
            <IonPopover trigger="popover-trigger" triggerAction="click">
              <IonContent class="ion-padding">Hello World!</IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DayContent day={date} />
      </IonContent>
    </IonPage>
  );
};

export default DayView;
