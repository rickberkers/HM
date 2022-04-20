import { IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';
import React from 'react';
import { Day } from '../../../domains/models/Day';
import { Household } from '../../../domains/models/Household';
import DayItem from '../dayItem/DayItem';
import { getMonthName } from '../../helpers/formattingHelpers';

interface DayListProps {
    days: Day[];
    household: Household;
}

const DayList = ({days, household}: DayListProps) => {

    const groupedDays = days.reduce((acc : {[key: string]: Day[]}, day) => {
        const month = getMonthName(day.date);
        acc[month] = acc[month] || [];
        acc[month].push(day);
        return acc;
    }, {});

    const groupedComponents = Object.keys(groupedDays).map((month) => 
        <React.Fragment key={month}>
            <IonItemDivider key={month}><IonLabel>{month}</IonLabel></IonItemDivider>
            {groupedDays[month].map((day) => <DayItem day={day} household={household} key={day.date.getTime()}/>)}
        </React.Fragment>
    );

    return (<>
        <IonItemGroup>
            { groupedComponents }
        </IonItemGroup>
    </>);
};

export default DayList;
