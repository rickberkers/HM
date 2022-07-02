import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonText, IonChip, IonIcon, IonLabel } from "@ionic/react";
import { addOutline, closeOutline } from "ionicons/icons";
import { useAuth } from "../../../../core/hooks/useAuth";
import { Day } from "../../../../domains/models/Day";
import { Household } from "../../../../domains/models/Household";
import { getWeekDayName, getMonthName, nounShouldBePlural } from "../../../helpers/formattingHelpers";
import { useAttendance } from "../../../hooks/useAttendance";

interface Props {
    day: Day,
    household: Household
}

export const TodayCard = ({day, household}: Props) => {

    const { user } = useAuth();
    const attendance = useAttendance(day, household.members);

    return (
        <IonCard className="action-card">
          <IonCardContent>
            <IonGrid className="ion-no-padding ion-padding-bottom">
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonCol><IonCardTitle>{getWeekDayName(day.date)}</IonCardTitle></IonCol>
                <IonCol>
                  <IonCardSubtitle className="ion-text-right">
                    {`
                      ${day.date.getDate()} 
                      ${getMonthName(day.date, true)}
                    `}
                  </IonCardSubtitle>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonText>
              <span>Hoi <strong>{user?.name}! </strong></span>
              { 
                nounShouldBePlural(attendance.count()) ?
                <span>Vandaag eten er <strong>{attendance.count()} personen</strong> mee</span>
                :
                <span>Vandaag eet er <strong>{attendance.count()} persoon</strong> mee</span>
              }
            </IonText>
            <IonRow className="ion-margin-bottom" />
            {
              [
                ...attendance.guests.map((guest) =>
                    <IonChip key={guest} color="success">
                        <IonIcon icon={addOutline} color="success" />
                        <IonLabel>{guest}</IonLabel>
                    </IonChip>
                ),
                ...attendance.attendees.map((attendee) =>
                    <IonChip key={attendee.id} color="medium">
                        <IonLabel>{attendee.firstName}</IonLabel>
                    </IonChip>
                ),
                ...attendance.absentees.map((abstentee) =>
                    <IonChip key={abstentee.id} color="danger">
                        <IonIcon icon={closeOutline} color="danger" />
                        <IonLabel>{abstentee.firstName}</IonLabel>
                    </IonChip>
                )
              ]
            }
          </IonCardContent>
        </IonCard>
    );
}