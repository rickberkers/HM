import { IonButton, IonContent, IonPage, IonText } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {

    const {login, logout, currentUser} = useAuth();
    const signInElement = (<IonButton onClick={login}>Sign-in with Google</IonButton>);
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