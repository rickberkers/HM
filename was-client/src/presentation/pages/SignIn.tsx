import { IonButton, IonContent, IonPage, IonText } from '@ionic/react';
import { useAuth } from '../../core/contexts/AuthContext';

const SignIn = () => {

    const {login, logout, currentUser} = useAuth();

    const loginClick = () => {
        login("rick", "rick1234!DrfcRTd4");
    };

    const signInElement = (<IonButton onClick={loginClick}>Sign-in with Google</IonButton>);
    const signOutElement = (<IonButton onClick={logout}>Sign out</IonButton>);

    return (
        <IonPage>
            <IonContent>
                <IonText>{currentUser?.name ?? "No user"}</IonText>
                {!currentUser ? signInElement : signOutElement }
                <IonButton routerLink="/overview">Overview</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default SignIn;