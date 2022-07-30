import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { personRemove } from "ionicons/icons";
import { useAuth } from "../../../../core/hooks/useAuth";
import { Guest } from "../../../../domains/models/Attendance";
import {Text} from "../../shared/text/Text";
import "./GuestList.css";

type Props = {
    onRemove: (guest: string) => void;
    guests: Guest[],
};

export const GuestList = ({guests, onRemove}: Props) => {

    const { user } = useAuth();

    return (
        <IonList lines="full">
            {
                guests.length > 0 ?
                    guests?.map(guest => 
                        <IonItem key={guest.name}>
                            <div style={{ width:"100%", display: 'flex'}}>
                                <div>
                                    <IonLabel slot="start">
                                        {guest.name}
                                    </IonLabel>
                                </div>
                                <div style={{flexGrow: 1}} className="ion-text-end">
                                    { user!.id === guest.addedBy.id ?
                                        <IonButton color="danger" onClick={_ => onRemove(guest.name)} slot="end">
                                            <IonIcon slot="icon-only" icon={personRemove} />
                                        </IonButton>
                                    :
                                        <IonLabel slot="end">
                                            <p>{`Invited by ${guest.addedBy.firstName} ${guest.addedBy.lastName ?? ""}`}</p>
                                        </IonLabel>
                                    }
                                </div>
                            </div>
                            {/* {/* <IonLabel slot="start">
                                {guest.name}
                            </IonLabel> */}

                        </IonItem>
                    )
                :
                    <Text text={"No guests added yet"}></Text>   
            }
        </IonList>
    );
};        