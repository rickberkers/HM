import { IonCard, IonCardContent, IonContent, IonPage } from '@ionic/react';
import './Overview.css';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../core/contexts/DependencyContext';
import DayList from '../../components/day/dayList/DayList';
import TodayCard from '../../components/day/todayCard/TodayCard';
import React from 'react';
import Spinner from '../../components/shared/spinner/Spinner';
import { ErrorText, NoHouseholdText } from '../../components/shared/text/Text';
import { useSettings } from '../../../core/hooks/useSettings';

const Overview = () => {

  const { getDaysUseCase } = useUseCases().dayUseCases;
  const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

  const { currentHouseholdId } = useSettings();
  
  const sharedQueryOptions = {
    enabled: currentHouseholdId != null
  };

  const queryResults = useQueries([
    // Cachetime 0 because re-renders anyway due to dates being parsed in the transformation function at datasource implementation
    { queryKey: 'days', queryFn: () => getDaysUseCase.invoke(currentHouseholdId!, new Date(), 30), ...sharedQueryOptions, cacheTime: 0},   
    { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke(currentHouseholdId!), ...sharedQueryOptions},
  ]);

  const isLoading = queryResults.some(query => query.isLoading);
  const isError = queryResults.some(query => query.isError);
  const isIdle = queryResults.some(query => query.isIdle);

  const days = queryResults[0].data!;
  const household = queryResults[1].data!;

  let content;

  if (isIdle) content = <NoHouseholdText/>
  else if (isError) content = <ErrorText/>
  else if (isLoading) {
    content = (<>
        <IonCard>
          <IonCardContent>
            <Spinner fullHeight={false}/>
          </IonCardContent>
        </IonCard>
        <Spinner fullHeight={false} text={""} spinner={{color: "dark", name: "dots"}}  />
    </>)
  }
  else if (!isLoading) {
    content = (<>
      <TodayCard household={household} day={days[0]} /> 
      <DayList days={days} household={household} />
    </>)
  }

  return (
    <IonPage>
      <IonContent>
        {content}
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Overview);  
