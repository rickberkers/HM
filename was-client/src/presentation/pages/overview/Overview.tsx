import { IonCard, IonCardContent, IonContent, IonPage } from '@ionic/react';
import './Overview.css';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../core/contexts/DependencyContext';
import DayList from '../../components/day/dayList/DayList';
import { TodayCard } from '../../components/day/todayCard/TodayCard';
import React from 'react';
import Spinner from '../../components/shared/spinner/Spinner';
import { ErrorText } from '../../components/shared/errorText/ErrorText';

const Overview = () => {

  const { getDaysUseCase } = useUseCases().dayUseCases;
  const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

  const queryResults = useQueries([
    { queryKey: 'days', queryFn: () => getDaysUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683", new Date(2021,10,5), 50)},
    { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
  ]);

  const isLoading = queryResults.some(query => query.isLoading);
  const isError = queryResults.some(query => query.isError);

  const days = queryResults[0].data!;
  const household = queryResults[1].data!;

  if (isError) {
    return (
      <IonPage><IonContent>
        <ErrorText/>
      </IonContent></IonPage>
    );
  }
  
  return (
    <IonPage><IonContent>
      { !isLoading ?
        <TodayCard household={household} day={days[0]} /> 
          : 
        <IonCard>
          <IonCardContent>
            <Spinner fullHeight={false}/>
          </IonCardContent>
        </IonCard>
      }
      { !isLoading ?
        <DayList days={days} household={household} />
          :
        <Spinner fullHeight={false} text={""} spinner={{color: "dark", name: "dots"}}  />
      }
    </IonContent></IonPage>
  );
};

export default React.memo(Overview);  
