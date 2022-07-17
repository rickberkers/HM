import { IonText } from '@ionic/react';
import { useMemo } from 'react';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import Spinner from '../../../components/shared/spinner/Spinner';
import './DayContent.css';

type Props = {
  date: Date
}

const DayContent = ({date}: Props) => {

    console.log('e')

    const { getDayUseCase } = useUseCases().dayUseCases;
    const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

    const queryResults = useQueries([
        { queryKey: 'day', queryFn: () => getDayUseCase.invoke(date, "d3b6d118-05af-4eaf-8631-0500fe54c683")},
        { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke("d3b6d118-05af-4eaf-8631-0500fe54c683")}
    ]);

  //TODO disable refetch on focus
  const isLoading = queryResults.some(query => query.isLoading);
  const day = queryResults[0].data ?? null;
  const household = queryResults[1].data ?? null;

  return (
    isLoading ? <Spinner/> : <IonText>{day?.dayInfo?.note}</IonText>
  );
};

export default DayContent;
