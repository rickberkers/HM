import { IonItem, IonLabel, IonList, IonText, IonToggle } from '@ionic/react';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import { truncateString } from '../../../../core/utils/string';
import Spinner from '../../../components/shared/spinner/Spinner';
import './DayContent.css';
import { ErrorText, NoHouseholdText } from '../../../components/shared/text/Text';
import { useSettings } from '../../../../core/hooks/useSettings';
import { useAuth } from '../../../../core/hooks/useAuth';

type Props = {
  date: Date
}

const DayContent = ({date}: Props) => {

  const { currentHouseholdId } = useSettings();
  const { user } = useAuth();

  const { getDayUseCase } = useUseCases().dayUseCases;
  const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

  const queryOptions = {enabled: currentHouseholdId != null};
  const queryResults = useQueries([
      { queryKey: 'day', queryFn: () => getDayUseCase.invoke(date, currentHouseholdId!), ...queryOptions},
      { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke(currentHouseholdId!), ...queryOptions}
  ]);

  if (!currentHouseholdId) {
    return <NoHouseholdText/>;
  }

  const isLoading = queryResults.some(query => query.isLoading);
  const isError = queryResults.some(query => query.isError);

  const day = queryResults[0].data ?? null;
  const household = queryResults[1].data ?? null;


  if (isError) {
    return <ErrorText/>;
  }

  return (
    isLoading ? <Spinner/> : 
    <>
        {day?.dayInfo?.note && 
          <div className="ion-margin">
            <IonText>{truncateString(day.dayInfo.note, 350)}</IonText>
          </div>
        }
        
        <IonList>
          {household?.members.map((member) => {

            return (
              <IonItem key={member.id}>
                <IonLabel>{member.firstName}</IonLabel>
                {member.id === user?.id && <IonToggle></IonToggle>}
              </IonItem>
            )
          })}
        </IonList>
    </>

  );
};

export default DayContent;
