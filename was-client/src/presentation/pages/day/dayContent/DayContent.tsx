import { IonFab, IonFabButton, IonIcon, IonText, useIonModal } from '@ionic/react';
import { useMutation, useQueries } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import { truncateString } from '../../../../core/utils/stringUtils';
import Spinner from '../../../components/shared/spinner/Spinner';
import './DayContent.css';
import { ErrorText, NoHouseholdText } from '../../../components/shared/text/Text';
import { useSettings } from '../../../../core/hooks/useSettings';
import { AttendanceList } from '../../../components/day/attendanceList/AttendanceList';
import { personAdd } from 'ionicons/icons';
import AddGuestModal, { GUEST_MODAL_ACTION } from '../../../components/day/addGuestModal/addGuestModal';
import { OverlayEventDetail } from '@ionic/core';
import { Commitment } from '../../../../domains/models/Commitment';
import { useAuth } from '../../../../core/hooks/useAuth';

type Props = {
  date: Date
}

const DayContent = ({date}: Props) => {

  const { currentHouseholdId } = useSettings();
  const { user } = useAuth();
  const { getDayUseCase } = useUseCases().dayUseCases;
  const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;
  const { updateCommitmentUseCase, addCommitmentGuestsUseCase, removeCommitmentGuestsUseCase } = useUseCases().dayUseCases.commitmentUseCases;

  // Data loading

  const sharedQueryOptions = {enabled: currentHouseholdId != null};
  const queryResults = useQueries([
      // Cachetime 0 because re-renders anyway due to dates being parsed in the transformation function at datasource implementation
      { queryKey: 'day', queryFn: () => getDayUseCase.invoke(date, currentHouseholdId!), ...sharedQueryOptions, cacheTime: 0},
      { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke(currentHouseholdId!), ...sharedQueryOptions}
  ]);

  const isLoading = queryResults.some(query => query.isLoading);
  const isError = queryResults.some(query => query.isError);
  const day = queryResults[0].data ?? null;
  const household = queryResults[1].data ?? null;

  // Data mutation
  const {mutate} = useMutation((newGuests: string[]) => {
    return 
  });

  // Modal
  const allGuests = day?.commitments.reduce((acc: string[], commitment: Commitment) => {
    return acc.concat(commitment.guests ?? []);
  }, []);

  const [present, dismiss] = useIonModal(AddGuestModal, {
    onDismiss: (data: string, role: GUEST_MODAL_ACTION) => dismiss(data, role),
    existingGuests: allGuests ?? [],
    member: user?.name ?? ""
  });

  const openModal = () => {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail<string | null>>) => {
        if (ev.detail.role === 'confirm') {
          
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
        {  day?.dayInfo?.note && 
          <div className="ion-margin">
            <IonText>{truncateString(day.dayInfo.note, 350)}</IonText>
          </div>
        }
        
        {/* Display attendance list  */}
        <AttendanceList day={day!} household={household!} ></AttendanceList>

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
