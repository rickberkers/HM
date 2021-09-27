import { IonAvatar, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, closeCircle, closeOutline, heart, heartSharp, personSharp, share, shareSharp } from 'ionicons/icons';
import DateAvatar from '../components/DateAvatar';
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
              <DateAvatar number={1 } />
            </IonAvatar>
            <IonLabel>
              <h3>Donderdag</h3>
            </IonLabel>
            <IonBadge slot="end" color="light"><IonIcon icon={personSharp} /> 3</IonBadge>
          </IonItem>
        </IonItemGroup>

        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Oktober</IonLabel>
          </IonItemDivider>

        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
