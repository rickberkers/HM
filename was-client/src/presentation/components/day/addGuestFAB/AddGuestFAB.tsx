import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { settings, logoVimeo } from "ionicons/icons";

export const AddGuestFAB = () => {
    return (
        <IonFab vertical="bottom" horizontal="start" edge slot="fixed">
          <IonFabButton>
            <IonIcon icon={settings} />
          </IonFabButton>
          <IonFabList side="end">
            <IonFabButton><IonIcon icon={logoVimeo} /></IonFabButton>
          </IonFabList>
        </IonFab>
    );
};