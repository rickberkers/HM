import { IonText } from '@ionic/react';
import { useQueries } from 'react-query';
import { useUseCases } from '../../../../core/contexts/DependencyContext';
import { truncateString } from '../../../../core/utils/stringUtils';
import Spinner from '../../../components/shared/spinner/Spinner';
import './DayContent.css';
import { ErrorText, NoHouseholdText } from '../../../components/shared/text/Text';
import { useSettings } from '../../../../core/hooks/useSettings';
import { AttendanceList } from '../../../components/day/attendanceList/AttendanceList';
import { AddGuestFAB } from '../../../components/day/addGuestFAB/AddGuestFAB';

type Props = {
  date: Date
}

const DayContent = ({date}: Props) => {

  const { currentHouseholdId } = useSettings();

  const { getDayUseCase } = useUseCases().dayUseCases;
  const { getHouseholdUseCase } = useUseCases().houseHoldUseCases;

  const sharedQueryOptions = {enabled: currentHouseholdId != null};
  const queryResults = useQueries([
      // Cachetime 0 because re-renders anyway due to dates being parsed in the transformation function at datasource implementation
      { queryKey: 'day', queryFn: () => getDayUseCase.invoke(date, currentHouseholdId!), ...sharedQueryOptions, cacheTime: 0},
      { queryKey: 'household', queryFn: () => getHouseholdUseCase.invoke(currentHouseholdId!), ...sharedQueryOptions}
  ]);

  const isLoading = queryResults.some(query => query.isLoading);
  const isError = queryResults.some(query => query.isError);

  const day = queryResults[0].data ?? null;
  const household = queryResults[1].data ?? null;

  if (!currentHouseholdId) {
    return <NoHouseholdText/>;
  }

  if (isError) {
    return <ErrorText/>;
  }

  return (
    isLoading ? <Spinner/> : 
    <>
        {/* Display note of day  */}
        {  day?.dayInfo?.note && 
          <div className="ion-margin">
            <IonText>{truncateString(day.dayInfo.note, 350)}</IonText>
          </div>
        }
        
        {/* Display attendance list  */}
        <AttendanceList day={day!} household={household!} ></AttendanceList>

        {/* Display FAB for adding guest  */}
        <AddGuestFAB></AddGuestFAB>
    </>

  );
};

export default DayContent;
