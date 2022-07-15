import { IonText } from '@ionic/react';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import './DayContent.css';

type Props = {
  date: Date
}

const DayContent = ({date}: Props) => {

    const { getDayUseCase } = useUseCases().dayUseCases;
    const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

    const queryResults = useQueries([
        { queryKey: 'day', queryFn: () => getDayUseCase.invoke(date, "d3b6d118-05af-4eaf-8631-0500fe54c683")},
        { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
    ]);

  //TODO disable refetch on focus
  const isLoading = queryResults.some(query => query.isLoading);
  const day = queryResults[0].data!;
  const household = queryResults[1].data!;

  return (
    <div className='ion-padding'>
        {day.dayInfo && <IonText>{day.dayInfo?.note}</IonText>}
    </div>
  );
};

export default DayContent;
