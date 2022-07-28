import { IonFab, IonFabButton, IonIcon, IonItemDivider, IonLabel, IonText, useIonLoading, useIonModal, useIonToast } from '@ionic/react';
import { useMutation, useQueries } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import { truncateString } from '../../../../core/utils/stringUtils';
import Spinner from '../../../components/shared/spinner/Spinner';
import './DayContent.css';
import { ErrorText, NoHouseholdText } from '../../../components/shared/text/Text';
import { useSettings } from '../../../../core/hooks/useSettings';
import { MemberList } from '../../../components/day/attendanceList/AttendanceList';
import { personAdd } from 'ionicons/icons';
import AddGuestModal, { GUEST_MODAL_ACTION } from '../../../components/day/addGuestModal/addGuestModal';
import { OverlayEventDetail } from '@ionic/core';
import { Commitment } from '../../../../domains/models/Commitment';
import { useAttendance } from '../../../hooks/useAttendance';
import { GuestList } from '../../../components/day/guestList/GuestList';

type Props = {
  date: Date
}

const DayContent = ({date}: Props) => {

  const { currentHouseholdId } = useSettings();
  const { getDayUseCase } = useUseCases().dayUseCases;
  const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;
  const { updateCommitmentUseCase, addCommitmentGuestsUseCase, removeCommitmentGuestsUseCase } = useUseCases().dayUseCases.commitmentUseCases;
  const [ presentMutationLoading, dismissMutationLoading ] = useIonLoading();
  const [ presentToast ] = useIonToast();
  const presentMutationError = (message: string) => {presentToast({message, color: "danger", duration: 2500});}

  // Load Data
  const sharedQueryOptions = {enabled: currentHouseholdId != null};
  const queryResults = useQueries([
      // Cachetime 0 because re-renders anyway due to dates being parsed in the transformation function at datasource implementation
      { queryKey: 'day', queryFn: () => getDayUseCase.invoke(date, currentHouseholdId!), ...sharedQueryOptions, cacheTime: 0},
      { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke(currentHouseholdId!), ...sharedQueryOptions}
  ]);

  const isLoading = queryResults.some(query => query.isLoading);
  const isError = queryResults.some(query => query.isError);
  const [dayResult, householdResult] = queryResults;
  const attendance = useAttendance(dayResult.data?.commitments!, householdResult.data?.members!);

  // Add commitment guests mutation
  const addGuestsMutation = useMutation((newGuests: string[]) => { 
    return addCommitmentGuestsUseCase.invoke(date, currentHouseholdId!, newGuests); 
  });
  const addGuests = async (guests: string[]) => {
    presentMutationLoading();
    addGuestsMutation.mutateAsync(guests).catch(_ => {
      presentMutationError("Guest(s) could not be added");
    }).then(() => {
      dayResult.refetch();
    }).finally(() => {
      dismissMutationLoading();
    });
  }

  // Remove commitment guests mutation
  const removeGuestsMutation = useMutation((newGuests: string[]) => { 
    return removeCommitmentGuestsUseCase.invoke(date, currentHouseholdId!, newGuests);
  });
  const removeGuests = async (guests: string[]) => {
    presentMutationLoading();
    await removeGuestsMutation.mutateAsync(guests).catch(_ => {
      presentMutationError("Guest(s) could not be removed");
    }).then(() => {
      dayResult.refetch();
    }).finally(() => {
      dismissMutationLoading();
    });
  }

  //TODO find way to do local changes so no re-fetch every time
  // Update mutation
  const updateCommitmentMutation = useMutation((committed: boolean) => {
    return updateCommitmentUseCase.invoke(date, currentHouseholdId!, committed); 
  });
  const updateCommitment = async (committed: boolean) => {
    presentMutationLoading();
    updateCommitmentMutation.mutateAsync(committed).catch(_ => {
      presentMutationError("Attendance could not be updated");
    }).then(() => {
      dayResult.refetch();
    }).finally(() => {
      dismissMutationLoading();
    })
  }

  // Add guests modal
  const allGuests = dayResult.data?.commitments.reduce((acc: string[], commitment: Commitment) => {
    return acc.concat(commitment.guests ?? []);
  }, []);

  const [presentAddModal, dismissAddModal] = useIonModal(AddGuestModal, {
    onDismiss: (data: string[], role: GUEST_MODAL_ACTION) => dismissAddModal(data, role),
    existingGuests: allGuests ?? [],
  });

  const openModal = () => {
    presentAddModal({
      onWillDismiss: (dismissEvent: CustomEvent<OverlayEventDetail<string[]>>) => {
        const {role, data} = dismissEvent.detail;
        if (role === 'confirm' && data && data.length > 0) {
          addGuests(data);
        }
      },
    });
  }

  // Rendering
  if (!currentHouseholdId) return <NoHouseholdText/>;
  if (isError) return <ErrorText/>;

  return (
    isLoading ? <Spinner/> : 
    <>
        {/* Display note of day  */}
        {  dayResult.data?.dayInfo?.note && 
          <div className="ion-margin">
            <IonText>{truncateString(dayResult.data.dayInfo.note, 350)}</IonText>
          </div>
        }
        
        {/* Display attendance */}
        <IonItemDivider>
          <IonLabel>Members</IonLabel>
        </IonItemDivider>
        <MemberList attendance={attendance} onCommitmentChanged={committed => updateCommitment(committed)} />
        <IonItemDivider>
          <IonLabel>Guests</IonLabel>
        </IonItemDivider>
        <GuestList guests={attendance.guests} onRemove={(guest) => { removeGuests([guest])} } />

        {/* Display FAB for adding guest  */}
        <IonFab class={"fab-position"} vertical="bottom" horizontal="end" edge slot="fixed">
          <IonFabButton onClick={openModal} color="success">
            <IonIcon icon={personAdd} />
          </IonFabButton>
        </IonFab>
    </>

  );
};

export default DayContent;
