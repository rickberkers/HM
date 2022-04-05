import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonText } from '@ionic/react';
import { addOutline, closeOutline } from 'ionicons/icons';
import DayList from '../components/dayList/DayList';
import { useAuth } from '../../core/contexts/AuthContext';
import { nounShouldBePlural } from '../helpers/formattingHelpers';
import { Day } from '../../domains/models/Day';
import './Overview.css';

const Overview = () => {

  const {currentUser} = useAuth();

  const dummyData: Day[] = [
    {
      date: new Date(2021, 10, 6),
      members: [{}, {}, {}]
    } as Day,
    {
      date: new Date(2021, 10, 7),
      members: [{}, {}, {}, {}]
    } as Day,
    {
      date: new Date(2021, 10, 8),
      members: [{}, {}]
    } as Day
  ];
  const days = dummyData;

  return (
    <IonPage>
      <IonContent>
        <IonCard className="action-card">
          <IonCardContent>
            <IonGrid className="ion-no-padding ion-padding-bottom">
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonCol><IonCardTitle>Maandag</IonCardTitle></IonCol>
                <IonCol><IonCardSubtitle className="ion-text-right">27 september</IonCardSubtitle></IonCol>
              </IonRow>
            </IonGrid>
            <IonText>
              <span>Hoi <strong>{currentUser?.name}! </strong></span>
              { 
                nounShouldBePlural(1) ?
                <span>Vandaag eten er <strong>{0} personen</strong> mee</span>
                :
                <span>Vandaag eet er <strong>{0} persoon</strong> mee</span>
              }
            </IonText>
            <IonRow className="ion-margin-bottom" />
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
        <DayList days={days} />
      </IonContent>
    </IonPage>
  );
};

export default Overview;  
