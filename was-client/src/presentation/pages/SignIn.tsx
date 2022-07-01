import { IonButton, IonContent, IonPage, IonText, useIonToast } from '@ionic/react';
import { useAuth } from '../../core/hooks/useAuth';
import { Redirect } from "react-router-dom";
import { ROUTE_NAMES } from '../../core/Routes';

const SignIn = () => {

    const {login, logout, user, isAuthenticated} = useAuth();
    const [present] = useIonToast();

    const loginClick = () => {
        login("rick", "rick1234!DrfcRTd4").catch(() => {
            console.log("bad login");
            present({message: "Incorrect", color: "danger"}); // Move this away
        });
    };

    const signInElement = (<IonButton onClick={loginClick}>Sign in</IonButton>);
    const signOutElement = (<IonButton onClick={logout}>Sign out</IonButton>);

    return (
        <>
            {
                isAuthenticated ? <Redirect to={ROUTE_NAMES.DAY} /> :
                <IonPage>
                    <IonContent>
                        <IonText>{user?.name ?? "No user"}</IonText>
                        {!user ? signInElement : signOutElement }
                    </IonContent>
                </IonPage>
            }
        </>

    );
}

export default SignIn;