import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonText, IonChip, IonIcon, IonLabel, IonButton } from "@ionic/react";
import { addOutline, closeOutline } from "ionicons/icons";
import { useAuth } from "../../../core/contexts/AuthContext";
import { Day } from "../../../domains/models/Day";
import { Household } from "../../../domains/models/Household";
import { nounShouldBePlural } from "../../helpers/formattingHelpers";
import { useAttendance } from "../../hooks/useAttendance";

interface TodayItemProps {
    day: Day,
    household: Household
}

export const TodayItem = ({day, household}: TodayItemProps) => {

    const { user } = useAuth();
    const attendance = useAttendance(day, household.members);

    return (
        <IonCard className="action-card">
          <IonCardContent>
            <IonGrid className="ion-no-padding ion-padding-bottom">
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonCol><IonCardTitle>Maandag</IonCardTitle></IonCol>
                <IonCol><IonCardSubtitle className="ion-text-right">27 september</IonCardSubtitle></IonCol>
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
                        <IonLabel>{attendee.name}</IonLabel>
                    </IonChip>
                ),
                ...attendance.absentees.map((abstentee) =>
                    <IonChip key={abstentee.id} color="danger">
                        <IonIcon icon={closeOutline} color="danger" />
                        <IonLabel>{abstentee.name}</IonLabel>
                    </IonChip>
                )
              ]
            }
            <IonButton routerLink="/sign-in" expand="block" className="ion-margin-top">sign</IonButton>
            <IonButton routerLink="/day" expand="block" className="ion-margin-top">day</IonButton>
          </IonCardContent>
        </IonCard>
    );
}