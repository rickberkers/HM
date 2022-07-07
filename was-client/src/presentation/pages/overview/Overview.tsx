import { IonContent, IonPage } from '@ionic/react';
import './Overview.css';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../core/contexts/DependencyContext';
import DayList from '../../components/day/dayList/DayList';
import { TodayCard } from '../../components/day/todayCard/TodayCard';

const Overview = () => {

  const { getDaysUseCase } = useUseCases().dayUseCases;
  const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

  const queryResults = useQueries([
    { queryKey: 'days', queryFn: () => getDaysUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683", new Date(2021,10,5), 50)},
    { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
  ]);
  //TODO disable refetch on focus
  const isLoading = queryResults.some(query => query.isLoading);
  const allDays = queryResults[0].data!;
  const household = queryResults[1].data!;

  return (
    <IonPage>
      <IonContent>
        { !isLoading ?
          <TodayCard household={household} day={allDays[0]} /> : <><p>Loading</p></>
        }
        { !isLoading ?
          <DayList days={allDays} household={household} /> : <><p>Loading</p></>
        }
      </IonContent>
    </IonPage>
  );
};

export default Overview;  
