import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './DayView.css';

const DayView = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vandaag</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default DayView;
