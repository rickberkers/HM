import { IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';
import React from 'react';
import { Day } from '../../../domains/models/Day';
import DayItem from '../dayItem/DayItem';

interface DayListProps {
    days: Day[];
}

const DayList = ({days}: DayListProps) => {

    const groupedDays = days.reduce((acc : {[key: string]: Day[]}, day) => {
        const monthNumber = day.date.getMonth() + 1;
        acc[monthNumber] = acc[monthNumber] || [];
        acc[monthNumber].push(day);
        return acc;
    }, {});
    
    const groupedComponents = Object.keys(groupedDays).map((monthNumber) => 
        <React.Fragment key={monthNumber}>
            <IonItemDivider key={monthNumber}><IonLabel>{monthNumber}</IonLabel></IonItemDivider>
            {groupedDays[monthNumber].map((day) => <DayItem day={day} key={day.date.getTime()}/>)}
        </React.Fragment>
    );

    return (<>
        <IonItemGroup>
            { groupedComponents }
        </IonItemGroup>
    </>);
};

export default DayList;
