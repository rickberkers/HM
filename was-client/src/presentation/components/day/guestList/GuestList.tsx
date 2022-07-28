import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { personRemove } from "ionicons/icons";
import {Text} from "../../shared/text/Text";
import "./GuestList.css";

type Props = {
    onRemove: (guest: string) => void;
    guests: string[],
};

export const GuestList = ({guests, onRemove}: Props) => {
    return (
        <IonList>
            {
                guests.length > 0 ?
                    guests?.map(guest => 
                        <IonItem key={guest}>
                            <IonLabel>
                                {guest}
                            </IonLabel>
                            <IonButton color="danger" onClick={_ => onRemove(guest)} slot="end">
                                <IonIcon slot="icon-only" icon={personRemove} />
                            </IonButton>
                        </IonItem>
                    )
                :
                    <Text text={"No guests added yet"}></Text>   
            }
        </IonList>
    );
};        