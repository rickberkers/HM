import { IonItem, IonLabel, IonList, IonText, IonToggle } from '@ionic/react';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import { truncateString } from '../../../../core/utils/string';
import { useAuth } from '../../../../core/hooks/useAuth';
import Spinner from '../../../components/shared/spinner/Spinner';
import './DayContent.css';
import { ErrorText } from '../../../components/shared/errorText/ErrorText';

type Props = {
  date: Date
}

const DayContent = ({date}: Props) => {

    const { user } = useAuth();

    const { getDayUseCase } = useUseCases().dayUseCases;
    const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

    const queryResults = useQueries([
        { queryKey: 'day', queryFn: () => getDayUseCase.invoke(date, "d3b6d118-05af-4eaf-8631-0500fe54c683")},
        { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
    ]);

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
