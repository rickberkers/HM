import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonText, IonChip, IonIcon, IonLabel } from "@ionic/react";
import { addOutline, closeOutline } from "ionicons/icons";
import { useAuth } from "../../../../core/hooks/useAuth";
import { ROUTE_NAMES } from "../../../../core/Routes";
import { Day } from "../../../../domains/models/Day";
import { Household } from "../../../../domains/models/Household";
import { useAttendance } from "../../../hooks/useAttendance";
import { getWeekDayName, getMonthName } from "../../../../core/utils/dateUtils";
import { capitalizeFirstLetter, nounShouldBePlural } from "../../../../core/utils/formattingUtils";

interface Props {
    day: Day,
    household: Household
}

const TodayCard = ({day, household}: Props) => {

    const { user } = useAuth();
    const attendance = useAttendance(day.commitments, household.members);

    return (
        <IonCard routerLink={ROUTE_NAMES.TODAY}>
          <IonCardContent>
            <IonGrid className="ion-no-padding ion-padding-bottom">
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonCol><IonCardTitle>{capitalizeFirstLetter(getWeekDayName(day.date))}</IonCardTitle></IonCol>
                <IonCol>
                  <IonCardSubtitle className="ion-text-right">
                    {`
                      ${day.date.getDate()} 
                      ${getMonthName(day.date)}
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
                    <IonChip key={guest.name} color="success">
                        <IonIcon icon={addOutline} color="success" />
                        <IonLabel>{guest.name}</IonLabel>
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

export default TodayCard;