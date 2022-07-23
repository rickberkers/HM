import { Day } from '../../../../domains/models/Day';
import { Household } from '../../../../domains/models/Household';
import { getMonthName } from '../../../utils/dateUtils';
import { capitalizeFirstLetter } from '../../../utils/formattingUtils';
import MonthGroup from '../monthGroup/MonthGroup';

interface DayListProps {
    days: Day[];
    household: Household;
}

const DayList = ({days, household}: DayListProps) => {

    const groupedDays = groupDaysByMonth(days);
    const groupedComponents = Object.keys(groupedDays).map((monthName: string) =>
        <MonthGroup key={monthName} monthName={monthName} household={household} days={groupedDays[monthName]}/>
    );

    return (
        <>{ groupedComponents }</>
    );
};

const groupDaysByMonth = (days: Day[]) => {
    return days.reduce((acc : {[key: string]: Day[]}, day) => {
        const month = capitalizeFirstLetter(getMonthName(day.date));
        acc[month] = acc[month] || [];
        acc[month].push(day);
        return acc;
    }, {});
}

export default DayList;
