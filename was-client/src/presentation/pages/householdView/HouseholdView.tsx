import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import { useAuth } from '../../../core/hooks/useAuth';
import SignOutButton from '../../components/auth/signOutButton/SignOutButton';
import './HouseholdView.css';

const HouseholdView = () => {

  const { logout } = useAuth();

  const logoutClick = async () => {
    await logout();
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>PAREL</IonTitle>
            <IonTitle size='small'>Rick</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <SignOutButton onClick={logoutClick} />
      </IonContent>
  </IonPage>
  );
};

export default HouseholdView;
