import { IonIcon, IonItem, IonLabel, IonList, IonToggle } from '@ionic/react';
import { closeCircleOutline, thumbsUpOutline } from 'ionicons/icons';
import { useAuth } from '../../../../core/hooks/useAuth';
import { Attendance } from '../../../../domains/models/Attendance';
import { User } from '../../../../domains/models/User';
import "./AttendanceList.css";

type Props = {
    attendance: Attendance,
    onCommitmentChanged: (committed: boolean) => void;
};

export const MemberList = ({attendance, onCommitmentChanged}: Props) => {

  const { user } = useAuth();
  
  let currentMember = attendance.attendees.find(attendee => attendee.id === user?.id);
  let isCurrentMemberAttending = true;

  if (!currentMember) {
    currentMember = attendance.absentees.find(absentee => absentee.id === user?.id);
    isCurrentMemberAttending = false;
  }

  return (
      <IonList>
        { currentMember &&
          mapAttendanceMember(
            currentMember!, 
            isCurrentMemberAttending, 
            <div slot='end' onClick={_ => {onCommitmentChanged(!isCurrentMemberAttending)}}>
                <IonToggle color="success" checked={isCurrentMemberAttending}></IonToggle>
            </div>
          )
        }
        <div className='spacer'></div>
        {
          attendance.absentees
            .filter(absentee => absentee.id !== currentMember?.id)
            .map((member) => mapAttendanceMember(member, false))
        }
        {
          attendance.attendees
            .filter(attendee => attendee.id !== currentMember?.id)
            .map((member) => mapAttendanceMember(member, true))
        }
      </IonList>
  );
};

const mapAttendanceMember = (member: User, attending: boolean, endSlot?: JSX.Element) => {
  return (
    <IonItem key={member.id}>
      {attending ? <AttendingIcon/> : <AbsentIcon/>}
      <IonLabel>{member.firstName}</IonLabel>
      {endSlot}
    </IonItem>
  )
}

const AttendingIcon = () => <IonIcon slot='start' icon={thumbsUpOutline} color={"success"}></IonIcon>;
const AbsentIcon = () => <IonIcon slot='start' icon={closeCircleOutline} color={"danger"}></IonIcon>;