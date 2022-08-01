import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import DayContent from '../dayContent/DayContent';
import './TodayView.css';

const TodayView = () => {

  const day = new Date();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Today</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DayContent date={day} />
      </IonContent>
    </IonPage>
  );
};

export default React.memo(TodayView);
