import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { close } from "ionicons/icons";
import {Text} from "../../shared/text/Text";

type Props = {
    onRemove: (guest: string) => void;
    guests: string[],
    member: string
};

export const GuestList = ({guests, onRemove, member}: Props) => {
    return (
        <IonList>
            {
                guests.length > 0 ?
                    guests?.map(guest => 
                        <IonItem key={guest}>
                            <IonLabel>
                                <h2>{guest}</h2>
                                <p>Added by: {member}</p>
                            </IonLabel>
                            <IonButton color="danger" onClick={_ => onRemove(guest)} slot="end">
                                <IonIcon slot="icon-only" icon={close} />
                            </IonButton>
                        </IonItem>
                    )
                :
                    <Text text={"No guests added yet"}></Text>   
            }
        </IonList>
    );
};        