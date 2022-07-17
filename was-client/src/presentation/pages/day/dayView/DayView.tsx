import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import './DayView.css';
import DayContent from '../dayContent/DayContent';
import { useParams } from "react-router-dom";
import { parseISO } from 'date-fns';
import { capitalizeFirstLetter, getWeekDayName } from '../../../helpers/formattingHelpers';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import React from 'react';

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
        <DayContent date={date} />
      </IonContent>
    </IonPage>
  );
};

export default React.memo(DayView);
