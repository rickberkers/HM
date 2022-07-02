import { IonButton, IonContent, IonPage, useIonToast } from '@ionic/react';
import { useAuth } from '../../../core/hooks/useAuth';
import { Redirect } from "react-router-dom";
import { ROUTE_NAMES } from '../../../core/Routes';

const SignIn = () => {

    const {login, isAuthenticated} = useAuth();
    const [present] = useIonToast();

    const loginClick = () => {
        login("rick", "rick1234!DrfcRTd4").catch(() => {
            console.log("bad login");
            present({message: "Incorrect", color: "danger", duration: 1000}); // Move this away
        });
    };

    return (
        <>
            {
                isAuthenticated ? <Redirect to={ROUTE_NAMES.DAY} /> :
                <IonPage>
                    <IonContent>
                        <IonButton onClick={loginClick}>Sign in</IonButton>
                    </IonContent>
                </IonPage>
            }
        </>

    );
}

export default SignIn;