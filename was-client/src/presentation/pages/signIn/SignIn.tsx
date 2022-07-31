import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonNote, IonPage, IonTitle, IonToolbar, useIonLoading, useIonToast } from '@ionic/react';
import { useAuth } from '../../../core/hooks/useAuth';
import { Redirect } from "react-router-dom";
import { ROUTE_NAMES } from '../../../core/Routes';
import { SignInUser } from '../../../domains/models/User';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { UnauthenticatedError } from '../../../core/errors';

const SignIn = () => {

    const {login, isAuthenticated} = useAuth();
    const [present] = useIonToast();
    const [ presentSignInLoading, dismissSignInLoading ] = useIonLoading();
    const {formState: { errors }, control, handleSubmit, resetField } = useForm<SignInUser>({
        mode: "onChange",
    });

    const handleLogin = (data: SignInUser) => {
        presentSignInLoading();
        login(data.username, data.password).then(_ => {
            resetField("password");
        }).catch(error => {

            let toastOptions = {message: "", color: "danger", duration: 2000};

            if (error instanceof UnauthenticatedError) {
                resetField("password");
                toastOptions.message = "Incorrect username and/or password";
            } else {
                toastOptions.message = error.message;
            }
            
            present(toastOptions);

        }).finally(() => {
            dismissSignInLoading();
        });
    }
    
    const showError = (fieldName: keyof SignInUser) => {
        return (
            <ErrorMessage
                errors={errors}
                name={fieldName}
                render={(({ message }) =>
                    <IonNote className='ion-margin-bottom' slot="error">{message}</IonNote>
                )}
            />
        );
    }

    const redirect = <Redirect to={ROUTE_NAMES.OVERVIEW} />;

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
                    <h3 className='ion-text-center'>WAS</h3>
                    <IonItem className={errors.username && "ion-invalid"}>
                        <IonLabel position="stacked">Username</IonLabel>
                        <Controller
                            name="username"
                            control={control}
                            rules={{required: 'Username is required'}}
                            render={({ field }) => <IonInput value={field.value} onIonChange={field.onChange} />}
                        />
                        {showError('username')}
                    </IonItem>
                    <IonItem className={errors.password && "ion-invalid"}>
                        <IonLabel position="stacked">Password</IonLabel>
                        <Controller
                            name="password"
                            control={control}
                            rules={{required: 'Password is required'}}
                            render={({ field }) => <IonInput type="password" value={field.value} onIonChange={field.onChange} />}
                        />
                        {showError('password')}
                    </IonItem>
                    <IonButton class='ion-margin' expand='block' onClick={handleSubmit(handleLogin)}>Sign in</IonButton>
                </IonContent>
            </IonPage>
        }</>
    );
}

export default SignIn;