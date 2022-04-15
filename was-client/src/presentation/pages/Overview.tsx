import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonText } from '@ionic/react';
import { addOutline, closeOutline } from 'ionicons/icons';
import DayList from '../components/dayList/DayList';
import { useAuth } from '../../core/contexts/AuthContext';
import { nounShouldBePlural } from '../helpers/formattingHelpers';
import './Overview.css';
import { useUseCases } from '../../core/contexts/DependencyContext';
import { useQuery } from 'react-query';

const Overview = () => {

  const { user } = useAuth();
  const { getDaysUseCase } = useUseCases().dayUseCases;
  const { data, isLoading } = useQuery('days', () => getDaysUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683", new Date(2021,10,5), 50));

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
              <span>Hoi <strong>{user?.name}! </strong></span>
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
        { !isLoading ? <DayList days={data!} /> : <><p>Loading</p></>}
      </IonContent>
    </IonPage>
  );
};

export default Overview;  
