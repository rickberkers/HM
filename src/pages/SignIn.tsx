import { IonButton, IonText } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {

    const auth = useAuth();

    return (
        <div>
            <IonText>{auth.currentUser?.displayName ?? "No user"}</IonText>
            {!auth.currentUser ? 
                (<IonButton onClick={auth.login}>Sign-in with Google</IonButton>)
                :
                (<IonButton onClick={auth.logout}>Sign out</IonButton>)
            }
        </div>
    );
}

export default SignIn;