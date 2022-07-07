import { IonText } from '@ionic/react';
import { useQuery } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import './DayContent.css';

type Props = {
    day: Date
}

const DayContent = ({day}: Props) => {

    const { getDayUseCase } = useUseCases().dayUseCases;
    const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

    // const queryResults = useQuery([
    //     { queryKey: 'day', queryFn: () => getDayUseCase.invoke(new Date(2021,10,5))},
    //     { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
    // ]);

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
    <div className='ion-padding'>
        <IonText>{""}</IonText>
    </div>
  );
};

export default DayContent;
