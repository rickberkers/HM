import React from 'react';
import { Day } from '../../../../domains/models/Day';
import { Household } from '../../../../domains/models/Household';
import { getMonthName } from '../../../../core/utils/dateUtils';
import MonthGroup from '../monthGroup/MonthGroup';
import { capitalizeFirstLetter } from '../../../../core/utils/formattingUtils';
import { IonList } from '@ionic/react';

interface DayListProps {
    days: Day[];
    household: Household;
}

const DayList = ({days, household}: DayListProps) => {

    const groupedDays = groupDaysByMonth(days);
    let groupedComponents: JSX.Element[] = [];
    
    groupedDays.forEach((days, monthName) => {
        groupedComponents.push(
            <MonthGroup key={monthName} monthName={monthName} household={household} days={days}/>
        )
    });

    return (<IonList class='ion-no-padding'>{groupedComponents}</IonList>);
};

const groupDaysByMonth = (days: Day[]) => {
    return days.reduce((acc : Map<string, Day[]>, day) => {
        const monthName = capitalizeFirstLetter(getMonthName(day.date));
        acc.set(monthName, acc.get(monthName) || []);
        acc.get(monthName)?.push(day);
        return acc;
    }, new Map());
}

export default React.memo(DayList);
