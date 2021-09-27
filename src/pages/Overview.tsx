import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, closeOutline } from 'ionicons/icons';
import DayList from '../components/DayList';
import './Overview.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Overzicht</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonCard className="action-card">
          <IonCardHeader>
            <IonCardSubtitle>27 september</IonCardSubtitle>
            <IonCardTitle>Maandag</IonCardTitle> 
          </IonCardHeader>
          <IonCardContent>
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
            <IonButton expand="block" className="ion-margin-top">Details</IonButton>
          </IonCardContent>
        </IonCard>
        {/* <DayList/> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
