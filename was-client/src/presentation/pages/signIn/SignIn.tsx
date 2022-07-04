import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonNote, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useAuth } from '../../../core/hooks/useAuth';
import { Redirect } from "react-router-dom";
import { ROUTE_NAMES } from '../../../core/Routes';
import { SignInUser } from '../../../domains/models/User';
import { useForm, } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';


const SignIn = () => {

    const {formState: { errors }, register, handleSubmit, resetField} = useForm<SignInUser>();

    const {login, isAuthenticated} = useAuth();
    const [present] = useIonToast();

    const handleLogin = (data: SignInUser) => {
        login(data.username, data.password).catch(() => {
            present({message: "Incorrect username and/or password", color: "danger", duration: 2000});
        }).finally(() => {
            resetField("password")
        });
    }
    const redirect = <Redirect to={ROUTE_NAMES.DAY} />;

    return (
        <>{
            isAuthenticated ?  redirect:
            <IonPage>
                <IonContent>
                <IonHeader className='ion-no-border'>
                    <IonToolbar>
                        <IonTitle>Sign in</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <IonItem class="ion-invalid">
                        <IonLabel position="stacked">Username</IonLabel>
                        <IonInput {...register('username', { required: 'Username is required'})} />
                        <ErrorMessage
                            errors={errors}
                            name="username"
                            render={(({ message }) => 
                                <IonNote className='ion-margin-bottom' slot="error">{message}</IonNote>
                            )}
                        />
                    </IonItem>
                    <IonItem class="ion-invalid">
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput type="password" {...register('password', { required: 'Password is required'})} />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={(({ message }) => 
                                <IonNote className='ion-margin-bottom' slot="error">{message}</IonNote>
                            )}
                        />
                    </IonItem>
                    <IonButton class='ion-margin' expand='block' onClick={handleSubmit(handleLogin)}>Sign in</IonButton>
                </form>
                </IonContent>
            </IonPage>
        }</>
    );
}

export default SignIn;