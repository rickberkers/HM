import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonToast, IonList, IonItem, IonLabel, IonText, IonFooter, IonRadioGroup, IonRadio, RadioGroupChangeEventDetail, useIonLoading } from '@ionic/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useUseCases } from '../../../core/contexts/DependencyContext';
import { useAuth } from '../../../core/hooks/useAuth';
import { useSettings } from '../../../core/hooks/useSettings';
import SignOutButton from '../../components/auth/signOutButton/SignOutButton';
import { ErrorText } from '../../components/shared/text/Text';
import Spinner from '../../components/shared/spinner/Spinner';
import './HouseholdView.css';

const HouseholdView = () => {

  const { logout, user } = useAuth();
  const { currentHouseholdId, setCurrentHouseholdId } = useSettings();

  const { getMemberHouseholdsUseCase } = useUseCases().meUseCases;
  const [present] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const {isError, data: households, isLoading} = useQuery('my-households', () => getMemberHouseholdsUseCase.invoke(user!.id))

  const logoutClick = async () => {
    presentLoading();
    await logout().catch(() => {
      present({message: "Logout failed", color: "danger", duration: 2000});
    }).finally(() => {
      dismissLoading();
    });
  }

  const onSelectCurrentHousehold = (event: CustomEvent<RadioGroupChangeEventDetail<string>>) => {
      setCurrentHouseholdId(event.detail.value);
  }

  let content;

  if (isError) content = <ErrorText/>;
  else if (isLoading) content = <Spinner/>;
  else {
    content = (
      <IonList lines='full'>
        <IonRadioGroup value={currentHouseholdId} onIonChange={onSelectCurrentHousehold}>
        {
          households!.map((household) => {
            return (
              <IonItem key={household.id}>
                <IonRadio value={household.id} slot="start" />
                <IonLabel>{household.name}</IonLabel> 
              </IonItem>
            );
          })
        }
        </IonRadioGroup>
      </IonList>
    );
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>Household</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
            </IonButtons>
          </IonToolbar>
          <IonText className='ion-text-center' color="medium">
          <p>Switch household</p>
          </IonText>
      </IonHeader>
      <IonContent>
        {content}
      </IonContent>
      <IonFooter>
        <SignOutButton onClick={logoutClick} />
      </IonFooter>
  </IonPage>
  );
};

export default React.memo(HouseholdView);
