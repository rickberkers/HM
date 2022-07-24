import { IonItem, IonLabel, IonList, IonToggle } from '@ionic/react';
import { useAuth } from '../../../../core/hooks/useAuth';
import { Day } from '../../../../domains/models/Day';
import { Household } from '../../../../domains/models/Household';
import { useAttendance } from '../../../hooks/useAttendance';
import "./AttendanceList.css";

type Props = {
    day: Day,
    household: Household
};

export const AttendanceList = ({day, household}: Props) => {

    const { user } = useAuth();
    // const attendance = useAttendance(day.commitments, household.members);

    return (
        <IonList>
          {household?.members.map((member) => {
            return (
              <IonItem key={member.id}>
                <IonLabel>{member.firstName}</IonLabel>
                {member.id === user?.id && <IonToggle></IonToggle>}
              </IonItem>
            )
          })}
        </IonList>
    );
};