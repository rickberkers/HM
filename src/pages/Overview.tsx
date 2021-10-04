import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, closeOutline } from 'ionicons/icons';
import DayList from '../components/dayList/DayList';
import { useAuth } from '../contexts/AuthContext';
import './Overview.css';

const Tab1 = () => {

  const auth = useAuth();

  return (
    <IonPage>
      <IonContent>
        <IonText>{auth.currentUser?.displayName ?? "No user"}</IonText>
        <IonCard className="action-card">
          <IonCardContent>
            <IonGrid className="ion-no-padding ion-padding-bottom">
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonCol><IonCardTitle>Maandag</IonCardTitle></IonCol>
                <IonCol><IonCardSubtitle className="ion-text-right">27 september</IonCardSubtitle></IonCol>
              </IonRow>
            </IonGrid>
            <p>Vandaag eten <strong>5 personen</strong> mee</p>
            <IonChip color="success">
              <IonIcon icon={addOutline} color="success" />
              <IonLabel>Frits</IonLabel>
            </IonChip>
            <IonChip color="success">
              <IonIcon icon={addOutline} color="success" />
              <IonLabel>Piet</IonLabel>
            </IonChip>
            <IonChip color="medium">
              <IonLabel>Karel</IonLabel>
            </IonChip>
            <IonChip color="medium">
              <IonLabel>Joost</IonLabel>
            </IonChip>
            <IonChip color="medium">
              <IonLabel>Anne</IonLabel>
            </IonChip>
            <IonChip color="danger">
              <IonIcon icon={closeOutline} color="danger" />
              <IonLabel>Astrid</IonLabel>
            </IonChip>
            <IonButton routerLink="/sign-in" expand="block" className="ion-margin-top">sign</IonButton>
            <IonButton routerLink="/day" expand="block" className="ion-margin-top">day</IonButton>
          </IonCardContent>
        </IonCard>
        <DayList days={3} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;  
