import { IonContent, IonPage } from '@ionic/react';
import DayList from '../components/dayList/DayList';
import { useAuth } from '../../core/contexts/AuthContext';
import './Overview.css';
import { useUseCases } from '../../core/contexts/DependencyContext';
import { useQueries } from 'react-query';
import { TodayItem } from '../components/TodayItem.tsx/TodayItem';

const Overview = () => {

  const { user } = useAuth();
  const { getDaysUseCase, getHouseholdUseCase } = useUseCases().dayUseCases;
  const queryResults = useQueries([
    { queryKey: 'days', queryFn: () => getDaysUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683", new Date(2021,10,5), 50)},
    { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
  ]);
  //TODO disable refetch on focus
  const isLoading = queryResults.some(query => query.isLoading);
  const days = queryResults[0].data!;
  const household = queryResults[1].data!;

  return (
    <IonPage>
      <IonContent>
        { !isLoading ?
          <TodayItem household={household} day={days[0]} /> : <><p>Loading</p></>
        }
        { !isLoading ?
          <DayList days={days} household={household} /> : <><p>Loading</p></>
        }
      </IonContent>
    </IonPage>
  );
};

export default Overview;  
