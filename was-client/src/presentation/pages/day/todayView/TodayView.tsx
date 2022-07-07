import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import DayContent from '../dayContent/DayContent';
import './TodayView.css';

const TodayView = () => {

  const day = new Date();

  // const { getDaysUseCase, getHouseholdUseCase } = useUseCases().dayUseCases;
  // const queryResults = useQuery([
  //   { queryKey: 'day', queryFn: () => getDaysUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683", new Date(2021,10,5), 50)},
  //   { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
  // ]);
  //TODO disable refetch on focus
  // const isLoading = queryResults.some(query => query.isLoading);
  // const allDays = queryResults[0].data!;
  // const household = queryResults[1].data!;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Vandaag</IonTitle>
          {/* <IonTitle size='small'>hi</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DayContent day={day} />
      </IonContent>
    </IonPage>
  );
};

export default TodayView;
